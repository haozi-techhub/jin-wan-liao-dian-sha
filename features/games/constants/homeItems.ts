import type { PlayableId } from '@/types/game';

export interface HomeItem {
  id: PlayableId;
  icon: string;
  title: string;
  subtitle: string;
  accent?: string;
}

export const HOME_ITEMS: HomeItem[] = [
  {
    id: 'mostLikely',
    icon: '😂',
    title: "谁最有可能",
    subtitle: '数到三，一起指向你心里的人选。',
    accent: '#ff7a59'
  },
  {
    id: 'truthDare',
    icon: '🃏',
    title: '真心话大冒险',
    subtitle: '说出真心话，或接下一个挑战。',
    accent: '#ff4f8b'
  },
  {
    id: 'wouldRather',
    icon: '🤔',
    title: '二选一',
    subtitle: '两个选项必须挑一个，你选哪个？',
    accent: '#00b8ff'
  },
  {
    id: 'challenge',
    icon: '🎲',
    title: '随机挑战',
    subtitle: '抽到什么，就挑战什么。',
    accent: '#06d6a0'
  },
  {
    id: 'conversation',
    icon: '🧠',
    title: '聊天话题',
    subtitle: '抽个话题，大家轮流聊。',
    accent: '#a78bfa'
  },
  {
    id: 'tonight',
    icon: '🎯',
    title: '今晚玩什么',
    subtitle: '拿不定主意？随机抽个安排。',
    accent: '#f59e0b'
  },
  {
    id: 'riddles',
    icon: '🧩',
    title: '趣味谜语',
    subtitle: '猜完再翻答案。',
    accent: '#c3d334ff'
  },
  {
    id: 'emojiDecode',
    icon: '🎬',
    title: '表情猜谜',
    subtitle: '看表情组合，猜它指什么。',
    accent: '#72b7f4ff'
  },
  {
    id: 'liveQuiz',
    icon: '🍬',
    title: '联机答题',
    subtitle: '创建或加入房间，和朋友比比谁答得又快又准。',
  },
  {
    id: 'spotlight',
    icon: '🎤',
    title: '匿名焦点',
    subtitle: '轮流当主角，回答匿名问题，再猜是谁问的。',
  },
  {
    id: 'tiltGuess',
    icon: '📱',
    title: '摇头猜词',
    subtitle: '把手机贴在额头，让朋友给提示。',
  },
  {
    id: 'wheel',
    icon: '☸️',
    title: '幸运转盘',
    subtitle: '随机选玩法，或抽出下一位玩家。',
  }
];
