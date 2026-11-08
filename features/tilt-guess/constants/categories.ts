import type { TiltGuessCategorySelection } from '@/features/tilt-guess/types/tiltGuess';

export interface TiltGuessCategoryOption {
  id: TiltGuessCategorySelection;
  label: string;
  subtitle: string;
}

export const TILT_GUESS_CATEGORIES: TiltGuessCategoryOption[] = [
  {
    id: 'all',
    label: '全部类别',
    subtitle: '五类题目混合抽取'
  },
  {
    id: 'animals',
    label: '动物',
    subtitle: '从大熊猫到章鱼'
  },
  {
    id: 'movies',
    label: '电影',
    subtitle: '经典电影片名'
  },
  {
    id: 'food',
    label: '美食',
    subtitle: '小吃、主食和甜点'
  },
  {
    id: 'video-games',
    label: '电子游戏',
    subtitle: '熟悉的游戏名称'
  },
  {
    id: 'public-figures',
    label: '名人',
    subtitle: '文体名人和历史人物'
  }
];
