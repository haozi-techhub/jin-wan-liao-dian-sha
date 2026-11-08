interface LandscapeRequiredScreenProps {
  isLandscape: boolean;
  onBack: () => void;
}

export default function LandscapeRequiredScreen({ isLandscape, onBack }: LandscapeRequiredScreenProps) {
  return (
    <section className="tilt-guess-landscape-required" role="status" aria-live="polite">
      <div className="tilt-guess-landscape-stack">
        <div className="tilt-guess-landscape-content">
          <span className="tilt-guess-rotate-icon" aria-hidden="true">
            🔄
          </span>
          <h2>请把手机转成横屏</h2>
          <p>{isLandscape ? '已横屏，正在开始游戏…' : '转成横屏后会自动开始。'}</p>
        </div>
        <button type="button" className="tilt-guess-landscape-outside-btn" onClick={onBack}>
          返回
        </button>
      </div>
    </section>
  );
}
