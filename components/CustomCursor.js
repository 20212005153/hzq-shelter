'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) {
      document.body.classList.remove('custom-cursor-enabled')
      return
    }

    document.body.classList.add('custom-cursor-enabled')

    let x = 0, y = 0
    let rx = 0, ry = 0
    // Claude: 首次移动前隐藏光标，避免加载时停在 (0,0) 闪烁
    let visible = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        visible = true
        if (dot.current)  dot.current.style.opacity  = '1'
        if (ring.current) ring.current.style.opacity = '0.4'
      }
      if (dot.current) {
        dot.current.style.left = x + 'px'
        dot.current.style.top  = y + 'px'
      }
    }

    const onEnter = () => ring.current?.classList.add('scale-[2.5]', 'opacity-60')
    const onLeave = () => ring.current?.classList.remove('scale-[2.5]', 'opacity-60')

    // 环形缓动跟随
    let raf = 0
    const loop = () => {
      rx += (x - rx) * 0.12
      ry += (y - ry) * 0.12
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top  = ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    const targets = 'a, button, input, select, textarea, [data-hover]'
    const onPointerOver = (e) => {
      if (e.target instanceof Element && e.target.closest(targets)) onEnter()
    }
    const onPointerOut = (e) => {
      if (e.target instanceof Element && e.target.closest(targets)) onLeave()
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-enabled')
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
    }
  }, [])

  return (
    <>
      {/* 绿色实心光点 — Claude: 初始 opacity:0，首次 pointermove 后显示 */}
      <div
        ref={dot}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00ff41]"
        style={{ opacity: 0, boxShadow: '0 0 6px #00ff41, 0 0 12px #00ff41' }}
      />
      {/* 缓动跟随环 — Claude: 初始 opacity:0，首次 pointermove 后显示 */}
      <div
        ref={ring}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#00ff41] transition-all duration-200"
        style={{ opacity: 0, boxShadow: '0 0 8px rgba(0,255,65,0.3)' }}
      />
    </>
  )
}
