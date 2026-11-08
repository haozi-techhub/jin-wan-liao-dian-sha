import type { WheelCanvasSectionProps } from '@/types/wheel';

export default function WheelCanvasSection({
  canvasRef,
  isVisible,
  isSpinning,
  onSpin,
  onReset
}: WheelCanvasSectionProps) {
  return (
    <div id="wheelSection" style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="wheel-container">
        <div className="wheel-pointer">▼</div>
        <canvas id="wheelCanvas" width={300} height={300} ref={canvasRef} role="img" aria-label="幸运转盘" />
      </div>
      <button onClick={onSpin} id="spinButton" disabled={isSpinning}>
        {isSpinning ? '转动中…' : '转动转盘'}
      </button>
      <button onClick={onReset} className="reset-btn">
        ↻ 重设选项
      </button>
    </div>
  );
}
