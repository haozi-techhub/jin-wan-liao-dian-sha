import type { WheelResultModalProps } from '@/types/wheel';

export default function WheelResultModal({
  isOpen,
  winner,
  onClose,
  onSpinAgain
}: WheelResultModalProps) {
  return (
    <div id="resultModal" className={`result-modal ${isOpen ? 'show' : ''}`}>
      <div className="result-content">
        <div className="result-emoji">🎉</div>
        <h3>抽中了</h3>
        <div className="winner-name" id="winnerName">
          {winner}
        </div>
        <button onClick={onClose}>知道了</button>
        <button onClick={onSpinAgain} className="secondary-btn">
          再转一次
        </button>
      </div>
    </div>
  );
}
