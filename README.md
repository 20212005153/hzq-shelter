# hzq-shelter

极客风个人主页，基于 Next.js App Router，包含 glitch 标题、终端打字动画、项目卡片、更新日志和可切换环境音效。

## Development

```bash
npm install
npm run dev
```

默认地址是 `http://localhost:3000`。

## Scripts

- `npm run dev`: 启动开发服务器
- `npm run lint`: 运行 ESLint
- `npm run build`: 产出生产构建

## Notes

- 交互音效通过 Web Audio API 生成，不依赖音频文件。
- 自定义光标只在支持精细指针的设备启用，触屏与减少动画偏好场景会自动降级。
- 当前博客区块仍是占位内容，真实文章路由尚未接入。

## Codex修改的

- 移除了对 Google Fonts 的构建期依赖，避免受网络环境影响导致 `next build` 失败。
- 修复了当前仓库的 ESLint 阻塞问题。
- 重构了部分动画/计时逻辑，减少 effect 内同步 `setState`。
- 优化了音效、光标和动效的可访问性降级。

## Structure

- `app/`: 页面与全局样式
- `components/`: 站点 UI 组件
- `hooks/useSounds.js`: 音效生成逻辑
- `CHANGELOG.md`: 版本记录与本次修改记录

## Deployment

```bash
npm run build
npm run start
```
