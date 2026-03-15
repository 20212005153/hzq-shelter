import GlitchTitle from '@/components/GlitchTitle'
import TerminalTyper from '@/components/TerminalTyper'
import StatCounter from '@/components/StatCounter'
import BottomTerminal from '@/components/BottomTerminal'

const PROJECTS = [
  {
    id: 1,
    name: 'todo-app',
    desc: 'F1主题待办事项。React + Tailwind + dnd-kit拖拽，localStorage持久化。',
    tags: ['React', 'Tailwind', 'dnd-kit'],
    url: 'https://github.com/20212005153/todo-app',
    status: 'DEPLOYED',
  },
  {
    id: 2,
    name: 'hzq-shelter',
    desc: '你现在看到的这个网站。Next.js极客风个人主页，含glitch、扫描线、终端动效。',
    tags: ['Next.js', 'CSS Animation', 'Vercel'],
    url: '#',
    status: 'WIP',
  },
]

const BLOG_POSTS = [
  {
    slug: 'start-vibe-coding',
    title: '如何开始 Vibe Coding',
    date: '2026-03-15',
    summary: '从零开始用AI辅助开发，一天内完成一个完整项目的实战记录。',
  },
  {
    slug: 'dnd-kit-guide',
    title: 'dnd-kit 拖拽排序实战',
    date: '2026-03-15',
    summary: '替换原生HTML5拖拽，用dnd-kit实现支持触摸屏的排序列表。',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen pb-32 font-mono">
      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
        <div className="mb-6 text-[#00cc33]/50 text-sm tracking-widest uppercase">
          [ 系统初始化完毕 ] ██████████ 100%
        </div>

        <GlitchTitle
          text="华子强的避难所"
          className="text-4xl md:text-7xl text-[#00ff41] mb-4 leading-tight"
        />

        <div className="text-[#00cc33]/70 text-lg mb-2">
          <span className="text-[#00ff41]">/</span> 开发者 · 创造者 · 折腾爱好者
        </div>

        <div className="mt-8 border border-[#1a2a1a] bg-[#0d0d0d] p-4 max-w-lg glow-border">
          <div className="text-[#00cc33]/40 text-xs mb-2 tracking-widest">TERMINAL — v1.0.0</div>
          <TerminalTyper />
        </div>

        <div className="mt-10 flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="border border-[#00ff41] text-[#00ff41] px-6 py-2 text-sm hover:bg-[#00ff41]/10 transition-colors tracking-widest uppercase"
            data-hover="true"
          >
            [查看项目]
          </a>
          <a
            href="#blog"
            className="border border-[#00cc33]/40 text-[#00cc33]/60 px-6 py-2 text-sm hover:border-[#00ff41]/60 hover:text-[#00ff41] transition-colors tracking-widest uppercase"
            data-hover="true"
          >
            [读博客]
          </a>
          <a
            href="https://github.com/20212005153"
            target="_blank"
            rel="noreferrer"
            className="border border-[#00cc33]/30 text-[#00cc33]/50 px-6 py-2 text-sm hover:border-[#00ff41]/60 hover:text-[#00ff41] transition-colors tracking-widest uppercase"
            data-hover="true"
          >
            [GitHub]
          </a>
        </div>

        {/* 滚动提示 */}
        <div className="mt-20 text-[#00cc33]/30 text-xs tracking-widest animate-pulse">
          ▼ SCROLL TO EXPLORE ▼
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-6 md:px-16 max-w-5xl mx-auto mb-24">
        <div className="text-[#00cc33]/40 text-xs tracking-widest mb-4 uppercase">
          &gt; cat ./stats.json
        </div>
        <StatCounter />
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="px-6 md:px-16 max-w-5xl mx-auto mb-24">
        <div className="text-[#00cc33]/40 text-xs tracking-widest mb-2 uppercase">
          &gt; ls ./projects/
        </div>
        <h2 className="text-2xl text-[#00ff41] glow mb-8">作品集</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map(p => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="block border border-[#1a2a1a] bg-[#0d0d0d] p-5 glow-border hover:border-[#00ff41]/40 transition-all group"
              data-hover="true"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#00ff41] font-bold group-hover:glow">
                  ./{p.name}
                </span>
                <span className={`text-xs px-2 py-0.5 border ${
                  p.status === 'DEPLOYED'
                    ? 'border-[#00ff41]/40 text-[#00ff41]/70'
                    : 'border-yellow-500/40 text-yellow-500/70'
                }`}>
                  {p.status}
                </span>
              </div>
              <p className="text-[#00cc33]/60 text-sm mb-3 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="text-xs border border-[#1a2a1a] px-2 py-0.5 text-[#00cc33]/50">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="px-6 md:px-16 max-w-5xl mx-auto mb-24">
        <div className="text-[#00cc33]/40 text-xs tracking-widest mb-2 uppercase">
          &gt; ls ./blog/ --sort=date
        </div>
        <h2 className="text-2xl text-[#00ff41] glow mb-8">博客</h2>
        <div className="space-y-3">
          {BLOG_POSTS.map(post => (
            <div
              key={post.slug}
              className="border border-[#1a2a1a] bg-[#0d0d0d] p-4 glow-border hover:border-[#00ff41]/30 transition-all flex items-start gap-4 cursor-default"
            >
              <span className="text-[#00cc33]/30 text-xs shrink-0 mt-0.5">{post.date}</span>
              <div>
                <div className="text-[#00ff41] font-semibold mb-1">{post.title}</div>
                <div className="text-[#00cc33]/50 text-sm">{post.summary}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-[#00cc33]/30 text-xs">// 更多文章即将上线...</div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 md:px-16 max-w-5xl mx-auto mb-24">
        <div className="text-[#00cc33]/40 text-xs tracking-widest mb-2 uppercase">
          &gt; cat ./about.md
        </div>
        <h2 className="text-2xl text-[#00ff41] glow mb-6">关于</h2>
        <div className="border border-[#1a2a1a] bg-[#0d0d0d] p-6 glow-border max-w-2xl">
          <p className="text-[#00cc33]/70 leading-8 text-sm">
            你好，我是<span className="text-[#00ff41]">华子强</span>。<br />
            这里是我的数字避难所，一个记录代码、想法和折腾过程的地方。<br /><br />
            喜欢把想法变成能跑的东西，相信<span className="text-[#00ff41]">「完成比完美更重要」</span>。<br />
            正在探索 AI + 全栈开发的各种可能性。
          </p>
        </div>
      </section>

      {/* ── BOTTOM TERMINAL ── */}
      <BottomTerminal />
    </div>
  )
}
