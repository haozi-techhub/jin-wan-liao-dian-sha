'use client';

import RoomCodeCard from '@/features/live/components/common/RoomCodeCard';
import RoomShareCard from '@/features/live/components/common/RoomShareCard';
import type { LiveStatus, Player } from '@/features/live/types';

interface ThrowbackHostScreenProps {
  roomCode: string;
  status: LiveStatus | 'idle';
  players: Player[];
  prompt: string | null;
  imageLabel: string | null;
  uploadedCount: number;
  questionText: string | null;
  imageDataUrl: string | null;
  voteCounts: number[];
  answeredCount: number;
  totalPlayers: number;
  onStartGame: () => void;
  onNextQuestion: () => void;
  onEndGame: () => void;
  onStartOver: () => void;
}

function statusLabel(status: ThrowbackHostScreenProps['status']): string {
  if (status === 'question') {
    return '竞猜中';
  }

  if (status === 'results') {
    return '公布结果';
  }

  if (status === 'finished') {
    return '已结束';
  }

  if (status === 'lobby') {
    return '收集照片中';
  }

  return '就绪';
}

export default function ThrowbackHostScreen({
  roomCode,
  status,
  players,
  prompt,
  imageLabel,
  uploadedCount,
  questionText,
  imageDataUrl,
  voteCounts,
  answeredCount,
  totalPlayers,
  onStartGame,
  onNextQuestion,
  onEndGame,
  onStartOver
}: ThrowbackHostScreenProps) {
  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">回忆猜猜看主持台</h1>
        <span className="live-status-pill">{statusLabel(status)}</span>
      </div>

      <RoomCodeCard roomCode={roomCode} />
      <RoomShareCard roomCode={roomCode} joinPathBase="/live" />

      <div className="live-panel">
        <h2 className="live-section-title">竞猜设置</h2>
        <p className="live-question-copy">{prompt ?? '这是谁的照片？'}</p>
        <p className="live-helper-text">
          请玩家按主题上传照片： <strong>{imageLabel ?? '童年照'}</strong>
        </p>
        {status === 'lobby' ? (
          <p className="live-progress">
            已收到 {uploadedCount}/{players.length} 张照片
          </p>
        ) : null}
        {(status === 'question' || status === 'results') && questionText ? (
          <p className="live-progress">
            已有 {answeredCount}/{totalPlayers} 人参与竞猜
          </p>
        ) : null}
      </div>

      <div className="live-panel">
        <h2 className="live-section-title">玩家（{players.length}）</h2>
        <ul className="live-player-list">
          {players.length === 0 ? <li className="live-muted">等待玩家加入…</li> : null}
          {players.map((player) => (
            <li key={player.id}>
              <div className="live-player-stack">
                <span>{player.nickname}</span>
                <span className={`live-upload-pill ${player.hasUploadedImage ? 'live-upload-pill--ready' : ''}`}>
                  {player.hasUploadedImage ? '已上传照片' : '等待上传'}
                </span>
              </div>
              <strong>{player.score}</strong>
            </li>
          ))}
        </ul>
      </div>

      {(status === 'question' || status === 'results') && voteCounts.length > 0 ? (
        <div className="live-panel">
          <h2 className="live-section-title">实时票数</h2>
          {imageDataUrl ? (
            <div className="live-image-stage">
              <img src={imageDataUrl} alt="本轮竞猜照片" className="live-round-image" />
            </div>
          ) : null}
          <p className="live-question-copy">{questionText ?? '本轮照片竞猜已开始。'}</p>
          <div className="live-vote-grid">
            {voteCounts.map((count, index) => (
              <div key={`vote-${index}`} className={`live-vote-card live-vote-card--${index % 4}`}>
                <span>选项 {index + 1}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="live-actions">
        {status === 'lobby' ? (
          <button
            type="button"
            className="live-btn-main"
            onClick={onStartGame}
            disabled={players.length < 2 || uploadedCount !== players.length}
          >
            开始竞猜
          </button>
        ) : null}

        {status === 'results' ? (
          <button type="button" className="live-btn-main" onClick={onNextQuestion}>
            下一张照片
          </button>
        ) : null}

        {status !== 'finished' ? (
          <button type="button" className="live-btn-danger" onClick={onEndGame}>
            结束游戏
          </button>
        ) : null}

        {status === 'finished' ? (
          <button type="button" className="live-btn-main" onClick={onStartOver}>
            再开一局
          </button>
        ) : null}
      </div>
    </section>
  );
}
