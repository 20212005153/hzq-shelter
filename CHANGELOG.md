# CHANGELOG — 华子强的避难所

所有版本更新记录，最新版在最上方。

---

## [v1.3.0] — 2026-03-15（Claude review）

### Claude 修复
- **CustomCursor 加载闪烁**：光标元素初始 `opacity:0`，首次 `pointermove` 后才显示，修复加载时停在 (0,0) 闪烁的问题
- **playHover 音效堆叠**：加 80ms 节流（`lastHoverTime`），快速划过多个元素时不再爆炸式触发
- **AmbientSound 竞态**：新增 `stoppedRef` 守卫，`stop()` 后仍在飞行的 `setTimeout` 回调会提前退出，不再 push 节点到已清空的 `nodesRef`
- **BottomTerminal `key={i}`**：改用 `l.cmd` 作稳定 key，消除 index 作 key 反模式
- **ChangelogSection `key={i}`**：改用 `item` 内容作 key；归属标注：`[Claude]` 绿色 / `[Codex]` 蓝色，视觉区分贡献方

---

## [v1.2.0] — 2026-03-15

### Codex修改的
- 修复 `npm run lint` 失败：移除 JSX 注释文本误用，重构 `TerminalTyper` 与 `BottomTerminal` 的 effect 状态推进方式。
- 修复离线构建失败：移除 `next/font/google` 对 Google Fonts 的构建期依赖，改为本地等宽字体栈。
- 优化交互稳定性：`hooks/useSounds.js` 改为复用单例 `AudioContext`，避免 hover/click 不断创建音频上下文。
- 优化可访问性：自定义光标仅在精细指针设备启用，新增 `prefers-reduced-motion` 降级与按钮 ARIA 状态。
- 优化资源清理：`StatCounter` 在卸载时清理 interval，`CustomCursor` 改为事件委托，避免反复扫描和重复绑定。
- 优化内容表达：博客卡片明确标记为 `Draft`，减少“看起来能点但实际没有文章页”的误导。

### 新增
- 全局交互音效系统（`hooks/useSounds.js`）
  - `playHover()` — 悬停：极短高频滴声
  - `playClick()` — 点击：赛博"咔"声（低频冲击 + 高频点缀）
  - `playNav()` — 导航：上扬滑音
  - `playCardHover()` — 卡片悬停：轻微静电
  - `playLink()` — 外链跳转：下降确认双音
- 版本更新日志（本文件 + 网站内可折叠展示区块）

### 优化
- `NavButtons` 拆分为独立客户端组件，绑定导航音效
- `ProjectCard` 拆分为独立客户端组件，绑定卡片悬停 + 跳转音效
- `ChangelogSection` 可折叠交互，点击时触发 click 音效
- hzq-shelter 状态从 WIP 更新为 DEPLOYED

---

## [v1.1.0] — 2026-03-15

### 新增
- 赛博氛围背景音效（`components/AmbientSound.js`）
  - 低频嗡鸣：55Hz 锯齿波 + LFO 调幅，制造"机器呼吸感"
  - 白噪静电：随机 1.5~5 秒爆发，带通滤波模拟信号干扰
  - 数字哔声：随机 3~10 秒触发，方波短音模拟终端信号
- 右上角 SFX ON/OFF 切换按钮（亮绿呼吸灯状态指示）

---

## [v1.0.0] — 2026-03-15

### 初始版本，部署至 Vercel

- 自定义绿色光标（实心点 + 缓动跟随环，悬停交互元素时放大）
- Glitch 故障字标题（CSS 双色错位动画，每 4 秒触发）
- 终端打字机（循环展示命令与输出，模拟真实打字节奏）
- 全局扫描线 + 像素网格氛围遮罩（CSS `::before / ::after`）
- 底部实时终端（模拟命令输入 + 输出，随机切换命令集）
- 数字计数动画（IntersectionObserver 滚入触发，Projects / Commits / Coffee / Bugs）
- 页面结构：Hero / 统计 / 作品集 / 博客 / 关于
