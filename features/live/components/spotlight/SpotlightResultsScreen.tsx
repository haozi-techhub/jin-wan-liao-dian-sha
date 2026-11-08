'use client';

import type { SpotlightRoundResults } from '@/features/live/types';
import { SPOTLIGHT_REACTIONS } from '../../constants';

interface SpotlightResultsScreenProps {
  results: SpotlightRoundResults | null;
  skipReason: string | null;
  canContinue?: boolean;
  onContinue?: () => void;
}

export default function SpotlightResultsScreen({
  results,
  skipReason,
  canContinue = false,
  onContinue
}: SpotlightResultsScreenProps) {
  if (skipReason) {
    return (
      <section className="live-shell">
        <h1 className="live-title">本轮已跳过</h1>
        <p className="live-muted">{skipReason}</p>
        {canContinue && onContinue ? (
          <button type="button" className="live-btn-main" onClick={onContinue}>
            下一位主角
          </button>
        ) : null}
      </section>
    );
  }

  if (!results) {
    return (
      <section className="live-shell">
        <h1 className="live-title">本轮结束</h1>
        <p className="live-muted">等待下一位主角上场…</p>
        {canContinue && onContinue ? (
          <button type="button" className="live-btn-main" onClick={onContinue}>
            下一位主角
          </button>
        ) : null}
      </section>
    );
  }

  return (
    <section className="live-shell">
      <h1 className="live-title">结果</h1>

      <div className="live-panel">
        <p className="live-muted">大家觉得最可能是谁提问？</p>
        <p className="live-question-copy" style={{marginTop: 15, fontWeight: 900}}>{results.questionText}</p>

        <div className="live-guess-results">
          <h2 className="live-section-title">投票结果</h2>
          <ul className="live-results-list">
            {results.guessResults.map((guess) => (
              <li key={guess.playerId} className="live-result-item">
                <div className="live-result-head">
                  <span>{guess.nickname}</span>
                  <strong>{guess.count}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="live-helper-text">提问者的身份会继续保密。</p>
      </div>

      {canContinue && onContinue ? (
        <div className="live-actions">
          <button type="button" className="live-btn-main" onClick={onContinue}>
            下一位主角
          </button>
        </div>
      ) : null}
    </section>
  );
}
