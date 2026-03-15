'use client'

// Claude: hover 节流 — 防止快速划过时音效堆叠
let lastHoverTime = 0
const HOVER_THROTTLE_MS = 80

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function withAudio(run) {
  try {
    const c = getAudioContext()
    if (!c) return
    if (c.state === 'suspended') {
      c.resume().catch(() => {})
    }
    run(c)
  } catch {}
}

// 悬停音：极短高频滴声（Claude: 节流 80ms，防止快速划过音效爆炸）
export function playHover() {
  const now = Date.now()
  if (now - lastHoverTime < HOVER_THROTTLE_MS) return
  lastHoverTime = now
  withAudio((c) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(1800, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(2200, c.currentTime + 0.04)
    g.gain.setValueAtTime(0.04, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05)
    o.connect(g); g.connect(c.destination)
    o.start(); o.stop(c.currentTime + 0.05)
  })
}

// 点击音：赛博"咔"声
export function playClick() {
  withAudio((c) => {
    // 低频冲击
    const o1 = c.createOscillator()
    const g1 = c.createGain()
    o1.type = 'square'
    o1.frequency.setValueAtTime(180, c.currentTime)
    o1.frequency.exponentialRampToValueAtTime(60, c.currentTime + 0.06)
    g1.gain.setValueAtTime(0.18, c.currentTime)
    g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08)
    o1.connect(g1); g1.connect(c.destination)
    o1.start(); o1.stop(c.currentTime + 0.08)
    // 高频点缀
    const o2 = c.createOscillator()
    const g2 = c.createGain()
    o2.type = 'sine'
    o2.frequency.value = 1200
    g2.gain.setValueAtTime(0.07, c.currentTime)
    g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04)
    o2.connect(g2); g2.connect(c.destination)
    o2.start(); o2.stop(c.currentTime + 0.04)
  })
}

// 导航音：上扬滑音
export function playNav() {
  withAudio((c) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(400, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.12)
    g.gain.setValueAtTime(0.1, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15)
    o.connect(g); g.connect(c.destination)
    o.start(); o.stop(c.currentTime + 0.15)
  })
}

// 卡片悬停音：轻微静电
export function playCardHover() {
  withAudio((c) => {
    const bufSize = Math.floor(c.sampleRate * 0.03)
    const buf = c.createBuffer(1, bufSize, c.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1)
    const src = c.createBufferSource()
    src.buffer = buf
    const f = c.createBiquadFilter()
    f.type = 'highpass'; f.frequency.value = 3000
    const g = c.createGain()
    g.gain.setValueAtTime(0.06, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.03)
    src.connect(f); f.connect(g); g.connect(c.destination)
    src.start()
  })
}

// 外链跳转音：下降确认音
export function playLink() {
  withAudio((c) => {
    const notes = [880, 660]
    notes.forEach((freq, i) => {
      const o = c.createOscillator()
      const g = c.createGain()
      o.type = 'sine'
      const t = c.currentTime + i * 0.08
      o.frequency.setValueAtTime(freq, t)
      g.gain.setValueAtTime(0.08, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
      o.connect(g); g.connect(c.destination)
      o.start(t); o.stop(t + 0.1)
    })
  })
}

export function useSounds() {
  return { playHover, playClick, playNav, playCardHover, playLink }
}
