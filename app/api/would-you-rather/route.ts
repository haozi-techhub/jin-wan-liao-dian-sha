import { serveGamePrompt } from '../_data/serveGamePrompt';

export async function GET(request: Request) {
  return serveGamePrompt('/api/would-you-rather', request);
}
