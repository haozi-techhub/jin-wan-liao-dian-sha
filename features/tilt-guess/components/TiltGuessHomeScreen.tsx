import { TILT_GUESS_CATEGORIES } from '@/features/tilt-guess/constants/categories';
import type {
  MotionPermissionState,
  TiltGuessCategorySelection,
} from '@/features/tilt-guess/types/tiltGuess';

interface TiltGuessHomeScreenProps {
  selectedCategory: TiltGuessCategorySelection;
  onCategorySelect: (category: TiltGuessCategorySelection) => void;
  onStartGame: () => void;
  onBack: () => void;
  isStarting: boolean;
  startError: string;
  motionPermission: MotionPermissionState;
  canRequestMotionPermission: boolean;
  onEnableMotionControls: () => void;
}

export default function TiltGuessHomeScreen({
  selectedCategory,
  onCategorySelect,
  onStartGame,
  onBack,
  isStarting,
  startError,
  motionPermission,
  canRequestMotionPermission,
  onEnableMotionControls,
}: TiltGuessHomeScreenProps) {
  const needsMotionPermission = canRequestMotionPermission && motionPermission !== 'granted';

  return (
    <div className="screen game active tilt-guess-home">
      <h1>摇头猜词</h1>
      <p className="tilt-guess-subtitle">把手机横着举到额前，屏幕朝向朋友。朋友给提示，你来猜词。</p>

      <div className="tilt-guess-category-grid" role="radiogroup" aria-label="猜词类别">
        {TILT_GUESS_CATEGORIES.map((category) => {
          const isActive = category.id === selectedCategory;

          return (
            <button
              key={category.id}
              type="button"
              className={`tilt-guess-category-btn ${isActive ? 'active' : ''}`}
              onClick={() => onCategorySelect(category.id)}
              role="radio"
              aria-checked={isActive}
            >
              <strong>{category.label}</strong>
              <span>{category.subtitle}</span>
            </button>
          );
        })}
      </div>

      {needsMotionPermission ? (
        <div className="tilt-guess-motion-box" role="status" aria-live="polite">
          <p>
            {motionPermission === 'denied'
              ? '动作感应权限未开启，请在浏览器设置中允许后重试。'
              : '请允许访问动作感应，才能用低头和抬头切换题目。'}
          </p>
          <button type="button" onClick={onEnableMotionControls} disabled={isStarting}>
            开启动作感应
          </button>
        </div>
      ) : null}

      {startError ? <p className="tilt-guess-subtitle" role="alert">{startError}</p> : null}

      <button
        type="button"
        id="tiltGuessStartBtn"
        onClick={onStartGame}
        disabled={isStarting || needsMotionPermission}
      >
        {isStarting ? '正在准备…' : '开始游戏'}
      </button>

      <button className="back" onClick={onBack} type="button">
        ← 返回游戏大厅
      </button>
    </div>
  );
}
