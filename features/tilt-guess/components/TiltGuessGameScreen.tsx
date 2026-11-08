import type { TiltGuessResult } from '@/features/tilt-guess/types/tiltGuess';

interface TiltGuessGameScreenProps {
  currentWord: string;
  timeRemaining: number;
  feedback: TiltGuessResult | null;
}

export default function TiltGuessGameScreen({
  currentWord,
  timeRemaining,
  feedback,
}: TiltGuessGameScreenProps) {
  return (
    <div className={`tilt-guess-game ${feedback ? `tilt-guess-game--${feedback}` : ''}`}>
      <div className="tilt-guess-top-row">
        <span className="tilt-guess-mode-pill">摇头猜词</span>
        <div className="tilt-guess-timer-chip">
          <p className="tilt-guess-timer-label">剩余时间</p>
          <p className="tilt-guess-timer">{timeRemaining} 秒</p>
        </div>
      </div>

      <div className="tilt-guess-word-wrap" aria-live="polite">
        <p className="tilt-guess-word">{currentWord || '准备开始…'}</p>
      </div>

      <div className="tilt-guess-instructions">
        <p className="tilt-guess-instruction tilt-guess-instruction--correct">猜对了就低头</p>
        <p className="tilt-guess-instruction tilt-guess-instruction--skip">想跳过就抬头</p>
      </div>
    </div>
  );
}
