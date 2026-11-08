const REQUEST_TIMEOUT_MS = 10000;

export type SpotlightTemplates = {
  spicy: string[];
  funny: string[];
  deep: string[];
};

const EMPTY_TEMPLATES: SpotlightTemplates = {
  spicy: [],
  funny: [],
  deep: []
};

const DEFAULT_TEMPLATES: SpotlightTemplates = {
  spicy: [
    '你最容易被哪种人吸引？',
    '你做过最冲动的决定是什么？',
    '有什么话你在心里排练过很多次，却一直没说？',
    '你曾经为了在喜欢的人面前表现自己，做过什么傻事？'
  ],
  funny: [
    '如果你的生活有一条弹幕总跟着你，上面会写什么？',
    '你最近一次笑到停不下来，是因为什么？',
    '你用过最离谱的迟到理由是什么？',
    '假如你是一道菜，你觉得菜单会怎么介绍你？'
  ],
  deep: [
    '过去一年，你对哪件事的看法变了？',
    '你最近什么时候觉得自己被理解了？',
    '如果可以给五年前的自己留一句话，你会说什么？',
    '你想把更多时间花在哪件事上？'
  ]
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isTemplatesPayload(payload: unknown): payload is SpotlightTemplates {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const record = payload as { spicy?: unknown; funny?: unknown; deep?: unknown };
  return isStringArray(record.spicy) && isStringArray(record.funny) && isStringArray(record.deep);
}

function isTemplatesResponse(payload: unknown): payload is { data: SpotlightTemplates } {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const record = payload as { data?: unknown };
  return isTemplatesPayload(record.data);
}

function normalizeList(values: string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const value of values) {
    const trimmed = value.replace(/\s+/g, ' ').trim();
    const key = trimmed.toLowerCase();

    if (!trimmed || seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push(trimmed);
  }

  return normalized;
}

function normalizeTemplates(templates: SpotlightTemplates): SpotlightTemplates {
  return {
    spicy: normalizeList(templates.spicy),
    funny: normalizeList(templates.funny),
    deep: normalizeList(templates.deep)
  };
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

export async function getSpotlightTemplates(): Promise<SpotlightTemplates> {
  const baseUrl = process.env.NEXT_PUBLIC_GAME_API_BASE_URL?.trim();
  if (!baseUrl) {
    return DEFAULT_TEMPLATES;
  }

  const requestUrl = `${baseUrl.replace(/\/$/, '')}/api/spotlight/templates`;
  const response = await fetchWithTimeout(requestUrl);
  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    throw new Error(`匿名焦点题目模板加载失败（${response.status}）`);
  }

  if (!isTemplatesResponse(payload)) {
    throw new Error('匿名焦点题目模板格式有误。');
  }

  const normalized = normalizeTemplates(payload.data);
  return normalized.spicy.length || normalized.funny.length || normalized.deep.length
    ? normalized
    : EMPTY_TEMPLATES;
}
