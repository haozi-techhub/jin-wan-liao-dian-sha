export const LIVE_QUESTION_DURATION_MS = 15_000;
export const LIVE_QUESTION_COUNTDOWN_SECONDS = LIVE_QUESTION_DURATION_MS / 1000;

export const SPOTLIGHT_REACTIONS = [
  { emoji: '🔥', label: '太狠了' },
  { emoji: '😂', label: '笑死了' },
  { emoji: '😳', label: '震惊' },
  { emoji: '❤️', label: '够坦诚' }
] as const;
