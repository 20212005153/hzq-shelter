import GlitchTitle from '@/components/GlitchTitle'
import TerminalTyper from '@/components/TerminalTyper'
import StatCounter from '@/components/StatCounter'
import BottomTerminal from '@/components/BottomTerminal'
import NavButtons from '@/components/NavButtons'
import ProjectCard from '@/components/ProjectCard'
import ChangelogSection from '@/components/ChangelogSection'

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
    desc: '你现在看到的这个网站。Next.js极客风个人主页，含glitch、扫描线、终端动效、交互音效。',
    tags: ['Next.js', 'Web Audio', 'Vercel'],
    url: 'https://github.com/20212005153/hzq-shelter',
    status: 'DEPLOYED',
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
    <main className="min-h-screen pb-32 font-mono">
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
          <div className="text-[#00cc33]/40 text-xs mb-2 tracking-widest">TERMINAL — v1.2.0</div>
          <TerminalTyper />
        </div>

        <NavButtons />

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
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
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
            <article
              key={post.slug}
              className="border border-[#1a2a1a] bg-[#0d0d0d] p-4 glow-border flex items-start gap-4"
            >
              <span className="text-[#00cc33]/30 text-xs shrink-0 mt-0.5">{post.date}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#00ff41] font-semibold">{post.title}</h3>
                  <span className="text-[10px] border border-[#1a2a1a] px-2 py-0.5 text-[#00cc33]/45 tracking-widest uppercase">
                    Draft
                  </span>
                </div>
                <div className="text-[#00cc33]/50 text-sm">{post.summary}</div>
                <div className="mt-2 text-[#00cc33]/35 text-xs">
                  文章页尚未发布，当前仅展示选题与摘要。
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 text-[#00cc33]/30 text-xs">更多文章即将上线...</div>
      </section>

      {/* ── CHANGELOG ── */}
      <ChangelogSection />

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
    </main>
  )
}
