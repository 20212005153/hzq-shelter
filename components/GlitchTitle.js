'use client'
export default function GlitchTitle({ text, className = '' }) {
  return (
    <h1
      className={`glitch glow font-mono font-bold ${className}`}
      data-text={text}
    >
      {text}
    </h1>
  )
}
