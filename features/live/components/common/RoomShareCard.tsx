'use client';

import { useRoomShare } from '@/features/live/hooks/useRoomShare';

interface RoomShareCardProps {
  roomCode: string;
  joinPathBase?: string;
  title?: string;
}

export default function RoomShareCard({
  roomCode,
  joinPathBase = '/live',
  title = '扫码加入房间'
}: RoomShareCardProps) {
  const { joinUrl, qrCodeImageUrl, copyState, copyJoinLink } = useRoomShare({
    roomCode,
    joinPathBase
  });

  if (!joinUrl) {
    return null;
  }

  return (
    <div className="live-panel live-qr-panel">
      <h2 className="live-section-title">{title}</h2>
      <img src={qrCodeImageUrl} alt="加入房间的二维码" className="live-qr-image" />
      <p className="live-qr-url">{joinUrl}</p>
      <button type="button" className="live-btn-neutral live-copy-btn" onClick={copyJoinLink}>
        {copyState === 'copied' ? '链接已复制' : copyState === 'failed' ? '复制失败' : '复制邀请链接'}
      </button>
    </div>
  );
}
