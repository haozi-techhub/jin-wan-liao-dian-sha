import type { TiltGuessCategory, TiltGuessWordApiResponse } from '@/features/tilt-guess/types/tiltGuess';

const wordsByCategory: Record<TiltGuessCategory, string[]> = {
  animals: [
    '大熊猫', '东北虎', '长颈鹿', '大象', '袋鼠',
    '企鹅', '北极熊', '犀牛', '斑马', '河马',
    '狮子', '狐狸', '松鼠', '刺猬', '树懒',
    '章鱼', '海豚', '海马', '水母', '鲸鱼',
    '鳄鱼', '变色龙', '蝙蝠', '猫头鹰', '孔雀',
  ],
  movies: [
    '流浪地球', '哪吒之魔童降世', '大话西游', '功夫', '少林足球',
    '食神', '无间道', '霸王别姬', '卧虎藏龙', '我不是药神',
    '你好，李焕英', '夏洛特烦恼', '唐人街探案', '疯狂动物城', '寻梦环游记',
    '狮子王', '冰雪奇缘', '玩具总动员', '千与千寻', '龙猫',
    '侏罗纪公园', '泰坦尼克号', '蜘蛛侠', '星际穿越', '哈利·波特与魔法石',
  ],
  food: [
    '火锅', '螺蛳粉', '臭豆腐', '小笼包', '煎饼果子',
    '糖葫芦', '肉夹馍', '蛋挞', '珍珠奶茶', '北京烤鸭',
    '兰州牛肉面', '麻婆豆腐', '锅包肉', '宫保鸡丁', '小龙虾',
    '羊肉串', '麻辣烫', '粽子', '汤圆', '水饺',
    '寿司', '披萨', '汉堡', '提拉米苏', '冰淇淋',
  ],
  'video-games': [
    '王者荣耀', '和平精英', '英雄联盟', '我的世界', '原神',
    '黑神话：悟空', '植物大战僵尸', '愤怒的小鸟', '俄罗斯方块', '超级马力欧兄弟',
    '塞尔达传说', '宝可梦', '动物森友会', '魂斗罗', '街头霸王',
    '拳皇', '星露谷物语', '双人成行', '胡闹厨房', '赛博朋克 2077',
    '反恐精英', '绝地求生', '守望先锋', '炉石传说', '糖豆人',
  ],
  'public-figures': [
    '周杰伦', '邓丽君', '刘德华', '周星驰', '成龙',
    '李小龙', '章子怡', '杨紫琼', '张艺谋', '李安',
    '姚明', '李娜', '刘翔', '苏炳添', '谷爱凌',
    '梅西', '乔丹', '李白', '苏轼', '鲁迅',
    '孔子', '秦始皇', '武则天', '袁隆平', '屠呦呦',
  ],
};

export function isTiltGuessCategory(category: string): category is TiltGuessCategory {
  return Object.hasOwn(wordsByCategory, category);
}

export function getLocalTiltGuessWords(category?: TiltGuessCategory): TiltGuessWordApiResponse {
  const categories = category ? [category] : (Object.keys(wordsByCategory) as TiltGuessCategory[]);

  return {
    data: categories.flatMap((key) =>
      wordsByCategory[key].map((content, index) => ({
        id: `zh-${key}-${index + 1}`,
        type: 'tilt_guess',
        content,
        createdAt: '2026-11-09T00:00:00.000Z',
      })),
    ),
  };
}
