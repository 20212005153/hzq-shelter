'use client'
import { playCardHover, playLink } from '@/hooks/useSounds'

export default function ProjectCard({ project: p }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      onClick={playLink}
      onMouseEnter={playCardHover}
      className="block border border-[#1a2a1a] bg-[#0d0d0d] p-5 glow-border hover:border-[#00ff41]/40 transition-all group"
      data-hover="true"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[#00ff41] font-bold group-hover:glow">./{p.name}</span>
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
  )
}
