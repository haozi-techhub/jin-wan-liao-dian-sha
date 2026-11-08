import type { Question } from '@/features/live/types';

export const DEFAULT_QUIZ_QUESTIONS: Question[] = [
  {
    id: 'zh-quiz-1',
    prompt: '章鱼有几颗心脏？',
    options: ['1 颗', '2 颗', '3 颗', '4 颗'],
    correctOptionIndex: 2
  },
  {
    id: 'zh-quiz-2',
    prompt: '以下哪种乐器通常有 88 个琴键？',
    options: ['钢琴', '手风琴', '尤克里里', '小提琴'],
    correctOptionIndex: 0
  },
  {
    id: 'zh-quiz-3',
    prompt: '一年中的哪个节气，北半球白昼通常最长？',
    options: ['春分', '秋分', '冬至', '夏至'],
    correctOptionIndex: 3
  },
  {
    id: 'zh-quiz-4',
    prompt: '《西游记》里，孙悟空的师父叫什么？',
    options: ['猪八戒', '唐僧', '沙和尚', '牛魔王'],
    correctOptionIndex: 1
  },
  {
    id: 'zh-quiz-5',
    prompt: '标准六面骰子上，与 6 点相对的是几点？',
    options: ['1 点', '2 点', '3 点', '5 点'],
    correctOptionIndex: 0
  },
  {
    id: 'zh-quiz-6',
    prompt: '太阳系中，哪颗行星离太阳最近？',
    options: ['地球', '金星', '水星', '火星'],
    correctOptionIndex: 2
  },
  {
    id: 'zh-quiz-7',
    prompt: '珍珠奶茶里的传统粉圆主要用什么做？',
    options: ['玉米面', '小麦粉', '糯米粉', '木薯淀粉'],
    correctOptionIndex: 3
  },
  {
    id: 'zh-quiz-8',
    prompt: '国际象棋的棋盘上共有多少个格子？',
    options: ['48 个', '64 个', '72 个', '81 个'],
    correctOptionIndex: 1
  }
];
