'use client';

import RoomCodeCard from '@/features/live/components/common/RoomCodeCard';
import RoomShareCard from '@/features/live/components/common/RoomShareCard';
import type { LiveStatus, Player } from '@/features/live/types';

interface QuizHostScreenProps {
  roomCode: string;
  status: LiveStatus | 'idle';
  players: Player[];
  questionText: string | null;
  voteCounts: number[];
  answeredCount: number;
  totalPlayers: number;
  onStartGame: () => void;
  onNextQuestion: () => void;
  onEndGame: () => void;
  onStartOver: () => void;
}

function statusLabel(status: QuizHostScreenProps['status']): string {
  if (status === 'question') {
    return '答题中';
  }

  if (status === 'results') {
    return '公布结果';
  }

  if (status === 'finished') {
    return '已结束';
  }

  if (status === 'lobby') {
    return '等待开始';
  }

  return '就绪';
}

export default function QuizHostScreen({
  roomCode,
  status,
  players,
  questionText,
  voteCounts,
  answeredCount,
  totalPlayers,
  onStartGame,
  onNextQuestion,
  onEndGame,
  onStartOver
}: QuizHostScreenProps) {
  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">联机答题主持台</h1>
        <span className="live-status-pill">{statusLabel(status)}</span>
      </div>

      <RoomCodeCard roomCode={roomCode} />

      <RoomShareCard roomCode={roomCode} joinPathBase="/live" />

      <div className="live-panel">
        <h2 className="live-section-title">玩家（{players.length}）</h2>
        <ul className="live-player-list">
          {players.length === 0 ? <li className="live-muted">等待玩家加入…</li> : null}
          {players.map((player) => (
            <li key={player.id}>
              <span>{player.nickname}</span>
              <strong>{player.score}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="live-panel">
        <h2 className="live-section-title">实时票数</h2>
        <p className="live-question-copy">{questionText ?? '等玩家加入后即可开始答题。'}</p>

        {(status === 'question' || status === 'results') && (
          <>
            <p className="live-progress">
              已作答 {answeredCount}/{totalPlayers} 人
            </p>
            <div className="live-vote-grid">
              {voteCounts.map((count, index) => (
                <div key={`vote-${index}`} className={`live-vote-card live-vote-card--${index}`}>
                  <span>选项 {index + 1}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="live-actions">
        {status === 'lobby' && (
          <button type="button" className="live-btn-main" onClick={onStartGame} disabled={players.length === 0}>
            开始游戏
          </button>
        )}

        {status === 'results' && (
          <button type="button" className="live-btn-main" onClick={onNextQuestion}>
            下一题
          </button>
        )}

        {status !== 'finished' && (
          <button type="button" className="live-btn-danger" onClick={onEndGame}>
            结束游戏
          </button>
        )}

        {status === 'finished' && (
          <button type="button" className="live-btn-main" onClick={onStartOver}>
            再开一局
          </button>
        )}
      </div>
    </section>
  );
}
