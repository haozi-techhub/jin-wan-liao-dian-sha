import { NextResponse } from 'next/server';
import { getLocalTiltGuessWords } from '@/features/tilt-guess/constants/localWords';
import { hasGameApiBaseUrl, proxyGameApiRequest } from '@/lib/gameApiProxy';

export async function GET(request: Request) {
  if (hasGameApiBaseUrl()) {
    return proxyGameApiRequest('/api/tilt-guess', request);
  }

  return NextResponse.json(getLocalTiltGuessWords());
}
