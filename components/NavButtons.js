'use client'
import { playNav, playLink } from '@/hooks/useSounds'

export default function NavButtons() {
  return (
    <div className="mt-10 flex gap-4 flex-wrap">
      <a
        href="#projects"
        onClick={playNav}
        onMouseEnter={playNav}
        className="border border-[#00ff41] text-[#00ff41] px-6 py-2 text-sm hover:bg-[#00ff41]/10 transition-colors tracking-widest uppercase"
        data-hover="true"
      >
        [查看项目]
      </a>
      <a
        href="#blog"
        onClick={playNav}
        onMouseEnter={playNav}
        className="border border-[#00cc33]/40 text-[#00cc33]/60 px-6 py-2 text-sm hover:border-[#00ff41]/60 hover:text-[#00ff41] transition-colors tracking-widest uppercase"
        data-hover="true"
      >
        [读博客]
      </a>
      <a
        href="https://github.com/20212005153"
        target="_blank"
        rel="noreferrer"
        onClick={playLink}
        onMouseEnter={playNav}
        className="border border-[#00cc33]/30 text-[#00cc33]/50 px-6 py-2 text-sm hover:border-[#00ff41]/60 hover:text-[#00ff41] transition-colors tracking-widest uppercase"
        data-hover="true"
      >
        [GitHub]
      </a>
    </div>
  )
}
