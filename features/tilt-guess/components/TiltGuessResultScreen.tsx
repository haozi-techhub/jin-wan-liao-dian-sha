interface TiltGuessResultScreenProps {
  correctCount: number;
  skipCount: number;
  onPlayAgain: () => void;
  onBackToGames: () => void;
}

export default function TiltGuessResultScreen({
  correctCount,
  skipCount,
  onPlayAgain,
  onBackToGames,
}: TiltGuessResultScreenProps) {
  const totalScore = correctCount;

  return (
    <div className="screen game active tilt-guess-result">
      <h1>本轮结束</h1>

      <div className="tilt-guess-result-card">
        <div>
          <span>猜对</span>
          <strong>{correctCount}</strong>
        </div>
        <div>
          <span>跳过</span>
          <strong>{skipCount}</strong>
        </div>
        <div>
          <span>总分</span>
          <strong>{totalScore}</strong>
        </div>
      </div>

      <button type="button" onClick={onPlayAgain}>
        再玩一轮
      </button>
      <button className="back" type="button" onClick={onBackToGames}>
        ← 返回游戏大厅
      </button>
    </div>
  );
}
