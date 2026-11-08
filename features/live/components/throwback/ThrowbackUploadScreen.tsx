'use client';

import { type ChangeEvent, useState } from 'react';
import RoomCodeCard from '@/features/live/components/common/RoomCodeCard';
import { fileToOptimizedDataUrl } from '@/features/live/utils/imageUpload';

interface ThrowbackUploadScreenProps {
  roomCode: string;
  prompt: string | null;
  imageLabel: string | null;
  uploadedCount: number;
  totalPlayers: number;
  hasUploadedImage: boolean;
  errorMessage: string | null;
  onSubmit: (imageDataUrl: string) => void;
}

export default function ThrowbackUploadScreen({
  roomCode,
  prompt,
  imageLabel,
  uploadedCount,
  totalPlayers,
  hasUploadedImage,
  errorMessage,
  onSubmit
}: ThrowbackUploadScreenProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsPreparing(true);
      setLocalError(null);
      setSelectedFileName(file.name);
      const optimizedImage = await fileToOptimizedDataUrl(file);
      setPreview(optimizedImage);
    } catch {
      setLocalError('这张照片处理失败，请换一张。');
      setSelectedFileName(null);
    } finally {
      setIsPreparing(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!preview) {
      setLocalError('请先选择一张照片。');
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);
    onSubmit(preview);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 250);
  };

  return (
    <section className="live-shell">
      <h1 className="live-title">上传回忆照片</h1>
      <RoomCodeCard roomCode={roomCode} />

      <div className="live-panel">
        <p className="live-question-copy">{prompt ?? '这是谁的照片？'}</p>
        <p className="live-helper-text">
          请按主题上传照片： <strong>{imageLabel ?? '童年照'}</strong>
        </p>
        <p className="live-progress">
          已收到 {uploadedCount}/{totalPlayers} 张照片
        </p>
      </div>

      <div className="live-panel">
        <label htmlFor="throwback-upload" className="live-label">
          选择照片
        </label>
        <input
          id="throwback-upload"
          className="live-file-input-hidden"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          disabled={isPreparing}
        />
        <div className="live-file-row">
          <label htmlFor="throwback-upload" className="live-btn-neutral live-file-trigger">
            {isPreparing ? '正在处理…' : '选择照片'}
          </label>
          <p className="live-file-name">{selectedFileName ?? '尚未选择照片'}</p>
        </div>

        {preview ? (
          <div className="live-image-preview-card">
            <img src={preview} alt="待上传的照片预览" className="live-image-preview" />
          </div>
        ) : null}

        <button
          type="button"
          className="live-btn-main"
          onClick={handleSubmit}
          disabled={!preview || isPreparing || isSubmitting}
        >
          {isPreparing ? '正在处理…' : hasUploadedImage ? '更换照片' : '上传照片'}
        </button>

        {hasUploadedImage ? (
          <p className="live-helper-text">照片已上传，在主持人开始游戏前可以更换。</p>
        ) : null}
      </div>

      {localError ? <p className="live-error">{localError}</p> : null}
      {errorMessage ? <p className="live-error">{errorMessage}</p> : null}
    </section>
  );
}
