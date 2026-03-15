'use client'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const steps = 40
        const step = target / steps
        let cur = 0
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target)
          setVal(Math.round(cur))
          if (cur >= target) clearInterval(iv)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {val}{suffix}
    </span>
  )
}

const STATS = [
  { label: 'Projects', value: 12, suffix: '+' },
  { label: 'Commits',  value: 342, suffix: '' },
  { label: 'Coffee',   value: 99,  suffix: '∞' },
  { label: 'Bugs Fixed', value: 256, suffix: '' },
]

export default function StatCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS.map(s => (
        <div
          key={s.label}
          className="border border-[#1a2a1a] bg-[#0d0d0d] p-4 text-center glow-border"
          data-hover="true"
        >
          <div className="text-3xl font-bold text-[#00ff41] glow">
            <Counter target={s.value} suffix={s.suffix} />
          </div>
          <div className="text-xs text-[#00cc33]/60 mt-1 uppercase tracking-widest">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
