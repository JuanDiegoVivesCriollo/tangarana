export class ProviderError extends Error {
  constructor(code, retryable = false, retryAfterMs = 0) {
    super(code);
    this.code = code;
    this.retryable = retryable;
    this.retryAfterMs = retryAfterMs;
  }
}

export async function providerFetch(url, options, timeoutMs, fetcher = fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      const after = response.headers.get("retry-after");
      const delay = after ? (/^\d+(?:\.\d+)?$/.test(after) ? Number(after) * 1000 : Math.max(0, Date.parse(after) - Date.now())) : 0;
      await response.body?.cancel();
      throw new ProviderError(`http_${response.status}`, [429, 500, 502, 503, 504].includes(response.status), Number.isFinite(delay) ? delay : 0);
    }
    const raw = await response.text();
    if (raw.length > 65000) throw new ProviderError("invalid_response", true);
    try { return JSON.parse(raw); } catch { throw new ProviderError("invalid_response", true); }
  } catch (error) {
    if (error instanceof ProviderError) throw error;
    throw new ProviderError(controller.signal.aborted ? "timeout" : "network", true);
  } finally {
    clearTimeout(timeout);
  }
}

export const parseSelection = (text) => {
  try { return JSON.parse(text); } catch { throw new ProviderError("invalid_response", true); }
};
