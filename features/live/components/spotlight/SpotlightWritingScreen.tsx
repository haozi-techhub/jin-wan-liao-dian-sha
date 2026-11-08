'use client';

import { useState } from 'react';
import { useSpotlightTemplates } from '@/features/live/hooks/useSpotlightTemplates';
import { pickRandomItem } from '@/features/live/utils';

interface SpotlightWritingScreenProps {
  spotlightName: string | null;
  roundIndex: number;
  isSpotlight: boolean;
  submittedCount: number;
  totalWriters: number;
  hasSubmitted: boolean;
  onSubmit: (text: string) => void;
}

export default function SpotlightWritingScreen({
  spotlightName,
  roundIndex,
  isSpotlight,
  submittedCount,
  totalWriters,
  hasSubmitted,
  onSubmit
}: SpotlightWritingScreenProps) {
  const [draft, setDraft] = useState('');
  const { templates, isLoading } = useSpotlightTemplates();
  const isDisabled = isSpotlight || hasSubmitted;

  const handleTemplate = (templateOptions: readonly string[]) => {
    if (isDisabled || templateOptions.length === 0) {
      return;
    }

    setDraft(pickRandomItem(templateOptions) ?? '');
  };

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    onSubmit(draft);
  };

  const spotlightLabel = spotlightName ? `🎤 ${spotlightName} 是本轮主角！` : '🎤 匿名焦点';

  return (
    <section className="live-shell">
      <div className="live-header-row">
        <h1 className="live-title">匿名焦点 · 第 {Math.max(1, roundIndex)} 轮</h1>
      </div>

      <div className="live-spotlight-banner">{spotlightLabel}</div>

      {isSpotlight ? (
        <div className="live-panel">
          <p className="live-question-copy">
            大家正在给你写匿名问题，准备大声回答吧。
          </p>
          <p className="live-progress">
            已收到 {submittedCount}/{Math.max(0, totalWriters)} 个问题
          </p>
        </div>
      ) : (
        <div className="live-panel">
          <label htmlFor="spotlight-question" className="live-label">
            写一个匿名问题
          </label>
          <textarea
            id="spotlight-question"
            className="live-input live-textarea"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="输入你想问的问题…"
            maxLength={160}
            disabled={isDisabled}
            rows={3}
          />

          <div className="live-template-row">
            <button
              type="button"
              className="live-btn-neutral"
              onClick={() => handleTemplate(templates.spicy)}
              disabled={isDisabled || isLoading || templates.spicy.length === 0}
            >
              😈 大胆
            </button>
            <button
              type="button"
              className="live-btn-neutral"
              onClick={() => handleTemplate(templates.funny)}
              disabled={isDisabled || isLoading || templates.funny.length === 0}
            >
              😂 搞笑
            </button>
            <button
              type="button"
              className="live-btn-neutral"
              onClick={() => handleTemplate(templates.deep)}
              disabled={isDisabled || isLoading || templates.deep.length === 0}
            >
              🤯 走心
            </button>
          </div>

          <button type="button" className="live-btn-main" onClick={handleSubmit} disabled={isDisabled || draft.trim().length < 3}>
            {hasSubmitted ? '问题已提交' : '提交问题'}
          </button>

          <p className="live-helper-text">
            已收到 {submittedCount}/{Math.max(0, totalWriters)} 个问题
          </p>
        </div>
      )}
    </section>
  );
}
