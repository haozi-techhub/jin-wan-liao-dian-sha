'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import InfoDialog from '@/components/ui/InfoDialog';
import { HOME_ITEMS } from '@/features/games/constants/homeItems';
import { HOW_TO_PLAY } from '@/features/games/constants/howToPlay';
import { useDialog } from '@/hooks/useDialog';
import type { PlayableId } from '@/types/game';

interface HomeScreenProps {
  isActive: boolean;
  onOpenGame: (id: PlayableId) => void;
}

export default function HomeScreen({ isActive, onOpenGame }: HomeScreenProps) {
  const { isOpen, open, close } = useDialog();
  const wheelItem = HOME_ITEMS.find((item) => item.id === 'wheel');
  const tiltGuessItem = HOME_ITEMS.find((item) => item.id === 'tiltGuess');
  const liveQuizItem = HOME_ITEMS.find((item) => item.id === 'liveQuiz');
  const spotlightItem = HOME_ITEMS.find((item) => item.id === 'spotlight');
  const gameItems = HOME_ITEMS.filter((item) => item.id !== 'wheel' && item.id !== 'tiltGuess' && item.id !== 'liveQuiz' && item.id !== 'spotlight');

  return (
    <div className={`screen ${isActive ? "active" : ""}`} id="home">
      <section className="home-hero">
        <p className="home-kicker">聚会小游戏</p>
        <h1 className="home-title">今晚聊点啥</h1>
        <div className="home-subtitle-row">
          <p className="home-subtitle">
            选个玩法，把手机传给下一位。
          </p>
          <div className="home-help-inline">
            <button type="button" className="how-to-play-btn" onClick={open}>
              怎么玩？
            </button>
          </div>
        </div>
      </section>

      {liveQuizItem ? (
        <section className="home-live-card">
          <div>
            <p className="home-live-pill">联机玩法</p>
            <h2>
              {liveQuizItem.icon} {liveQuizItem.title}
            </h2>
            <p>{liveQuizItem.subtitle}</p>
          </div>
          <Link href="/live" className="home-live-card__cta">
            开始玩
          </Link>
        </section>
      ) : null}

      {spotlightItem ? (
        <section className="home-live-card home-live-card--spotlight">
          <div>
            <p className="home-live-pill">联机玩法</p>
            <h2>
              {spotlightItem.icon} {spotlightItem.title}
            </h2>
            <p>{spotlightItem.subtitle}</p>
          </div>
          <Link href="/spotlight" className="home-live-card__cta">
            开始玩
          </Link>
        </section>
      ) : null}

      {tiltGuessItem ? (
        <section className="home-tilt-card">
          <div>
            <p className="home-tilt-pill">同屏玩法</p>
            <h2>
              {tiltGuessItem.icon} {tiltGuessItem.title}
            </h2>
            <p>{tiltGuessItem.subtitle}</p>
          </div>
          <button
            type="button"
            className="home-tilt-card__cta"
            onClick={() => onOpenGame(tiltGuessItem.id)}
          >
            开始玩
          </button>
        </section>
      ) : null}

      <div className="home-menu-grid">
        {gameItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="home-menu-btn"
            style={{ "--home-accent": item.accent } as CSSProperties}
            onClick={() => onOpenGame(item.id)}
          >
            <span className="home-menu-btn__icon">{item.icon}</span>
            <span className="home-menu-btn__text">
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </span>
          </button>
        ))}
      </div>

      {wheelItem ? (
        <section className="home-wheel-card">
          <div>
            <p className="home-wheel-pill">随机选择</p>
            <h2>
              {wheelItem.icon} {wheelItem.title}
            </h2>
            <p>{wheelItem.subtitle}</p>
          </div>
          <button
            type="button"
            className="home-wheel-card__cta"
            onClick={() => onOpenGame(wheelItem.id)}
          >
            打开转盘
          </button>
        </section>
      ) : null}

      <InfoDialog
        isOpen={isOpen}
        onClose={close}
        kicker={HOW_TO_PLAY.kicker}
        title={HOW_TO_PLAY.title}
        intro={HOW_TO_PLAY.intro}
        steps={HOW_TO_PLAY.steps}
        sections={HOW_TO_PLAY.sections}
        actionLabel={HOW_TO_PLAY.actionLabel}
        titleId="howToPlayDialogTitle"
      />
    </div>
  );
}
