import { business, facts, intents } from "../src/data/tangaranaKnowledge.mjs";

export const stripEmoji = (text) => String(text)
  .replace(/[0-9#*]\uFE0F?\u20E3/gu, "")
  .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}\uFE0F\uFE0E\u200D\u20E3\u{E0020}-\u{E007F}]/gu, "");

export const cleanText = (text) => stripEmoji(text)
  .replace(/[\u0000-\u0008\u000B-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g, "")
  .trim();

export const normalize = (text) => String(text).toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

export function detectIntent(message) {
  const q = normalize(message);
  if (/\b(eres|sos|you are)\b.*\b(ia|ai|inteligencia artificial|bot|robot|humano)\b|quien eres|who are you/.test(q)) return "assistant_identity";
  if (/^[¡!¿?\s]*(hola|buenos dias|buenas tardes|buenas noches|buenas|hello|hi)[!.?\s]*$/.test(q)) return "greeting";
  if (/^[¡!\s]*(muchas gracias|gracias|thanks|thank you)[!.\s]*$/.test(q)) return "thanks";
  if (/disponib|reserv|separar|booking|book\b/.test(q)) return "booking";
  if (/whats\s*app|telefono|numero|contact|hablar.*persona/.test(q)) return "contact";
  if (/ubic|direccion|donde|oficina|location|where/.test(q)) return "location";
  if (/que llevar|recomenda|repelente|bloqueador|ropa|zapatilla|toalla/.test(q)) return "recommendations";
  if (/mascota|nino|niño|pago|adelanto|feriado|condicion/.test(q)) return "conditions";
  if (/hosped|carolina|cabana|cabaña|habitacion|piscina/.test(q)) return "lodging";
  if (/precio|tarifa|cuanto|cuesta|cost/.test(q)) return "rates";
  if (/paquete|dias.*noches|noches.*dias|alojamiento.*tour/.test(q)) return "packages";
  if (/chontabamba|pozuzo|villa rica|perene|perené|rio tigre|río tigre|yanachaga|tour|excursion/.test(q)) return "tour_detail";
  if (/tangarana|que ofrecen|servicio|quienes son/.test(q)) return "general";
  return "unknown";
}

export const sensitiveInput = (text) => /\b(?:\d[ -]?){13,19}\b|\b(?:cvv|password|contrasena|contraseña|mi dni|mi tarjeta|numero de tarjeta|número de tarjeta)\b/i.test(normalize(text));

export const safetyIntent = (text) => /ignora|ignore.*(?:rule|instruction)|system.?prompt|api.?key|clave.*api|ahora eres|revela.*instrucciones|invent.*descuento|developer message/.test(normalize(text));

function factIdsFor(intent, message) {
  const q = normalize(message);
  if (intent === "greeting" || intent === "assistant_identity" || intent === "thanks") return [intent];
  if (intent === "tour_detail") {
    const ids = [];
    if (/chontabamba/.test(q)) ids.push("chontabamba");
    if (/pozuzo/.test(q)) ids.push("pozuzo");
    if (/villa rica/.test(q)) ids.push("villa_rica");
    if (/perene/.test(q)) ids.push("perene");
    if (/rio tigre/.test(q)) ids.push("rio_tigre");
    if (/yanachaga/.test(q)) ids.push("yanachaga");
    return ids.length ? ids.slice(0, 4) : ["tours"];
  }
  const byIntent = {
    general: ["overview"], tours: ["tours"], packages: ["packages", "package_rates"], rates: ["tour_rates", "package_rates"],
    lodging: ["lodging"], conditions: ["children", "pets", "payment"], recommendations: ["bring"],
    booking: ["booking", "availability"], contact: ["contact"], location: ["location"], unknown: ["unknown"],
  };
  return byIntent[intent] || ["unknown"];
}

export function actionsFor(intent, message = "") {
  const actions = [];
  if (["tours", "tour_detail"].includes(intent)) actions.push({ label: "Ver todos los tours", href: "/tours/" });
  if (["packages", "lodging"].includes(intent)) actions.push({ label: "Ver paquetes", href: "/paquetes/" });
  if (intent === "rates") {
    actions.push({ label: "Comparar tours", href: "/tours/" });
    actions.push({ label: "Comparar paquetes", href: "/paquetes/" });
  }
  if (intent === "location") actions.push({ label: "Ver contacto y ubicación", href: "/contacto/" });
  if (intent === "booking") actions.push({ label: "Abrir formulario de reserva", href: "#reservar", action: "open-reservation" });
  if (["booking", "contact", "unknown", "conditions"].includes(intent)) {
    const q = cleanText(message).slice(0, 180);
    const note = `Hola, vengo del asistente de la web de Tangarana Travel Tours.${q ? ` Mi consulta: ${q}` : " Quisiera recibir información."}`;
    actions.push({ label: "Consultar por WhatsApp", href: `${business.whatsapp}?text=${encodeURIComponent(note)}` });
  }
  return actions.slice(0, 3);
}

export function responseFromSelection(selection, { mode = "ai", message = "", allowed = Object.keys(facts) } = {}) {
  if (!selection || Object.keys(selection).some((key) => !["intent", "factIds", "tone"].includes(key))) throw new Error("invalid_selection");
  if (!intents.includes(selection.intent) || !Array.isArray(selection.factIds) || !selection.factIds.length || selection.factIds.length > 5) throw new Error("invalid_selection");
  if (selection.factIds.some((id) => typeof id !== "string" || !allowed.includes(id) || !facts[id])) throw new Error("invalid_fact");
  if (!["neutral", "warm"].includes(selection.tone)) throw new Error("invalid_tone");
  const ids = [...new Set(selection.factIds)];
  const text = ids.map((id) => facts[id].es).join("\n\n");
  return { ok: true, mode, message: cleanText(text), intent: selection.intent, factIds: ids, actions: actionsFor(selection.intent, message) };
}

export function responseFromModel(answer, options = {}) {
  if (!answer || typeof answer.message !== "string" || !answer.message.trim() || answer.message.length > 1800) throw new Error("invalid_message");
  const { message, ...selection } = answer;
  const response = responseFromSelection(selection, options);
  const text = cleanText(message);
  if (!text || /https?:|www\.|mailto:|javascript:|<[^>]*>|\[[^\]]*\]\(|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text) || sensitiveInput(text)) throw new Error("unsafe_message");
  const source = selection.factIds.map((id) => facts[id].es).join(" ");
  const supportedNumbers = new Set(source.match(/\d+(?:[.,]\d+)*/g) || []);
  for (const number of `${options.message || ""} ${(options.history || []).filter((item) => item.role === "user").map((item) => item.content).join(" ")}`.match(/\d+(?:[.,]\d+)*/g) || []) supportedNumbers.add(number);
  for (const price of text.matchAll(/(?:S\s*\/\s*|\$\s*|USD\s*)(\d+(?:[.,]\d+)*)|(\d+(?:[.,]\d+)*)\s*(?:soles|dolares|dólares)/gi)) {
    if (!supportedNumbers.has(price[1] || price[2])) throw new Error("unsupported_price");
  }
  if ((text.match(/\d+(?:[.,]\d+)*/g) || []).some((number) => !supportedNumbers.has(number))) throw new Error("unsupported_number");
  if (/(?:reserva|solicitud)\s+(?:esta\s+)?(?:confirmad[ao]|pagad[ao])|(?:he|hemos)\s+(?:reservado|cobrado|contactado)/i.test(normalize(text))) throw new Error("unsupported_action");
  return { ...response, message: text };
}

export function localResponse(message = "", intent = detectIntent(message), mode = "local") {
  const ids = safetyIntent(message) ? ["unknown"] : factIdsFor(intent, message);
  return responseFromSelection({ intent: safetyIntent(message) ? "unknown" : intent, factIds: ids, tone: "neutral" }, { mode, message });
}

export function unavailableResponse(question = "", reason = "") {
  const quota = reason === "provider_quota";
  return {
    ok: false,
    mode: "unavailable",
    reason,
    intent: "unknown",
    message: quota
      ? "El proveedor de IA está limitando temporalmente las consultas. Puedes revisar los tours y paquetes o continuar directamente por WhatsApp."
      : "Ahora no pude obtener una respuesta de la IA. No se realizó ninguna reserva ni pago. Puedes reintentar o continuar por WhatsApp.",
    actions: actionsFor("unknown", question),
  };
}

export function safeResponse(value, question = "") {
  if (value?.mode === "unavailable") return unavailableResponse(question, value.reason);
  if (!value || !["ai", "local"].includes(value.mode) || typeof value.message !== "string" || value.message.length > 3500 || !intents.includes(value.intent)) return unavailableResponse(question);
  return {
    ok: true,
    mode: value.mode,
    message: cleanText(value.message),
    intent: value.intent,
    factIds: Array.isArray(value.factIds) ? value.factIds.filter((id) => facts[id]).slice(0, 5) : [],
    actions: actionsFor(value.intent, question),
  };
}
