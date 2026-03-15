'use client'

// 统一音效工具，Web Audio API，无需任何音频文件
function ctx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

// 悬停音：极短高频滴声
export function playHover() {
  try {
    const c = ctx()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(1800, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(2200, c.currentTime + 0.04)
    g.gain.setValueAtTime(0.04, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05)
    o.connect(g); g.connect(c.destination)
    o.start(); o.stop(c.currentTime + 0.05)
  } catch {}
}

// 点击音：赛博"咔"声
export function playClick() {
  try {
    const c = ctx()
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
  } catch {}
}

// 导航音：上扬滑音
export function playNav() {
  try {
    const c = ctx()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(400, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.12)
    g.gain.setValueAtTime(0.1, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15)
    o.connect(g); g.connect(c.destination)
    o.start(); o.stop(c.currentTime + 0.15)
  } catch {}
}

// 卡片悬停音：轻微静电
export function playCardHover() {
  try {
    const c = ctx()
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
  } catch {}
}

// 外链跳转音：下降确认音
export function playLink() {
  try {
    const c = ctx()
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
  } catch {}
}

export function useSounds() {
  return { playHover, playClick, playNav, playCardHover, playLink }
}
