import { hasGameApiBaseUrl, proxyGameApiRequest } from '@/lib/gameApiProxy';
import type { GameApiEndpoint, GamePromptRecord } from '@/types/game';
import { gamePromptPools } from './gamePrompts';

const responseHeaders = { 'Cache-Control': 'no-store' };
const createdAt = '2026-11-09T00:00:00.000+08:00';

export function serveGamePrompt(path: GameApiEndpoint, request: Request) {
  if (hasGameApiBaseUrl()) {
    return proxyGameApiRequest(path, request);
  }

  const { searchParams } = new URL(request.url);
  const pool = gamePromptPools[path];
  const mode = searchParams.get('spicy') === 'true' && pool.spicy ? 'spicy' : 'classic';
  const prompts = pool[mode] ?? pool.classic;
  const type = path.slice('/api/'.length);
  const excludedIds = new Set(searchParams.getAll('excludeIds'));
  const availablePrompts = prompts
    .map((prompt, index) => ({ prompt, id: `${type}-${mode}-${index + 1}` }))
    .filter(({ id }) => !excludedIds.has(id));

  if (!availablePrompts.length) {
    return Response.json(
      { error: { code: 'QUESTION_POOL_EXHAUSTED', message: '这组题目已经抽完了。' } },
      { status: 404, headers: responseHeaders }
    );
  }

  const { prompt, id } = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
  const [content, answer] = typeof prompt === 'string' ? [prompt, null] : prompt;
  const data: GamePromptRecord = { id, type, content, answer, createdAt };

  return Response.json({ data }, { headers: responseHeaders });
}
