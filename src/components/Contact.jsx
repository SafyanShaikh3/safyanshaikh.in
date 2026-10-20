import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/content.js'
import { prefersReducedMotion, scrollToHash } from '../lib/hooks.js'

const script = [
  ['p', '~ $ ', 'whoami'],
  ['o', '', 'safyan shaikh — android · full-stack · ai/ml'],
  ['p', '~ $ ', 'status --now'],
  ['o', '', 'open to internships & opportunities'],
  ['p', '~ $ ', 'contact --best'],
  ['o', '', 'email · or call +91 70695 00011'],
  ['p', '~ $ ', 'say hello ↓'],
]

function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [chars, setChars] = useState(0)
  const total = script.reduce((a, [, , t]) => a + t.length, 0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) return setChars(total)
    let c = 0
    const id = setInterval(() => {
      c += 1
      setChars(c)
      if (c >= total) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [inView, total])

  let left = chars
  return (
    <div className="term glass" ref={ref}>
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span className="mono">safyan@safyanshaikh.in — zsh</span>
      </div>
      <div className="term-body" aria-label="Status: open to internships and opportunities.">
        {script.map(([k, pre, text], i) => {
          if (left <= 0) return null
          const shown = text.slice(0, left)
          left -= text.length
          const done = left >= 0
          return (
            <div key={i}>
              {pre && <span className="p">{pre}</span>}
              <span className={k === 'o' ? 'o' : ''}>{shown}</span>
              {!done && <span className="caret" />}
            </div>
          )
        })}
        {chars >= total && <span className="caret" />}
      </div>
    </div>
  )
}

const WORD = "LET'S BUILD"

export default function Contact() {
  const giantRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll({ target: giantRef, offset: ['start end', 'end end'] })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  }

  const socials = [
    ['GitHub', profile.github],
    ['LinkedIn', profile.linkedin],
    ['Instagram', profile.instagram],
  ].filter(([, v]) => v)

  return (
    <section id="contact" className="contact" aria-label="Contact">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            Get in <span className="serif">touch</span>
          </h2>
          <div className="sec-idx">
            <div className="mono">(05) Contact</div>
            <div className="mono">{profile.location}</div>
          </div>
        </div>

        <Terminal />

        <a className="mail" href={`mailto:${profile.email}`} data-cursor="WRITE">
          {profile.email}
        </a>
        <div className="contact-row">
          <button className="btn btn-solid" onClick={copy} data-cursor="COPY">
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
          <a className="btn btn-ghost" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
            {profile.phone}
          </a>
          {socials.map(([k, v]) => (
            <a key={k} className="btn btn-ghost" href={v} target="_blank" rel="noreferrer" data-cursor="VISIT">
              {k} ↗
            </a>
          ))}
        </div>
      </div>

      <div ref={giantRef} className="giant" aria-hidden="true">
        {WORD.split('').map((c, i) => (
          <GiantChar key={i} c={c} i={i} n={WORD.length} p={scrollYProgress} />
        ))}
      </div>

      <footer className="foot">
        <span className="mono">© 2026 safyanshaikh.in</span>
        <span className="mono">Designed & built by hand — React, Framer Motion, Canvas</span>
        <a href="#home" className="mono" onClick={(e) => (e.preventDefault(), scrollToHash('#home'))} data-cursor="TOP">
          Back to top ↑
        </a>
      </footer>
    </section>
  )
}

function GiantChar({ c, i, n, p }) {
  const start = (i / n) * 0.5
  const y = useTransform(p, [start, start + 0.5], ['70%', '0%'])
  const rotate = useTransform(p, [start, start + 0.5], [i % 2 ? 8 : -8, 0])
  return (
    c === ' ' ? (
      <span className="sp" />
    ) : (
      <motion.span className="ch" style={{ y, rotate, color: c === "'" ? '#ff5a1f' : undefined }}>
        {c}
      </motion.span>
    )
  )
}
