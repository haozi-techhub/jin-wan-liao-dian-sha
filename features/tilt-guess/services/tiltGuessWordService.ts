import type { TiltGuessCategory, TiltGuessWordApiResponse, TiltGuessWordRecord } from '@/features/tilt-guess/types/tiltGuess';

const REQUEST_TIMEOUT_MS = 10000;

function buildApiPath(category?: TiltGuessCategory): string {
  return category ? `/api/tilt-guess/${category}` : '/api/tilt-guess';
}

function isWordRecord(payload: unknown): payload is TiltGuessWordRecord {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const record = payload as { content?: unknown };
  return typeof record.content === 'string' && record.content.trim().length > 0;
}

function isWordApiResponse(payload: unknown): payload is TiltGuessWordApiResponse {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const response = payload as { data?: unknown };
  if (Array.isArray(response.data)) {
    return response.data.every((entry) => isWordRecord(entry));
  }

  return isWordRecord(response.data);
}

function normalizeWords(records: TiltGuessWordRecord[]): string[] {
  const seen = new Set<string>();
  const words: string[] = [];

  for (const item of records) {
    const normalized = item.content.replace(/\s+/g, ' ').trim();
    const key = normalized.toLowerCase();

    if (!normalized || seen.has(key)) {
      continue;
    }

    seen.add(key);
    words.push(normalized);
  }

  return words;
}

export function shuffleWords(words: string[]): string[] {
  const shuffled = [...words];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

async function fetchWithTimeout(input: string, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getWords(category?: TiltGuessCategory): Promise<string[]> {
  const response = await fetchWithTimeout(buildApiPath(category));
  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    throw new Error(`词库请求失败（${response.status}）`);
  }

  if (!isWordApiResponse(payload)) {
    throw new Error('词库返回了无法识别的数据。');
  }

  const records = Array.isArray(payload.data) ? payload.data : [payload.data];
  return shuffleWords(normalizeWords(records));
}
