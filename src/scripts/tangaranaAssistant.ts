import { cleanText, safeResponse, sensitiveInput, unavailableResponse } from "../../shared/tangarana-contract.mjs";

type AssistantAction = { label: string; href: string; action?: string };
type AssistantResponse = {
  mode: "ai" | "local" | "unavailable";
  message: string;
  intent?: string;
  actions?: AssistantAction[];
};

const make = <K extends keyof HTMLElementTagNameMap>(tag: K, className = "", text = "") => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

export function initTangaranaAssistant(host: HTMLElement, openImmediately = false) {
  if (host.dataset.ready === "true") {
    if (openImmediately) host.dispatchEvent(new CustomEvent("tangarana-assistant:open"));
    return;
  }
  host.dataset.ready = "true";

  const toggle = host.querySelector<HTMLButtonElement>("[data-assistant-toggle]");
  const invitation = host.querySelector<HTMLButtonElement>("[data-assistant-invitation]");
  const panel = host.querySelector<HTMLElement>("[data-assistant-panel]");
  const close = host.querySelector<HTMLButtonElement>("[data-assistant-close]");
  const log = host.querySelector<HTMLElement>("[data-assistant-log]");
  const form = host.querySelector<HTMLFormElement>("[data-assistant-form]");
  const input = host.querySelector<HTMLTextAreaElement>("[data-assistant-input]");
  const submit = host.querySelector<HTMLButtonElement>("[data-assistant-submit]");
  const status = host.querySelector<HTMLElement>("[data-assistant-status]");
  const character = host.querySelector<HTMLImageElement>("[data-assistant-character]");
  const honeypot = host.querySelector<HTMLInputElement>("[data-assistant-website]");
  const quickButtons = [...host.querySelectorAll<HTMLButtonElement>("[data-assistant-quick]")];
  if (!toggle || !invitation || !panel || !close || !log || !form || !input || !submit || !status || !character || !honeypot) return;

  let history: Array<{ role: "user" | "assistant"; content: string }> = [];
  let busy = false;
  let controller: AbortController | undefined;
  let speakingTimer = 0;
  let opener: HTMLElement = toggle;

  const setState = (state: "idle" | "greeting" | "thinking" | "presenting") => {
    host.dataset.state = state;
    const src = host.dataset[state];
    if (src && character.src !== src) character.src = src;
  };

  const resizeInput = () => {
    input.style.height = "auto";
    input.style.height = `${Math.min(108, Math.max(44, input.scrollHeight))}px`;
  };

  const layout = () => {
    if (panel.hidden) return;
    const viewport = window.visualViewport;
    const height = viewport?.height || window.innerHeight;
    const top = viewport?.offsetTop || 0;
    const keyboard = window.innerHeight - height > 130;
    const headerBottom = document.querySelector<HTMLElement>(".mobile-header")?.getBoundingClientRect().bottom || 0;
    const marginTop = Math.max(10, headerBottom - top + 10);
    const available = Math.max(230, height - marginTop - 12);
    panel.style.setProperty("--assistant-height", `${Math.min(680, available, keyboard ? available : height * 0.82)}px`);
    panel.style.setProperty("--assistant-bottom", `${Math.max(10, window.innerHeight - height - top + 10)}px`);
    panel.classList.toggle("is-compact", available < 430);
  };

  const open = (source: HTMLElement = toggle) => {
    opener = source;
    panel.hidden = false;
    host.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    invitation.setAttribute("aria-expanded", "true");
    setState("greeting");
    window.clearTimeout(speakingTimer);
    speakingTimer = window.setTimeout(() => setState("idle"), 1150);
    layout();
    resizeInput();
    log.scrollTop = log.scrollHeight;
    window.addEventListener("resize", layout);
    window.visualViewport?.addEventListener("resize", layout);
    window.visualViewport?.addEventListener("scroll", layout);
    (matchMedia("(max-width: 47.99rem)").matches ? close : input).focus({ preventScroll: true });
  };

  const hide = (restoreFocus = true) => {
    controller?.abort();
    panel.hidden = true;
    host.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    invitation.setAttribute("aria-expanded", "false");
    setState("idle");
    window.removeEventListener("resize", layout);
    window.visualViewport?.removeEventListener("resize", layout);
    window.visualViewport?.removeEventListener("scroll", layout);
    if (restoreFocus) opener.focus({ preventScroll: true });
  };

  const scrollLatest = () => { log.scrollTop = log.scrollHeight; };

  const appendActions = (item: HTMLElement, actions: AssistantAction[] = []) => {
    if (!actions.length) return;
    const wrap = make("div", "tanga-chat__actions");
    for (const action of actions.slice(0, 3)) {
      if (action.action === "open-reservation") {
        const button = make("button", "", action.label);
        button.type = "button";
        button.dataset.openReservation = "";
        wrap.append(button);
        continue;
      }
      const link = make("a", "", action.label);
      link.href = action.href;
      if (action.href.startsWith("https://")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      wrap.append(link);
    }
    item.append(wrap);
  };

  const append = (role: "user" | "assistant", text: string, response?: AssistantResponse, remember = true) => {
    const item = make("article", `tanga-chat__message tanga-chat__message--${role}`);
    item.append(make("span", "tanga-chat__speaker", role === "user" ? "Tú" : "Tanga"));
    item.append(make("p", "tanga-chat__text", cleanText(text)));
    if (response?.actions) appendActions(item, response.actions);
    log.append(item);
    while (log.querySelectorAll(":scope > article").length > 30) log.querySelector(":scope > article")?.remove();
    if (remember) {
      history.push({ role, content: cleanText(text).slice(0, 1200) });
      history = history.slice(-6);
    }
    scrollLatest();
    return item;
  };

  const setBusy = (value: boolean) => {
    busy = value;
    submit.disabled = value;
    quickButtons.forEach((button) => { button.disabled = value; });
    status.hidden = !value;
    host.classList.toggle("is-thinking", value);
    setState(value ? "thinking" : "idle");
  };

  const ask = async (raw: string, quickAction?: string) => {
    if (busy || !raw.trim()) return;
    const question = cleanText(raw).slice(0, 800);
    if (!question) return;
    const isSensitive = sensitiveInput(question);
    append("user", isSensitive ? "Consulta con datos sensibles omitida por privacidad." : question);
    input.value = "";
    resizeInput();
    setBusy(true);
    let response: AssistantResponse;
    if (isSensitive) {
      response = {
        mode: "local",
        message: "Por tu privacidad, no compartas tarjetas, contraseñas ni documentos en este chat. Para continuar, comunícate directamente con Tangarana.",
        actions: [{ label: "Ir a contacto", href: "/contacto/" }],
      };
    } else {
      controller = new AbortController();
      const timer = window.setTimeout(() => controller?.abort(), 24000);
      try {
        const recent = history.slice(-5, -1).map((item) => ({ role: item.role, content: item.content.slice(0, 600) }));
        const result = await fetch("/.netlify/functions/tangarana-chat", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            message: question,
            history: recent,
            requestId: crypto.randomUUID(),
            website: honeypot.value,
            ...(quickAction ? { quickAction } : {}),
          }),
        });
        if (!result.ok) throw new Error("assistant_unavailable");
        response = safeResponse(await result.json(), question) as AssistantResponse;
      } catch {
        response = unavailableResponse(question) as AssistantResponse;
      } finally {
        window.clearTimeout(timer);
        controller = undefined;
      }
    }
    setBusy(false);
    append("assistant", response.message, response, response.mode !== "unavailable");
    setState("presenting");
    window.clearTimeout(speakingTimer);
    speakingTimer = window.setTimeout(() => setState("idle"), 1650);
    scrollLatest();
  };

  toggle.addEventListener("click", () => panel.hidden ? open(toggle) : hide());
  invitation.addEventListener("click", () => open(invitation));
  close.addEventListener("click", () => hide());
  host.addEventListener("tangarana-assistant:open", () => open(toggle));
  host.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      event.stopPropagation();
      hide();
    }
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.reportValidity()) ask(input.value);
  });
  input.addEventListener("input", resizeInput);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (form.reportValidity()) ask(input.value);
    }
  });
  quickButtons.forEach((button) => button.addEventListener("click", () => ask(button.textContent || "", button.dataset.assistantQuick)));

  append("assistant", "¡Hola! Soy Tanga, la hormiguita de Tangarana. Puedo ayudarte a comparar tours y paquetes, revisar precios publicados o preparar tu reserva.", undefined, false);
  const quickArea = host.querySelector<HTMLElement>(".tanga-chat__quick");
  if (quickArea) log.append(quickArea);
  setState("idle");
  if (openImmediately) open(toggle);
}
