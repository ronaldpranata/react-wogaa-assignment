/**
 * Type-safe API client for the NestJS backend.
 *
 * Base URL: http://localhost:3000/v1
 * All requests go through the shared `request()` helper which:
 *  - Sets Content-Type: application/json
 *  - Unwraps the { data, meta } envelope returned by the TransformInterceptor
 *  - Throws a descriptive Error on non-2xx status
 *
 * Usage:
 *   import * as itemsApi from '@/api/items';
 *   const items = await itemsApi.getAll();
 */

const BASE_URL = 'http://localhost:3000/v1/items';

// ─── Types ────────────────────────────────────────────────────────────────

export interface Item {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateItemPayload = {
  name: string;
  description?: string;
};

export type UpdateItemPayload = Partial<CreateItemPayload>;

/** Shape of every successful API response (matches TransformInterceptor) */
interface ApiEnvelope<T> {
  data: T;
  meta: { timestamp: string };
}

// ─── Core request helper ─────────────────────────────────────────────────

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  // 204 No Content — nothing to parse
  if (response.status === 204) return undefined as unknown as T;

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (json as any)?.message ??
      (typeof json === 'string' ? json : response.statusText);
    throw new Error(
      Array.isArray(message) ? message.join('; ') : String(message),
    );
  }

  // Unwrap the { data, meta } envelope
  const envelope = json as ApiEnvelope<T>;
  return envelope.data ?? (json as T);
}

// ─── CRUD operations ─────────────────────────────────────────────────────

/** GET /v1/items — fetch all items (ordered newest-first) */
export const getAll = (): Promise<Item[]> =>
  request<Item[]>('');

/** GET /v1/items/:id — fetch a single item */
export const getOne = (id: number): Promise<Item> =>
  request<Item>(`/${id}`);

/** POST /v1/items — create a new item */
export const create = (payload: CreateItemPayload): Promise<Item> =>
  request<Item>('', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

/** PATCH /v1/items/:id — partially update an item */
export const update = (id: number, payload: UpdateItemPayload): Promise<Item> =>
  request<Item>(`/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

/** DELETE /v1/items/:id — delete an item (returns void) */
export const remove = (id: number): Promise<void> =>
  request<void>(`/${id}`, { method: 'DELETE' });
