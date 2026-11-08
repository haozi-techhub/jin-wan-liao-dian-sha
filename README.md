# 今晚聊点啥

朋友聚会用的网页小游戏合集，基于 Tareq Alhammoodi 的 [Games Khane](https://github.com/tareqalhammoodi/games-khane-app) 改编。

## 本地启动

需要 Node.js 20.9 或更新版本。首次启动前安装依赖。

```bash
npm ci
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

| 玩法 | 怎么玩 |
| --- | --- |
| 八种题卡 | 真心话大冒险、谁最有可能、二选一、随机挑战、聊天话题、今晚玩什么、趣味谜语和表情猜谜。部分题卡可开加料模式，猜谜类可以翻看答案。 |
| 幸运转盘 | 每行输入一个名字或选项，由转盘随机选出结果。 |
| 摇头猜词 | 选分类，把手机横过来贴在额头。猜对向下倾，跳过向上倾。手机浏览器可能要求通过 HTTPS 打开页面，并允许访问动作感应。 |
| 联机房间 | 房主创建房间并分享房间码。支持联机答题、匿名焦点和回忆猜猜看，需要另接兼容的 Socket.IO 服务。 |

默认内置 188 条简体中文题卡和 125 个猜词词条。题卡在当前题池抽完前会跳过本轮已经出现的题。

## 可选配置

如需连接外部服务，将所需配置填入项目根目录的 `.env.local`，并重启开发服务。

| 环境变量 | 用途 |
| --- | --- |
| `GAME_API_BASE_URL` | 服务端题库接口地址。配置后，题卡和猜词的本地路由转发到该地址。 |
| `NEXT_PUBLIC_GAME_API_BASE_URL` | 兼容原版的公开 API 地址。服务端未设置 `GAME_API_BASE_URL` 时，也会用它作为题库接口地址。 |
| `NEXT_PUBLIC_LIVE_SOCKET_URL` | 兼容原版房间协议的 Socket.IO 服务地址。仓库提供联机前端，建房和房间同步由此服务处理。未设置时，联机客户端沿用原版规则，尝试使用 `NEXT_PUBLIC_GAME_API_BASE_URL`。 |
| `NEXT_PUBLIC_LIVE_SOCKET_PATH` | Socket.IO 路径，默认是 `/live/socket.io`。 |

只配置联机服务时，联机答题默认发送 8 道内置中文题，匿名焦点提供 12 条中文提问模板。配置 `NEXT_PUBLIC_GAME_API_BASE_URL` 后，这两项内容沿用外部服务。外部题库内容和服务端消息按原文展示。和朋友用手机联机时，请通过手机也能访问的地址打开网站。

## 项目结构

项目使用 Next.js App Router、React、TypeScript 和全局 CSS，联机客户端使用 Socket.IO。

| 目录 | 内容 |
| --- | --- |
| `app/` | 首页、玩法页面、API 路由和全局样式 |
| `features/games/` | 玩法入口、玩法说明、题卡交互及请求逻辑 |
| `features/tilt-guess/`、`features/wheel/` | 摇头猜词和幸运转盘 |
| `features/live/` | 联机房间、答题、匿名焦点和回忆猜猜看 |
| `components/`、`hooks/`、`lib/` | 通用组件、交互逻辑和题库代理 |

运行 `npm run typecheck` 检查类型，运行 `npm run build` 验证生产构建。
