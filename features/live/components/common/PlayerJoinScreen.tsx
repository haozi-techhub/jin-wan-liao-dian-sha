'use client';

import { type ChangeEvent, useState } from 'react';
import RoomCodeCard from '@/features/live/components/common/RoomCodeCard';
import type { LiveMode } from '@/features/live/types';
import { fileToOptimizedDataUrl } from '@/features/live/utils/imageUpload';

interface PlayerJoinScreenProps {
  roomCode: string;
  errorMessage: string | null;
  isConnected: boolean;
  isJoining: boolean;
  roomMode: LiveMode | null;
  throwbackImageLabel?: string | null;
  onJoin: (nickname: string, throwbackImageDataUrl?: string) => void;
}

export default function PlayerJoinScreen({
  roomCode,
  errorMessage,
  isConnected,
  isJoining,
  roomMode,
  throwbackImageLabel,
  onJoin
}: PlayerJoinScreenProps) {
  const [nickname, setNickname] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isPreparingImage, setIsPreparingImage] = useState(false);

  const isThrowbackRoom = roomMode === 'throwback';

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setLocalError('请选择图片文件。');
      return;
    }

    try {
      setIsPreparingImage(true);
      setLocalError(null);
      setSelectedFileName(file.name);
      const optimizedImage = await fileToOptimizedDataUrl(file);
      setImagePreview(optimizedImage);
    } catch {
      setLocalError('这张照片处理失败，请换一张。');
      setSelectedFileName(null);
    } finally {
      setIsPreparingImage(false);
      event.target.value = '';
    }
  };

  return (
    <section className="live-shell">
      <h1 className="live-title">加入房间</h1>
      <RoomCodeCard roomCode={roomCode} />

      <div className="live-panel">
        <label htmlFor="nickname" className="live-label">
          昵称
        </label>
        <input
          id="nickname"
          className="live-input"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="输入昵称"
          maxLength={24}
        />

        {isThrowbackRoom ? (
          <>
            <label htmlFor="join-photo" className="live-label">
              照片
            </label>
            <input
              id="join-photo"
              className="live-file-input-hidden"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileChange}
              disabled={isPreparingImage || isJoining}
            />
            <div className="live-file-row">
              <label htmlFor="join-photo" className="live-btn-neutral live-file-trigger">
                {isPreparingImage ? '正在处理…' : '选择照片'}
              </label>
              <p className="live-file-name">{selectedFileName ?? '尚未选择照片'}</p>
            </div>

            {imagePreview ? (
              <div className="live-image-preview-card">
                <img src={imagePreview} alt="已选照片预览" className="live-image-preview" />
              </div>
            ) : null}

            <p className="live-helper-text">
              请按主题上传照片：<strong>{throwbackImageLabel ?? '回忆照片'}</strong>
            </p>
          </>
        ) : null}

        <button
          type="button"
          className="live-btn-main"
          onClick={() => onJoin(nickname, imagePreview ?? undefined)}
          disabled={
            !isConnected ||
            isJoining ||
            isPreparingImage ||
            nickname.trim().length === 0 ||
            (isThrowbackRoom && !imagePreview)
          }
        >
          {isJoining ? '正在加入…' : '加入房间'}
        </button>
      </div>

      {localError ? <p className="live-error">{localError}</p> : null}
      {errorMessage ? <p className="live-error">{errorMessage}</p> : null}
    </section>
  );
}
