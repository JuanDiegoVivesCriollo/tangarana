import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function blobStore() {
  return getStore({ name: "tangarana-ai-v1", consistency: "strong" });
}

export async function bounded(operation, ms = 2200) {
  let timer;
  try {
    return await Promise.race([
      operation,
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("storage_timeout")), ms); }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export async function mutate(store, key, decide) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const current = await bounded(store.getWithMetadata(key, { type: "json", consistency: "strong" }));
    const decision = decide(current?.data ?? null);
    if (!decision.write) return decision.result;
    const written = await bounded(store.setJSON(key, decision.value, current ? { onlyIfMatch: current.etag } : { onlyIfNew: true }));
    if (written.modified) return decision.result;
    await wait(8 + Math.random() * 25);
  }
  throw new Error("storage_contention");
}

export const monthKey = (now) => new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Lima", year: "numeric", month: "2-digit",
}).format(new Date(now)).replace(/^(\d{2})\/(\d{4})$/, "$2-$1");

export async function reserveQuery(store, { now, id }) {
  const month = monthKey(now);
  return mutate(store, `usage/${month}`, (data) => {
    const current = data || { count: 0, ids: {} };
    if (current.ids[id]) return { result: { accepted: false, reason: "duplicate" } };
    return {
      write: true,
      value: { count: current.count + 1, ids: { ...current.ids, [id]: now } },
      result: { accepted: true, month, id },
    };
  });
}

export async function circuitState(store, provider) {
  const entry = await bounded(store.getWithMetadata(`circuit/${provider}`, { type: "json", consistency: "strong" }));
  return entry?.data || { openUntil: 0, fallbackAllowed: true };
}

export async function circuitOpen(store, provider, now) {
  return (await circuitState(store, provider)).openUntil > now;
}

export async function circuitResult(store, provider, now, success, error) {
  await mutate(store, `circuit/${provider}`, (previous) => {
    if (success) return { write: true, value: { failures: [], openUntil: 0, fallbackAllowed: true }, result: true };
    const failures = [...(previous?.failures || []).filter((stamp) => stamp > now - 60000), now].slice(-5);
    const invalidKey = ["http_401", "http_403", "http_404"].includes(error?.code);
    const delay = Math.max(error?.retryAfterMs || 0, invalidKey ? 300000 : failures.length >= 3 ? 60000 : 0);
    return {
      write: true,
      value: {
        failures,
        openUntil: Math.max(previous?.openUntil || 0, delay ? now + delay : 0),
        fallbackAllowed: !invalidKey,
        lastError: error?.code || null,
      },
      result: true,
    };
  });
}

export async function recordUsage(store, reservation, event) {
  const safe = {
    timestamp: new Date().toISOString(),
    provider: event.provider,
    model: event.model,
    status: event.status,
    durationMs: event.durationMs,
    tokens: event.tokens || null,
    fallback: Boolean(event.fallback),
    intent: event.intent || null,
  };
  await bounded(store.setJSON(`events/${reservation.month}/${reservation.id}/${randomUUID()}`, safe, { onlyIfNew: true }));
}
