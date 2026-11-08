import { NextResponse } from 'next/server';
import { getLocalTiltGuessWords, isTiltGuessCategory } from '@/features/tilt-guess/constants/localWords';
import { hasGameApiBaseUrl, proxyGameApiRequest } from '@/lib/gameApiProxy';

interface CategoryRouteContext {
  params: Promise<{ category: string }>;
}

export async function GET(request: Request, context: CategoryRouteContext) {
  const { category } = await context.params;
  if (hasGameApiBaseUrl()) {
    return proxyGameApiRequest(`/api/tilt-guess/${encodeURIComponent(category)}`, request);
  }

  if (!isTiltGuessCategory(category)) {
    return NextResponse.json({ error: '找不到这个猜词类别。' }, { status: 404 });
  }

  return NextResponse.json(getLocalTiltGuessWords(category));
}
