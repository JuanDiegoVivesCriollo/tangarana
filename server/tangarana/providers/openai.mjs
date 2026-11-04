import { providerFetch, parseSelection, ProviderError } from "./http.mjs";

export async function openai({ key, model, prompt, schema, input, timeoutMs, fetcher, maxOutputTokens = 500 }) {
  const body = await providerFetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      instructions: prompt,
      input,
      store: false,
      reasoning: { effort: "none" },
      max_output_tokens: Math.min(800, maxOutputTokens),
      text: { format: { type: "json_schema", name: "tangarana_answer", strict: true, schema } },
    }),
  }, timeoutMs, fetcher);
  if (body.status !== "completed") throw new ProviderError("invalid_response", true);
  const text = body.output?.filter((item) => item.type === "message")
    .flatMap((item) => item.content || [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text)
    .join("");
  return {
    selection: parseSelection(text),
    tokens: { input: body.usage?.input_tokens || 0, output: body.usage?.output_tokens || 0 },
  };
}
