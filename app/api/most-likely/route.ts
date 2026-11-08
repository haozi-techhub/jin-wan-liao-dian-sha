import { serveGamePrompt } from '../_data/serveGamePrompt';

export async function GET(request: Request) {
  return serveGamePrompt('/api/most-likely', request);
}
