import { truncateWheelLabel, WHEEL_COLORS } from '@/features/wheel/lib/wheelMath';

export function drawWheelOnCanvas(
  canvas: HTMLCanvasElement,
  players: string[],
  arc: number,
  startAngle: number
): void {
  if (players.length < 2 || arc === 0) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const outsideRadius = 135;
  const textRadius = 97;
  const insideRadius = 23;
  const maxLabelWidth = Math.min(156, 2 * textRadius * Math.sin(arc / 2));

  ctx.clearRect(0, 0, 300, 300);
  ctx.strokeStyle = '#1a1a26';
  ctx.lineWidth = 3;
  ctx.font = 'bold 16px system-ui, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
  ctx.textAlign = 'center';

  players.forEach((player, index) => {
    const angle = startAngle + index * arc;

    ctx.beginPath();
    ctx.arc(150, 150, outsideRadius, angle, angle + arc, false);
    ctx.arc(150, 150, insideRadius, angle + arc, angle, true);
    ctx.closePath();

    ctx.fillStyle = WHEEL_COLORS[index % WHEEL_COLORS.length] ?? WHEEL_COLORS[0];
    ctx.fill();
    ctx.stroke();
    ctx.save();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;

    ctx.translate(
      150 + Math.cos(angle + arc / 2) * textRadius,
      150 + Math.sin(angle + arc / 2) * textRadius
    );
    ctx.rotate(angle + arc / 2 + Math.PI / 2);

    const text = truncateWheelLabel(player);
    ctx.fillText(text, 0, 0, maxLabelWidth);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(150, 150, insideRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a26';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.stroke();
}
