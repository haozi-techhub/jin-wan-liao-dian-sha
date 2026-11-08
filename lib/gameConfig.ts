import type { GameDefinition, GameId } from '@/types/game';

export const gameConfig: Record<GameId, GameDefinition> = {
  mostLikely: {
    title: '😂 谁最有可能',
    buttonText: '下一题',
    endpoint: '/api/most-likely'
  },
  truthDare: {
    title: '🃏 真心话大冒险',
    buttonText: '再抽一张',
    endpoint: '/api/truth-dare'
  },
  wouldRather: {
    title: '🤔 二选一',
    buttonText: '下一题',
    endpoint: '/api/would-you-rather'
  },
  challenge: {
    title: '🎲 随机挑战',
    buttonText: '换个挑战',
    endpoint: '/api/challenge'
  },
  conversation: {
    title: '💭 聊天话题',
    buttonText: '下一题',
    endpoint: '/api/conversation'
  },
  tonight: {
    title: '🎯 今晚玩什么',
    buttonText: '抽个主意',
    endpoint: '/api/tonight'
  },
  riddles: {
    title: '🧩 趣味谜语',
    buttonText: '下一题',
    endpoint: '/api/riddles',
    supportsSpicy: false
  },
  emojiDecode: {
    title: '🎬 表情猜谜',
    buttonText: '下一题',
    endpoint: '/api/emoji-decode',
    supportsSpicy: false
  }
};
