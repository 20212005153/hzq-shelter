'use client'
import { useEffect, useState } from 'react'

const LINES = [
  '> whoami',
  '华子强 | 开发者 & 创造者',
  '> ls ./skills',
  'React  Next.js  Node.js  Python  UI/UX',
  '> cat ./status',
  '正在构建酷炫的东西...',
  '> git log --oneline -1',
  'feat: 把想法变成现实',
  '> _',
]

export default function TerminalTyper() {
  const [displayed, setDisplayed] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => {
        const nextLine = (lineIdx + 1) % LINES.length
        setLineIdx(nextLine)
        setCharIdx(0)
        setDisplayed('')
        setPause(false)
      }, lineIdx % 2 === 0 ? 400 : 1200)
      return () => clearTimeout(t)
    }

    const line = LINES[lineIdx]
    if (charIdx < line.length) {
      const delay = line[charIdx] === ' ' ? 60 : Math.random() * 60 + 30
      const t = setTimeout(() => {
        setDisplayed(line.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, delay)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setPause(true), 0)
    return () => clearTimeout(t)
  }, [charIdx, lineIdx, pause])

  const isCommand = LINES[lineIdx]?.startsWith('>')

  return (
    <div className="font-mono text-sm leading-relaxed">
      <span className={isCommand ? 'text-[#00ff41]' : 'text-[#00cc33]/80'}>
        {displayed}
      </span>
      <span className="blink text-[#00ff41]">█</span>
    </div>
  )
}
