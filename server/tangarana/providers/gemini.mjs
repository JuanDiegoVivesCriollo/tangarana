import { providerFetch, parseSelection, ProviderError } from "./http.mjs";

export async function gemini({ key, model, prompt, schema, input, timeoutMs, fetcher, maxOutputTokens = 500 }) {
  const isGemini3 = model.startsWith("gemini-3");
  const generationConfig = {
    temperature: isGemini3 ? 1 : 0.1,
    maxOutputTokens: isGemini3 ? 2048 : Math.min(800, maxOutputTokens),
    responseMimeType: "application/json",
    responseJsonSchema: schema,
    thinkingConfig: isGemini3 ? { thinkingLevel: /flash-lite$/.test(model) ? "MINIMAL" : "LOW" } : { thinkingBudget: 0 },
  };
  const body = await providerFetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: prompt }] },
      contents: [{ role: "user", parts: [{ text: input }] }],
      generationConfig,
    }),
  }, timeoutMs, fetcher);
  const candidate = body.candidates?.[0];
  if (candidate?.finishReason !== "STOP") throw new ProviderError("invalid_response", true);
  const text = candidate.content?.parts?.filter((part) => !part.thought && typeof part.text === "string").map((part) => part.text).join("");
  return {
    selection: parseSelection(text),
    tokens: {
      input: body.usageMetadata?.promptTokenCount || 0,
      output: (body.usageMetadata?.candidatesTokenCount || 0) + (body.usageMetadata?.thoughtsTokenCount || 0),
    },
  };
}
