import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { prefersReducedMotion, scrollToHash, useISTClock } from '../lib/hooks.js'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Log', href: '#log' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const time = useISTClock()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = links.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToHash(href)
  }

  return (
    <>
      <div className="nav-pos">
      <motion.nav
        className="nav glass"
        aria-label="Primary"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: prefersReducedMotion() ? 0 : 2.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#home" className="nav-mark" onClick={(e) => go(e, '#home')} aria-label="Back to top" data-cursor="TOP">
          SS
        </a>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={`nl ${active === l.href ? 'on' : ''}`} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
        <span className="nav-clock mono" title="My local time">
          <i className="dot-live" /> IST {time}
        </span>
        <button className="nav-menu mono" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu-sheet">
          {open ? 'Close' : 'Menu'}
        </button>
      </motion.nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-sheet"
            className="sheet glass"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label} <span className="mono">0{i + 1}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
