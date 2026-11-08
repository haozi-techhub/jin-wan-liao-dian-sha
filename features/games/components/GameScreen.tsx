import type { GameDefinition } from '@/types/game';

interface GameScreenProps {
  isActive: boolean;
  config: GameDefinition | null;
  text: string;
  isLoading: boolean;
  onNext: () => void;
  onBack: () => void;
}

export default function GameScreen({
  isActive,
  config,
  text,
  isLoading,
  onNext,
  onBack
}: GameScreenProps) {
  return (
    <div className={`screen game ${isActive ? 'active' : ''}`} id="gameScreen">
      <h1 id="gameTitle">{config?.title ?? ''}</h1>
      <div className="card" id="gameText" aria-live="polite">
        {text || (isLoading ? '正在抽题…' : '')}
      </div>
      <button onClick={onNext} id="gameButton" type="button" disabled={isLoading}>
        {config?.buttonText ?? '下一题'}
      </button>
      <button className="back" onClick={onBack} type="button">
        ← 返回首页
      </button>
    </div>
  );
}
