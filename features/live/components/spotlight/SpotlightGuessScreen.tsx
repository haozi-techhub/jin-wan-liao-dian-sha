'use client';

import type { SpotlightPlayer } from '@/features/live/types';

interface SpotlightGuessScreenProps {
  questionText: string | null;
  choices: SpotlightPlayer[];
  answeredCount: number;
  totalGuessers: number;
  isSpotlight: boolean;
  hasGuessed: boolean;
  selectedGuessId: string | null;
  onGuess: (playerId: string) => void;
}

export default function SpotlightGuessScreen({
  questionText,
  choices,
  answeredCount,
  totalGuessers,
  isSpotlight,
  hasGuessed,
  selectedGuessId,
  onGuess
}: SpotlightGuessScreenProps) {
  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">是谁问的？</h1>
      </div>

      <p className="live-question-copy live-question-copy--large">{questionText ?? '...'}</p>

      {isSpotlight ? (
        <p className="live-muted">其他玩家正在猜是谁提问，请稍等。</p>
      ) : (
        <>
          <div className="live-guess-grid">
            {choices.map((player) => (
              <button
                key={player.id}
                type="button"
                className={`live-guess-btn ${selectedGuessId === player.id ? 'live-guess-btn--selected' : ''}`}
                onClick={() => onGuess(player.id)}
                disabled={hasGuessed}
              >
                {player.nickname}
              </button>
            ))}
          </div>

          <p className="live-progress">
            已投票 {answeredCount}/{totalGuessers} 人
          </p>
        </>
      )}
    </section>
  );
}
