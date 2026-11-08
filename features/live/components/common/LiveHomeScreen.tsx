"use client";

import { useMemo, useState } from "react";
import type { LiveMode, Question, ThrowbackConfig } from "@/features/live/types";

type HostMode = "default" | "custom";

type QuestionDraft = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctOptionIndex: number;
};

interface LiveHomeScreenProps {
  roomCode: string;
  errorMessage: string | null;
  isConnected: boolean;
  isCreatingRoom: boolean;
  onRoomCodeChange: (value: string) => void;
  onHostGame: (options?: { mode?: LiveMode; questions?: Question[]; throwbackConfig?: ThrowbackConfig }) => void;
  onJoinGame: () => void;
  availableModes?: LiveMode[];
  defaultMode?: LiveMode;
  title?: string;
  subtitle?: string;
}

const createQuestionDraft = (): QuestionDraft => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  prompt: "",
  options: ["", "", "", ""],
  correctOptionIndex: 0,
});

function toQuestions(drafts: QuestionDraft[]): Question[] {
  return drafts
    .map((draft, index) => ({
      id: `custom-${index + 1}`,
      prompt: draft.prompt.trim(),
      options: [
        draft.options[0].trim(),
        draft.options[1].trim(),
        draft.options[2].trim(),
        draft.options[3].trim(),
      ] as [string, string, string, string],
      correctOptionIndex: draft.correctOptionIndex,
    }))
    .filter((question) => {
      return (
        question.prompt.length > 0 &&
        question.options.every((option) => option.length > 0)
      );
    });
}

export default function LiveHomeScreen({
  roomCode,
  errorMessage,
  isConnected,
  isCreatingRoom,
  onRoomCodeChange,
  onHostGame,
  onJoinGame,
  availableModes = ["quiz", "spotlight", "throwback"],
  defaultMode,
  title = "联机游戏",
  subtitle = "创建房间，邀请朋友一起玩。",
}: LiveHomeScreenProps) {
  const [liveMode, setLiveMode] = useState<LiveMode>(() => {
    if (defaultMode && availableModes.includes(defaultMode)) {
      return defaultMode;
    }

    return availableModes[0] ?? "quiz";
  });
  const [hostMode, setHostMode] = useState<HostMode>("default");
  const [customQuestions, setCustomQuestions] = useState<QuestionDraft[]>([
    createQuestionDraft(),
  ]);
  const [throwbackPrompt, setThrowbackPrompt] = useState("");
  const [throwbackImageLabel, setThrowbackImageLabel] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const validCustomQuestions = useMemo(
    () => toQuestions(customQuestions),
    [customQuestions],
  );

  const handleHostGame = () => {
    if (liveMode === "spotlight") {
      setLocalError(null);
      onHostGame({ mode: "spotlight" });
      return;
    }

    if (liveMode === "throwback") {
      const normalizedPrompt = throwbackPrompt.trim();
      const normalizedLabel = throwbackImageLabel.trim();

      if (normalizedPrompt.length < 3) {
        setLocalError("请写一个至少 3 个字的竞猜问题。");
        return;
      }

      if (normalizedLabel.length < 2) {
        setLocalError("请填写至少 2 个字的照片主题，例如童年照、海边旅行或毕业照。");
        return;
      }

      setLocalError(null);
      onHostGame({
        mode: "throwback",
        throwbackConfig: {
          prompt: normalizedPrompt,
          imageLabel: normalizedLabel,
        },
      });
      return;
    }

    if (hostMode === "default") {
      setLocalError(null);
      onHostGame({ mode: "quiz" });
      return;
    }

    if (validCustomQuestions.length === 0) {
      setLocalError("请至少填写一道完整的自定义题目。");
      return;
    }

    setLocalError(null);
    onHostGame({ mode: "quiz", questions: validCustomQuestions });
  };

  const updateDraft = (
    id: string,
    updater: (draft: QuestionDraft) => QuestionDraft,
  ) => {
    setCustomQuestions((previous) =>
      previous.map((draft) => (draft.id === id ? updater(draft) : draft)),
    );
  };

  return (
    <section className="live-shell">
      <h1 className="live-title">{title}</h1>
      <p className="live-subtitle">{subtitle}</p>

      <div className="live-panel">
        <h2 className="live-section-title">创建房间</h2>

        {availableModes.length > 1 ? (
          <div className="live-mode-toggle live-mode-toggle--wide">
            {availableModes.includes("quiz") ? (
              <button
                type="button"
                className={`live-mode-btn ${liveMode === "quiz" ? "live-mode-btn--active" : ""}`}
                onClick={() => setLiveMode("quiz")}
              >
                联机答题
              </button>
            ) : null}
            {availableModes.includes("spotlight") ? (
              <button
                type="button"
                className={`live-mode-btn ${liveMode === "spotlight" ? "live-mode-btn--active" : ""}`}
                onClick={() => setLiveMode("spotlight")}
              >
                匿名焦点
              </button>
            ) : null}
            {availableModes.includes("throwback") ? (
              <button
                type="button"
                className={`live-mode-btn ${liveMode === "throwback" ? "live-mode-btn--active" : ""}`}
                onClick={() => setLiveMode("throwback")}
              >
                回忆猜猜看
              </button>
            ) : null}
          </div>
        ) : null}

        {liveMode === "spotlight" ? (
          <p className="live-muted" style={{ marginBottom: "20px" }}>
            每轮选一位主角回答匿名问题，其他人发表反应，再猜是谁提问。
          </p>
        ) : null}

        {liveMode === "throwback" ? (
          <div className="live-custom-builder">
            <p className="live-muted" style={{ marginBottom: 10 }}>
              玩家按主题上传照片，大家一起猜每张照片是谁的。
            </p>

            <label htmlFor="throwback-prompt" className="live-label">
              竞猜问题
            </label>
            <input
              id="throwback-prompt"
              className="live-input"
              value={throwbackPrompt}
              onChange={(event) => setThrowbackPrompt(event.target.value)}
              placeholder="照片里的小朋友是谁？"
              maxLength={120}
            />

            <label htmlFor="throwback-image-label" className="live-label">
              照片主题
            </label>
            <input
              id="throwback-image-label"
              className="live-input"
              value={throwbackImageLabel}
              onChange={(event) => setThrowbackImageLabel(event.target.value)}
              placeholder="童年照"
              maxLength={40}
            />
          </div>
        ) : null}

        {liveMode === "quiz" ? (
          <>
            <div className="live-mode-toggle">
              <button
                type="button"
                className={`live-mode-btn ${hostMode === "default" ? "live-mode-btn--active" : ""}`}
                onClick={() => setHostMode("default")}
              >
                使用默认题库
              </button>
              <button
                type="button"
                className={`live-mode-btn ${hostMode === "custom" ? "live-mode-btn--active" : ""}`}
                onClick={() => setHostMode("custom")}
              >
                自定义题目
              </button>
            </div>
          </>
        ) : null}

        {liveMode === "quiz" && hostMode === "custom" ? (
          <div className="live-custom-builder">
            <p className="live-muted" style={{ marginBottom: 10 }}>
              每道题填写 4 个选项，并选出正确答案。
            </p>

            {customQuestions.map((question, index) => (
              <div key={question.id} className="live-question-card">
                <div className="live-question-card__head">
                  <strong>第 {index + 1} 题</strong>
                  {customQuestions.length > 1 ? (
                    <button
                      type="button"
                      className="live-mini-danger"
                      onClick={() =>
                        setCustomQuestions((previous) =>
                          previous.filter((entry) => entry.id !== question.id),
                        )
                      }
                    >
                      删除
                    </button>
                  ) : null}
                </div>

                <input
                  className="live-input"
                  value={question.prompt}
                  onChange={(event) =>
                    updateDraft(question.id, (draft) => ({
                      ...draft,
                      prompt: event.target.value,
                    }))
                  }
                  placeholder="输入题目"
                />

                {[0, 1, 2, 3].map((optionIndex) => (
                  <input
                    key={`${question.id}-option-${optionIndex}`}
                    className="live-input"
                    value={question.options[optionIndex]}
                    onChange={(event) =>
                      updateDraft(question.id, (draft) => {
                        const updatedOptions = [...draft.options] as [
                          string,
                          string,
                          string,
                          string,
                        ];
                        updatedOptions[optionIndex] = event.target.value;
                        return {
                          ...draft,
                          options: updatedOptions,
                        };
                      })
                    }
                    placeholder={`选项 ${optionIndex + 1}`}
                  />
                ))}

                <label
                  className="live-label"
                  htmlFor={`correct-${question.id}`}
                >
                  正确选项
                </label>
                <select
                  id={`correct-${question.id}`}
                  className="live-input live-select"
                  value={question.correctOptionIndex}
                  onChange={(event) =>
                    updateDraft(question.id, (draft) => ({
                      ...draft,
                      correctOptionIndex: Number(event.target.value),
                    }))
                  }
                >
                  <option value={0}>选项 1</option>
                  <option value={1}>选项 2</option>
                  <option value={2}>选项 3</option>
                  <option value={3}>选项 4</option>
                </select>
              </div>
            ))}

            <button
              type="button"
              className="live-btn-neutral"
              onClick={() =>
                setCustomQuestions((previous) => [
                  ...previous,
                  createQuestionDraft(),
                ])
              }
            >
              添加一道题
            </button>

            <p className="live-helper-text">
              已填写 {validCustomQuestions.length} 道完整题目
            </p>
          </div>
        ) : null}

        <button
          type="button"
          className="live-btn-main"
          onClick={handleHostGame}
          disabled={!isConnected || isCreatingRoom}
        >
          {isCreatingRoom ? "正在创建房间…" : "创建房间"}
        </button>

        <div className="live-divider">
          <span>或</span>
        </div>

        <label htmlFor="liveRoomCode" className="live-label">
          输入房间码
        </label>
        <input
          id="liveRoomCode"
          className="live-input live-input--code"
          value={roomCode}
          onChange={(event) => onRoomCodeChange(event.target.value)}
          placeholder="ABC123"
          maxLength={6}
          inputMode="text"
          autoCapitalize="characters"
        />

        <button
          type="button"
          className="live-btn-neutral"
          onClick={onJoinGame}
          disabled={roomCode.length !== 6}
        >
          加入房间
        </button>
      </div>

      <p
        className={`live-connection ${isConnected ? "live-connection--online" : "live-connection--offline"}`}
      >
        {isConnected ? "已连接" : errorMessage ? "暂未连接" : "正在连接…"}
      </p>

      {localError ? <p className="live-error">{localError}</p> : null}
      {errorMessage ? <p className="live-error">{errorMessage}</p> : null}
    </section>
  );
}
