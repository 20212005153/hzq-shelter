'use client'
import { useEffect, useState } from 'react'

const COMMANDS = [
  { cmd: 'npm run dev', out: 'ready - started server on http://localhost:3000' },
  { cmd: 'git push origin main', out: 'Branch main set up to track remote branch main.' },
  { cmd: 'docker build -t shelter .', out: 'Successfully built 3f2a1b9c' },
  { cmd: 'python train.py --epochs 100', out: 'Epoch 100/100 - loss: 0.0042 - acc: 0.9987' },
  { cmd: 'curl -X GET /api/projects', out: '[{"id":1,"name":"todo-app"},{"id":2,"name":"shelter"}]' },
  { cmd: 'ls -la ./ideas/', out: 'total 42  drwxr-xr-x  8 hzq  ...  未来的项目们' },
]

export default function BottomTerminal() {
  const [lines, setLines] = useState([])
  const [cmdText, setCmdText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | output | pause
  const [cmdIdx, setCmdIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const cur = COMMANDS[cmdIdx]

    if (phase === 'typing') {
      if (charIdx < cur.cmd.length) {
        const t = setTimeout(() => {
          setCmdText(cur.cmd.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, Math.random() * 80 + 30)
        return () => clearTimeout(t)
      }

      const t = setTimeout(() => setPhase('output'), 0)
      return () => clearTimeout(t)
    }

    if (phase === 'output') {
      const t = setTimeout(() => {
        setLines(prev => [
          ...prev.slice(-6),
          { cmd: cur.cmd, out: cur.out },
        ])
        setCmdText('')
        setPhase('pause')
      }, 300)
      return () => clearTimeout(t)
    }

    if (phase === 'pause') {
      const t = setTimeout(() => {
        setCmdIdx(i => (i + 1) % COMMANDS.length)
        setCharIdx(0)
        setPhase('typing')
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [phase, charIdx, cmdIdx])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1a2a1a] bg-[#050505]/95 backdrop-blur px-4 py-3 font-mono text-xs">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1 text-[#00cc33]/40 text-[10px] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#00ff41] inline-block" style={{ boxShadow: '0 0 6px #00ff41' }} />
          terminal — hzq@shelter
        </div>
        {/* Claude: 用 cmd 内容作 key，避免 key={i} 反模式 */}
        {lines.slice(-2).map((l) => (
          <div key={l.cmd} className="text-[#00cc33]/50 leading-5">
            <span className="text-[#00ff41]/70">$ </span>{l.cmd}
            <br />
            <span className="pl-2">{l.out}</span>
          </div>
        ))}
        <div className="text-[#00ff41] leading-5">
          <span className="text-[#00ff41]/70">$ </span>
          {cmdText}
          <span className="blink">▌</span>
        </div>
      </div>
    </div>
  )
}
