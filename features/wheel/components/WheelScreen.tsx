'use client';

import WheelCanvasSection from '@/features/wheel/components/WheelCanvasSection';
import WheelInputSection from '@/features/wheel/components/WheelInputSection';
import WheelResultModal from '@/features/wheel/components/WheelResultModal';
import { useWheel } from '@/features/wheel/hooks/useWheel';
import { useTooltip } from '@/hooks/useTooltip';
import type { WheelScreenProps } from '@/types/wheel';

export default function WheelScreen({ isActive, onBack }: WheelScreenProps) {
  const {
    canvasRef,
    inputValue,
    players,
    isSpinning,
    isResultOpen,
    winner,
    setInputValue,
    startWheel,
    spinWheel,
    resetWheel,
    closeResult,
    spinAgain
  } = useWheel();

  const {
    infoIconRef,
    tooltipRef,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip
  } = useTooltip();

  return (
    <div className={`screen game ${isActive ? 'active' : ''}`} id="wheel">
      <h1>☸️ 幸运转盘</h1>

      <WheelInputSection
        inputValue={inputValue}
        tooltipVisible={isTooltipVisible}
        infoIconRef={infoIconRef}
        tooltipRef={tooltipRef}
        onInputChange={setInputValue}
        onToggleTooltip={toggleTooltip}
        onShowTooltip={showTooltip}
        onHideTooltip={hideTooltip}
        onStart={startWheel}
        isVisible={players.length < 2}
      />

      <WheelCanvasSection
        canvasRef={canvasRef}
        isVisible={players.length > 1}
        isSpinning={isSpinning}
        onSpin={spinWheel}
        onReset={resetWheel}
      />

      <button className="back" onClick={onBack}>
        ← 返回游戏大厅
      </button>

      <WheelResultModal
        isOpen={isResultOpen}
        winner={winner}
        onClose={closeResult}
        onSpinAgain={spinAgain}
      />
    </div>
  );
}
