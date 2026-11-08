import type { Question } from '@/features/live/types';

interface QuizQuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  secondsLeft: number;
  timerTotalSeconds: number;
  hasAnswered: boolean;
  selectedOptionIndex: number | null;
  answeredCount: number;
  totalPlayers: number;
  onSelectOption: (optionIndex: number) => void;
}

export default function QuizQuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  secondsLeft,
  timerTotalSeconds,
  hasAnswered,
  selectedOptionIndex,
  answeredCount,
  totalPlayers,
  onSelectOption
}: QuizQuestionScreenProps) {
  const total = Math.max(1, timerTotalSeconds || 15);
  const timerWidth = `${Math.max(0, Math.min(100, (secondsLeft / total) * 100))}%`;
  const isImageRound = Boolean(question.imageDataUrl);

  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">
          {isImageRound ? '照片' : '题目'} {questionIndex + 1}/{totalQuestions}
        </h1>
        <span className="live-timer-pill">{secondsLeft} 秒</span>
      </div>

      {question.imageDataUrl ? (
        <div className="live-image-stage">
          <img src={question.imageDataUrl} alt="本轮竞猜照片" className="live-round-image" />
        </div>
      ) : null}

      <p className="live-question-copy live-question-copy--large">{question.prompt}</p>

      <div className="live-time-track" aria-hidden="true">
        <span className="live-time-fill" style={{ width: timerWidth }} />
      </div>

      <div className="live-options-grid">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelectOption(index)}
            disabled={hasAnswered}
            className={`live-option-btn live-option-btn--${index} ${selectedOptionIndex === index ? 'live-option-selected' : ''}`}
          >
            <span className="live-option-key">{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      <p className="live-progress">
        已作答 {answeredCount}/{totalPlayers} 人
      </p>
      {isImageRound ? <p className="live-muted">如果这是你的照片，这轮就留给其他人猜吧。</p> : null}
      {hasAnswered ? <p className="live-muted">答案已提交，等待公布结果。</p> : null}
    </section>
  );
}
