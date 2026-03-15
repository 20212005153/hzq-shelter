'use client'
import { useEffect, useRef, useState } from 'react'

export default function AmbientSound() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  const nodesRef = useRef([])

  const stop = () => {
    nodesRef.current.forEach(n => { try { n.stop?.(); n.disconnect?.() } catch {} })
    nodesRef.current = []
    ctxRef.current?.close()
    ctxRef.current = null
  }

  const start = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ctxRef.current = ctx
    const master = ctx.createGain()
    master.gain.value = 0.18
    master.connect(ctx.destination)

    // ── 1. 低频嗡鸣（赛博底噪）──
    const drone = ctx.createOscillator()
    const droneGain = ctx.createGain()
    const droneFilter = ctx.createBiquadFilter()
    drone.type = 'sawtooth'
    drone.frequency.value = 55
    droneFilter.type = 'lowpass'
    droneFilter.frequency.value = 200
    droneGain.gain.value = 0.4
    // 缓慢调幅，制造呼吸感
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.15
    lfoGain.gain.value = 0.15
    lfo.connect(lfoGain)
    lfoGain.connect(droneGain.gain)
    lfo.start()
    drone.connect(droneFilter)
    droneFilter.connect(droneGain)
    droneGain.connect(master)
    drone.start()

    // ── 2. 白噪声静电（随机爆发）──
    const startNoiseBurst = () => {
      const bufSize = ctx.sampleRate * 0.08
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1)
      const src = ctx.createBufferSource()
      src.buffer = buf
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'bandpass'
      noiseFilter.frequency.value = 1200 + Math.random() * 2000
      noiseFilter.Q.value = 0.5
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0, ctx.currentTime)
      noiseGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      src.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(master)
      src.start()
      nodesRef.current.push(src)
      // 随机下次触发：1.5~5秒
      const delay = 1500 + Math.random() * 3500
      const t = setTimeout(startNoiseBurst, delay)
      nodesRef.current.push({ stop: () => clearTimeout(t) })
    }
    startNoiseBurst()

    // ── 3. 高频数字哔声（间歇性）──
    const startBeep = () => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = [880, 1320, 1760, 2200][Math.floor(Math.random() * 4)]
      g.gain.setValueAtTime(0, ctx.currentTime)
      g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.005)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.connect(g)
      g.connect(master)
      osc.start()
      osc.stop(ctx.currentTime + 0.08)
      nodesRef.current.push(osc)
      const delay = 3000 + Math.random() * 7000
      const t = setTimeout(startBeep, delay)
      nodesRef.current.push({ stop: () => clearTimeout(t) })
    }
    startBeep()

    nodesRef.current.push(drone, lfo)
  }

  const toggle = () => {
    if (on) { stop(); setOn(false) }
    else     { start(); setOn(true) }
  }

  useEffect(() => () => stop(), [])

  return (
    <button
      onClick={toggle}
      data-hover="true"
      title={on ? '关闭环境音效' : '开启环境音效'}
      className={`fixed top-4 right-4 z-[9990] flex items-center gap-2 border px-3 py-1.5 text-xs tracking-widest uppercase transition-all font-mono ${
        on
          ? 'border-[#00ff41]/60 text-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_12px_rgba(0,255,65,0.2)]'
          : 'border-[#1a2a1a] text-[#00cc33]/40 hover:border-[#00ff41]/30 hover:text-[#00cc33]/70'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-[#00ff41] animate-pulse' : 'bg-[#00cc33]/30'}`} />
      {on ? 'SFX ON' : 'SFX OFF'}
    </button>
  )
}
