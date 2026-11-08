export const WHEEL_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#2f494fff',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2',
  '#F8B195',
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
  '#99B898',
  '#FECEAB',
  '#FF847C'
] as const;

export function parseWheelOptions(rawInput: string): string[] {
  return rawInput
    .split('\n')
    .map((player) => player.trim())
    .filter((player) => player.length > 0);
}

export function easeOut(t: number, b: number, c: number, d: number): number {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

export function getWinnerIndex(startAngle: number, arc: number): number {
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcDegrees = (arc * 180) / Math.PI;
  return Math.floor((360 - (degrees % 360)) / arcDegrees);
}

export function truncateWheelLabel(label: string): string {
  const characters = Array.from(label);
  return characters.length > 15 ? `${characters.slice(0, 14).join('')}…` : label;
}
