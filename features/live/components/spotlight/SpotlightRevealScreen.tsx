'use client';

import { SPOTLIGHT_REACTIONS } from "../../constants";


interface SpotlightRevealScreenProps {
  spotlightName: string | null;
  questionText: string | null;
  isSpotlight: boolean;
  reactionCounts: [number, number, number, number];
  answeredCount: number;
  totalReactors: number;
  hasReacted: boolean;
  selectedReactionIndex: number | null;
  onReact: (reactionIndex: number) => void;
  onOpenVotes: () => void;
}

export default function SpotlightRevealScreen({
  spotlightName,
  questionText,
  isSpotlight,
  reactionCounts,
  answeredCount,
  totalReactors,
  hasReacted,
  selectedReactionIndex,
  onReact,
  onOpenVotes
}: SpotlightRevealScreenProps) {
  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">揭晓问题</h1>
        <span className="live-status-pill">回答时间</span>
      </div>

      <div className="live-spotlight-banner">
        {spotlightName
          ? `🎤 轮到 ${spotlightName} 回答`
          : "🎤 轮到主角回答"}
      </div>

      <div className="live-panel live-reveal-panel">
        <div className="live-flip-card" aria-live="polite">
          <p className="live-question-copy live-question-copy--large">
            {questionText ?? "..."}
          </p>
        </div>
        <p className="live-muted" style={{ marginTop: "10px" }}>
          {isSpotlight
            ? "大声说出你的答案，看看大家的反应。"
            : "听主角回答，选一个表情送给对方。"}
        </p>
      </div>

      {!isSpotlight ? (
        <div className="live-reaction-grid">
          {SPOTLIGHT_REACTIONS.map((reaction, index) => (
            <button
              key={reaction.label}
              type="button"
              className={`live-reaction-btn live-option-btn--${index} ${selectedReactionIndex === index ? "live-option-selected" : ""}`}
              onClick={() => onReact(index)}
              disabled={hasReacted}
            >
              <span className="live-reaction-emoji">{reaction.emoji}</span>
              <span>{reaction.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      <p className="live-progress">
        已发表反应 {answeredCount}/{totalReactors} 人
      </p>

      <div className="live-reaction-counts">
        {SPOTLIGHT_REACTIONS.map((reaction, index) => (
          <div
            key={`count-${reaction.label}`}
            className={`live-reaction-count live-reaction-count--${index}`}
          >
            <span>{reaction.emoji}</span>
            <strong>{reactionCounts[index] ?? 0}</strong>
          </div>
        ))}
      </div>

      {isSpotlight ? (
        <button type="button" className="live-btn-main" style={{ marginTop: "10px"}} onClick={onOpenVotes}>
          开始投票
        </button>
      ) : (
        <p className="live-muted" style={{ marginTop: "10px" }}>
          等待主角开启投票…
        </p>
      )}
    </section>
  );
}
