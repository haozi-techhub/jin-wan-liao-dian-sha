import type { Player } from '@/features/live/types';

interface QuizLeaderboardScreenProps {
  players: Player[];
}

export default function QuizLeaderboardScreen({ players }: QuizLeaderboardScreenProps) {
  return (
    <section className="live-shell">
      <h1 className="live-title">排行榜</h1>

      <div className="live-panel">
        <ul className="live-leaderboard">
          {players.length === 0 ? <li className="live-muted">还没有玩家。</li> : null}
          {players.map((player, index) => (
            <li key={player.id} className={`live-leader ${index === 0 ? 'live-leader--first' : ''}`}>
              <span>
                {index + 1}. {player.nickname}
              </span>
              <strong>{player.score}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
