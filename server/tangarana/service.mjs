import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import {
  cleanText, localResponse, responseFromModel, safetyIntent, sensitiveInput, unavailableResponse,
} from "../../shared/tangarana-contract.mjs";
import { quickActions } from "../../src/data/tangaranaKnowledge.mjs";
import { systemPrompt, selectContext, selectionSchema } from "./prompt.mjs";
import { gemini } from "./providers/gemini.mjs";
import { openai } from "./providers/openai.mjs";
import { ProviderError } from "./providers/http.mjs";
import { blobStore, bounded, reserveQuery, circuitOpen, circuitState, circuitResult, recordUsage } from "./storage.mjs";

const COOKIE = "tangarana_ai_session";
const idPattern = /^[a-f0-9-]{36}$/i;
const hash = (secret, text) => createHmac("sha256", secret).update(text).digest("hex");
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function sessionFor(request, secret, now) {
  const existing = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  const parts = existing?.split(".") || [];
  if (parts.length === 3 && idPattern.test(parts[0]) && /^\d{13}$/.test(parts[1]) && /^[a-f0-9]{64}$/.test(parts[2])) {
    const payload = `${parts[0]}.${parts[1]}`;
    const issued = Number(parts[1]);
    if (issued <= now && now - issued < 8 * 3600000 && timingSafeEqual(Buffer.from(parts[2]), Buffer.from(hash(secret, payload)))) return { id: parts[0] };
  }
  const payload = `${randomUUID()}.${now}`;
  return {
    id: payload.split(".")[0],
    cookie: `${COOKIE}=${payload}.${hash(secret, payload)}; HttpOnly; Secure; SameSite=Strict; Path=/.netlify/functions/; Max-Age=28800`,
  };
}

async function readInput(request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new Error("invalid_content_type");
  if (Number(request.headers.get("content-length") || 0) > 12000) throw new Error("too_large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty_body");
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await bounded(reader.read(), 2000);
      if (done) break;
      length += value.length;
      if (length > 12000) throw new Error("too_large");
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!data || typeof data !== "object" || Array.isArray(data) || Object.keys(data).some((key) => !["message", "history", "requestId", "quickAction", "website"].includes(key))) throw new Error("invalid_input");
  if (typeof data.message !== "string" || !data.message.trim() || data.message.length > 800 || typeof data.website !== "string" || data.website || !idPattern.test(data.requestId || "")) throw new Error("invalid_input");
  if (data.quickAction !== undefined && !quickActions.some(([id]) => id === data.quickAction)) throw new Error("invalid_action");
  if (data.history !== undefined && (!Array.isArray(data.history) || data.history.length > 6 || data.history.some((item) => !item || typeof item !== "object" || Object.keys(item).some((key) => !["role", "content"].includes(key)) || !["user", "assistant"].includes(item.role) || typeof item.content !== "string" || item.content.length > 1200))) throw new Error("invalid_history");
  return {
    ...data,
    message: cleanText(data.message),
    history: (data.history || []).map((item) => ({ role: item.role, content: cleanText(item.content) })),
  };
}

export function createTangaranaHandler({
  env = process.env,
  getStore = blobStore,
  providers = { gemini, openai },
  now = Date.now,
  sleep = pause,
  log = (event) => console.info(JSON.stringify(event)),
} = {}) {
  return async (request) => {
    const started = now();
    let cookie;
    let question = "";
    const send = (value, status = 200) => new Response(JSON.stringify(value), {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex",
        ...(cookie ? { "Set-Cookie": cookie } : {}),
      },
    });
    const unavailable = (reason) => {
      log({ kind: "tangarana_ai_unavailable", reason });
      return send(unavailableResponse(question, reason));
    };
    const origins = new Set([
      "https://tangaranatours.com",
      "https://www.tangaranatours.com",
      "https://tangarana.netlify.app",
      ...(env.WANDER_ALLOWED_ORIGINS || "").split(",").map((value) => value.trim()).filter(Boolean),
    ]);
    if (request.method !== "POST") return send(unavailableResponse(""), 405);
    if (!origins.has(request.headers.get("origin")) || request.headers.get("sec-fetch-site") === "cross-site") return send(unavailableResponse(""), 403);
    try {
      const input = await readInput(request);
      question = input.message;
      if (!question) return send(unavailableResponse(""), 400);
      if (sensitiveInput(question) || input.history.some((item) => sensitiveInput(item.content))) {
        return send({
          ...localResponse("", "contact"),
          message: "Por tu privacidad, no compartas tarjetas, contraseñas ni documentos en este chat. Para continuar, comunícate directamente con Tangarana.",
        });
      }
      if (safetyIntent(question)) return send(localResponse(question));
      if (env.WANDER_AI_ENABLED !== "true" || !env.GEMINI_API_KEY || (env.WANDER_SESSION_SECRET || "").length < 32) return unavailable("configuration");
      const session = sessionFor(request, env.WANDER_SESSION_SECRET, started);
      cookie = session.cookie;
      const store = getStore();
      const primaryModel = env.WANDER_PRIMARY_MODEL || "gemini-3.1-flash-lite";
      const primaryCircuit = `gemini-${primaryModel}`;
      const primaryState = await circuitState(store, primaryCircuit);
      const primaryOpen = primaryState.openUntil > started;
      if (primaryOpen && primaryState.fallbackAllowed === false) return unavailable("model_configuration_cooldown");
      const secondaryReady = env.WANDER_ENABLE_OPENAI_FALLBACK === "true" && Boolean(env.OPENAI_API_KEY) && !await circuitOpen(store, "openai", started);
      if (primaryOpen && !secondaryReady) return unavailable(primaryState.lastError === "http_429" ? "provider_quota" : "provider_cooldown");
      if (request.signal.aborted || now() - started > 12000) return unavailable("cancelled");
      const reservation = await reserveQuery(store, { now: started, id: hash(env.WANDER_SESSION_SECRET, `${session.id}:${input.requestId}`) });
      if (!reservation.accepted) return unavailable("duplicate");
      let providerQuota = false;
      const history = input.history.slice(-4).map((item) => ({ role: item.role, content: item.content.slice(0, 600) }));
      const selected = selectContext(question, history);
      const common = {
        prompt: systemPrompt,
        schema: selectionSchema(selected.allowed),
        maxOutputTokens: 500,
        input: JSON.stringify({ facts: selected.facts, untrustedHistory: history, visitorQuestion: question }),
      };
      const attempt = async (provider, timeoutMs) => {
        if (request.signal.aborted || now() - started > 20500) throw new ProviderError("cancelled", false);
        const attemptStarted = now();
        const model = provider === "gemini" ? primaryModel : env.WANDER_FALLBACK_MODEL || "gpt-5.6-luna";
        const circuit = provider === "gemini" ? primaryCircuit : provider;
        const event = { provider, model, fallback: provider !== "gemini" };
        try {
          const output = await providers[provider]({
            ...common,
            key: provider === "gemini" ? env.GEMINI_API_KEY : env.OPENAI_API_KEY,
            model,
            timeoutMs: Math.min(timeoutMs, 22000 - (now() - started)),
          });
          let value;
          try {
            value = responseFromModel(output.selection, { allowed: selected.allowed, message: question, history });
          } catch {
            throw new ProviderError("invalid_response", true);
          }
          Object.assign(event, { status: "ok", tokens: output.tokens, intent: value.intent });
          await circuitResult(store, circuit, now(), true).catch(() => {});
          return value;
        } catch (error) {
          const safe = error instanceof ProviderError ? error : new ProviderError("invalid_response", true);
          event.status = safe.code;
          if (safe.code === "http_429") providerQuota = true;
          await circuitResult(store, circuit, now(), false, safe).catch(() => {});
          throw safe;
        } finally {
          event.durationMs = now() - attemptStarted;
          log({ kind: "tangarana_ai_attempt", ...event });
          await recordUsage(store, reservation, event).catch(() => log({ kind: "tangarana_ai_metrics_unavailable" }));
        }
      };
      let canFallback = primaryOpen;
      if (!primaryOpen) {
        const primaryDeadline = Math.min(now() + 17000, started + 18000);
        for (let retry = 0; retry < 2; retry += 1) {
          try { return send(await attempt("gemini", Math.max(1, primaryDeadline - now()))); }
          catch (error) {
            canFallback = error.retryable;
            if (!error.retryable || error.code === "timeout" || retry === 1) break;
            const backoff = Math.max(error.retryAfterMs, 150 + Math.random() * 150);
            if (backoff > 750 || now() + backoff + 1000 >= primaryDeadline) break;
            await sleep(backoff);
          }
        }
      }
      if (canFallback && secondaryReady && now() - started < 19000) {
        try { return send(await attempt("openai", 4500)); } catch { /* aviso controlado */ }
      }
      return unavailable(providerQuota ? "provider_quota" : "providers_failed");
    } catch {
      log({ kind: "tangarana_ai_unavailable", reason: "invalid_input_or_storage" });
      return send(unavailableResponse(question));
    }
  };
}
