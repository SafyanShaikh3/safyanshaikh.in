import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/content.js'

// `*word*` = serif italic, `!word` = accent colour
const TEXT =
  "I'm an MCA student who would *rather* ship a small thing that works than demo a big thing that doesn't. !Android in Kotlin, !stores in PHP and MERN, !models in Python — built end to end, and built to be *used.*"

const words = TEXT.split(' ').map((raw) => {
  const serif = raw.startsWith('*')
  const hot = raw.startsWith('!')
  return { t: raw.replace(/[*!]/g, ''), serif, hot }
})

function Word({ w, i, n, progress }) {
  const start = 0.08 + (i / n) * 0.72
  const opacity = useTransform(progress, [start, start + 0.05], [0.12, 1])
  const y = useTransform(progress, [start, start + 0.05], [14, 0])
  const blur = useTransform(progress, [start, start + 0.05], ['blur(6px)', 'blur(0px)'])
  return (
    <motion.span className={`w ${w.serif ? 's' : ''}`} style={{ opacity, y, filter: blur, color: w.hot ? '#ff5a1f' : undefined }}>
      {w.t}
    </motion.span>
  )
}

const facts = [
  ['02', 'Degrees — BCA done, MCA (AI & ML) in progress'],
  ['A+', 'Internship grade, Izonnet Web Solution, 2025'],
  ['07', 'Projects, from Android to ML'],
]

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="about" ref={ref} className="mani" aria-label="About">
      <div className="mani-stick wrap">
        <div style={{ position: 'absolute', top: 96, left: 'var(--pad)', right: 'var(--pad)', display: 'flex', justifyContent: 'space-between' }}>
          <span className="mono">(01) About</span>
          <span className="mono">{profile.role}</span>
        </div>
        <p className="mani-text">
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} n={words.length} progress={scrollYProgress} />
          ))}
        </p>
        <div className="mani-side">
          {facts.map(([n, t], i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="n">{n}</div>
              <div className="mono" style={{ maxWidth: 220, marginLeft: 'auto' }}>{t}</div>
            </motion.div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 1, width: '100%', background: 'var(--line)' }}>
          <motion.div style={{ height: 1, width: lineW, background: '#ff5a1f' }} />
        </div>
      </div>
    </section>
  )
}
