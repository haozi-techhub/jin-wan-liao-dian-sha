'use client';

import RoomCodeCard from '@/features/live/components/common/RoomCodeCard';
import RoomShareCard from '@/features/live/components/common/RoomShareCard';
import type { LiveStatus, Player } from '@/features/live/types';

interface SpotlightHostScreenProps {
  roomCode: string;
  status: LiveStatus | 'idle';
  players: Player[];
  spotlightName: string | null;
  roundIndex: number;
  submittedCount: number;
  totalWriters: number;
  reactionCounts: [number, number, number, number];
  reactionAnswered: number;
  totalReactors: number;
  guessAnswered: number;
  totalGuessers: number;
  questionText: string | null;
  skipReason: string | null;
  joinPathBase?: string;
  onStartGame: () => void;
  onNextRound: () => void;
  onEndGame: () => void;
  onStartOver: () => void;
}

function statusLabel(status: SpotlightHostScreenProps['status']): string {
  if (status === 'writing') {
    return '收集问题中';
  }

  if (status === 'choice') {
    return '选题中';
  }

  if (status === 'reveal') {
    return '回答中';
  }

  if (status === 'reaction') {
    return '收集反应中';
  }

  if (status === 'guess') {
    return '投票中';
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

export default function SpotlightHostScreen({
  roomCode,
  status,
  players,
  spotlightName,
  roundIndex,
  submittedCount,
  totalWriters,
  reactionCounts,
  reactionAnswered,
  totalReactors,
  guessAnswered,
  totalGuessers,
  questionText,
  skipReason,
  joinPathBase = '/spotlight',
  onStartGame,
  onNextRound,
  onEndGame,
  onStartOver
}: SpotlightHostScreenProps) {
  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">匿名焦点主持台</h1>
        <span className="live-status-pill">{statusLabel(status)}</span>
      </div>

      <RoomCodeCard roomCode={roomCode} />

      <RoomShareCard roomCode={roomCode} joinPathBase={joinPathBase} />

      <div className="live-panel">
        <h2 className="live-section-title">玩家（{players.length}）</h2>
        <ul className="live-player-list">
          {players.length === 0 ? <li className="live-muted">等待玩家加入…</li> : null}
          {players.map((player) => (
            <li key={player.id}>
              <span>{player.nickname}</span>
              <span className="live-muted">已加入</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="live-panel">
        <h2 className="live-section-title">第 {Math.max(1, roundIndex)} 轮</h2>
        <p className="live-question-copy">
          {spotlightName ? `本轮主角：${spotlightName}` : '等待主角上场…'}
        </p>
        {status === 'writing' ? (
          <p className="live-progress">
            已收到 {submittedCount}/{Math.max(0, totalWriters)} 个问题
          </p>
        ) : null}
        {status === 'reveal' && questionText ? (
          <p className="live-question-copy">{questionText}</p>
        ) : null}
        {status === 'reveal' || status === 'reaction' ? (
          <div className="live-vote-grid">
            {reactionCounts.map((count, index) => (
              <div key={`reaction-${index}`} className={`live-vote-card live-vote-card--${index}`}>
                <span>反应 {index + 1}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        ) : null}
        {status === 'reveal' || status === 'reaction' ? (
          <p className="live-progress">
            已发表反应 {reactionAnswered}/{totalReactors} 人
          </p>
        ) : null}
        {status === 'guess' ? (
          <p className="live-progress">
            已投票 {guessAnswered}/{totalGuessers} 人
          </p>
        ) : null}
        {status === 'results' && skipReason ? <p className="live-muted">{skipReason}</p> : null}
      </div>

      <div className="live-actions">
        {status === 'lobby' && (
          <button type="button" className="live-btn-main" onClick={onStartGame} disabled={players.length === 0}>
            开始游戏
          </button>
        )}

        {status === 'results' && (
          <button type="button" className="live-btn-main" onClick={onNextRound}>
            下一位主角
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
