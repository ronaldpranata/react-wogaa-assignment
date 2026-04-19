/**
 * API client for the NestJS sentiments backend.
 *
 * Base URL : http://localhost:3000/v1/sentiments
 *
 * All responses are wrapped in { data, meta } by the backend's
 * TransformInterceptor. The request() helper unwraps them automatically.
 *
 * Matches the frontend Sentiment interface:
 *   { id: string, rating: number, comment: string, createdAt: string }
 */

const BASE_URL = "http://localhost:3000";

export interface Sentiment {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SummaryStats {
  totalSentiments: number;
  averageRating: number;
}

export interface CreateSentimentPayload {
  rating: number;
  comment?: string;
}

interface ApiEnvelope<T> {
  data: T;
  meta: { timestamp: string };
}

// ─── Core request helper ──────────────────────────────────────────────────

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // 204 No Content
  if (response.status === 204) return undefined as unknown as T;

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (json as any)?.message ?? response.statusText;
    throw new Error(
      Array.isArray(message) ? message.join("; ") : String(message),
    );
  }

  // Unwrap the { data, meta } envelope
  const envelope = json as ApiEnvelope<T>;
  return envelope?.data ?? (json as T);
}

export const getAll = (): Promise<Sentiment[]> =>
  request<Sentiment[]>("/v1/sentiments");

export const getSummary = (): Promise<SummaryStats> =>
  request<SummaryStats>("/v1/sentiments/summary");

/** GET /v1/sentiments/:id */
export const getOne = (id: string): Promise<Sentiment> =>
  request<Sentiment>(`/v1/sentiments/${id}`);

/** POST /v1/sentiments — submit a new rating+comment */
export const create = (payload: CreateSentimentPayload): Promise<Sentiment> =>
  request<Sentiment>("/v1/sentiments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
