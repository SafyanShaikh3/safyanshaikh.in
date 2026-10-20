import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '../lib/hooks.js'

const LINES = [
  ['boot', 'safyan.os v3.0 — kernel ok'],
  ['mount', '/projects  ·  7 found'],
  ['link', 'cardsense.apk  ·  shofiy.store'],
  ['locate', '19.03°N 73.03°E  ·  navi mumbai'],
  ['status', 'open to internships'],
]

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [lines, setLines] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return
    }
    const total = 2100
    const t0 = performance.now()
    let id
    const step = (t) => {
      const p = Math.min(1, (t - t0) / total)
      // ease-in-out with a little hesitation at ~70%, like real loading
      const e = p < 0.7 ? 0.82 * Math.pow(p / 0.7, 1.4) : 0.82 + 0.18 * ((p - 0.7) / 0.3)
      setN(Math.round(e * 100))
      setLines(Math.min(LINES.length, Math.floor(p * (LINES.length + 0.6))))
      if (p < 1) id = requestAnimationFrame(step)
      else setTimeout(onDone, 260)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [onDone])

  return (
    <motion.div
      className="pre"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="pre-log">
        {LINES.slice(0, lines).map(([k, v]) => (
          <div key={k}>
            <span className="ok">[ok]</span> <b>{k.padEnd(7, ' ')}</b> {v}
          </div>
        ))}
        {lines < LINES.length && <span className="caret" />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span className="mono">safyanshaikh.in — Portfolio ’26</span>
        <div className="pre-count">{String(n).padStart(3, '0')}</div>
      </div>
      <div className="pre-bar" style={{ width: `${n}%` }} />
    </motion.div>
  )
}
