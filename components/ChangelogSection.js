'use client'
import { playClick } from '@/hooks/useSounds'
import { useState } from 'react'

const CHANGELOG = [
  {
    version: 'v1.3.0',
    date: '2026-03-15',
    tag: 'LATEST',
    // Claude: 本版本为 Claude review Codex 工作后的修复版
    items: [
      '[Claude] 修复：CustomCursor 加载时停在 (0,0) 闪烁 — 初始 opacity:0，首次 pointermove 后才显示',
      '[Claude] 修复：playHover 快速划过时音效堆叠 — 加 80ms 节流，防止音效爆炸',
      '[Claude] 修复：AmbientSound stop() 竞态 — stoppedRef 守卫，防止已停止后 setTimeout 仍 push 节点',
      '[Claude] 修复：BottomTerminal key={i} 反模式 — 改用 l.cmd 作稳定 key',
      '[Claude] 更新：ChangelogSection 补全 Codex v1.2.0 修复记录，归属清晰',
    ],
  },
  {
    version: 'v1.2.0',
    date: '2026-03-15',
    tag: 'REVIEW',
    items: [
      '[Claude] 新增：全局交互音效系统（悬停/点击/导航/卡片/外链各有专属音）',
      '[Claude] 新增：版本更新日志（CHANGELOG.md + 网站内展示）',
      '[Claude] 优化：NavButtons / ProjectCard 拆分为独立客户端组件',
      '[Codex] 修复：lint 失败 — 移除 JSX 注释误用，重构 effect 状态推进',
      '[Codex] 修复：离线构建失败 — 移除 Google Fonts 依赖，改本地字体栈',
      '[Codex] 优化：AudioContext 改为单例复用，避免重复创建',
      '[Codex] 优化：CustomCursor 改事件委托，移除 MutationObserver',
      '[Codex] 优化：StatCounter interval 卸载时正确清理',
      '[Codex] 优化：prefers-reduced-motion 降级 + ARIA 属性补全',
      '[Codex] 优化：博客卡片标注 Draft，避免用户误认为可点击',
    ],
  },
  {
    version: 'v1.1.0',
    date: '2026-03-15',
    tag: 'SOUND',
    items: [
      '新增：赛博氛围背景音效（低频嗡鸣 + 静电爆发 + 数字哔声）',
      '新增：右上角 SFX ON/OFF 切换按钮',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-03-15',
    tag: 'INIT',
    items: [
      '初始版本上线，部署至 Vercel',
      '自定义绿色光标（实心点 + 缓动环，悬停放大）',
      'Glitch 故障字标题效果（双色错位动画）',
      '终端打字机循环展示命令',
      '全局扫描线 + 像素网格氛围遮罩',
      '底部实时终端模拟输入',
      '数字计数动画（滚入触发）',
      '作品集 / 博客 / 关于页面',
    ],
  },
]

const TAG_STYLE = {
  LATEST: 'border-[#00ff41]/50 text-[#00ff41]',
  REVIEW: 'border-blue-400/40 text-blue-300',
  SOUND:  'border-yellow-500/40 text-yellow-400',
  INIT:   'border-[#00cc33]/30 text-[#00cc33]/60',
}

export default function ChangelogSection() {
  const [open, setOpen] = useState(null)

  return (
    <section id="changelog" className="px-6 md:px-16 max-w-5xl mx-auto mb-24">
      <div className="text-[#00cc33]/40 text-xs tracking-widest mb-2 uppercase">
        &gt; git log --pretty=oneline
      </div>
      <h2 className="text-2xl text-[#00ff41] glow mb-6">更新日志</h2>
      <div className="space-y-2">
        {CHANGELOG.map((entry) => (
          <div key={entry.version} className="border border-[#1a2a1a] bg-[#0d0d0d] glow-border overflow-hidden">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
              onClick={() => { playClick(); setOpen(open === entry.version ? null : entry.version) }}
              aria-expanded={open === entry.version}
              aria-controls={`changelog-${entry.version}`}
              data-hover="true"
            >
              <span className={`text-xs border px-2 py-0.5 font-mono shrink-0 ${TAG_STYLE[entry.tag]}`}>
                {entry.tag}
              </span>
              <span className="text-[#00ff41] font-bold font-mono">{entry.version}</span>
              <span className="text-[#00cc33]/40 text-xs ml-auto">{entry.date}</span>
              <span className="text-[#00cc33]/40 text-xs ml-2">{open === entry.version ? '▲' : '▼'}</span>
            </button>
            {open === entry.version && (
              <ul id={`changelog-${entry.version}`} className="px-4 pb-4 space-y-1 border-t border-[#1a2a1a]">
                {/* Claude: 用 item 内容作 key，避免 key={i} 反模式 */}
                {entry.items.map((item) => (
                  <li key={item} className="text-[#00cc33]/60 text-sm pt-2 flex gap-2">
                    <span className={`shrink-0 ${item.startsWith('[Claude]') ? 'text-[#00ff41]/70' : item.startsWith('[Codex]') ? 'text-blue-400/60' : 'text-[#00ff41]/50'}`}>+</span>
                    <span className={item.startsWith('[Claude]') ? 'text-[#00cc33]/80' : item.startsWith('[Codex]') ? 'text-blue-300/60' : ''}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
