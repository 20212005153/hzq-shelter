'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let x = 0, y = 0
    let rx = 0, ry = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) {
        dot.current.style.left = x + 'px'
        dot.current.style.top  = y + 'px'
      }
    }

    const onEnter = () => ring.current?.classList.add('scale-[2.5]', 'opacity-60')
    const onLeave = () => ring.current?.classList.remove('scale-[2.5]', 'opacity-60')

    // 环形缓动跟随
    let raf
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

    const targets = 'a, button, input, select, [data-hover]'
    document.addEventListener('mousemove', onMove)
    document.querySelectorAll(targets).forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // MutationObserver 给动态新增元素也加监听
    const obs = new MutationObserver(() => {
      document.querySelectorAll(targets).forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      {/* 绿色实心光点 */}
      <div
        ref={dot}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00ff41]"
        style={{ boxShadow: '0 0 6px #00ff41, 0 0 12px #00ff41' }}
      />
      {/* 缓动跟随环 */}
      <div
        ref={ring}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#00ff41] opacity-40 transition-all duration-200"
        style={{ boxShadow: '0 0 8px rgba(0,255,65,0.3)' }}
      />
    </>
  )
}
