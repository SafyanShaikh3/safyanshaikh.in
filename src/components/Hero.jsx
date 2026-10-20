import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import RingField from './RingField.jsx'
import { profile } from '../data/content.js'
import { scrollToHash } from '../lib/hooks.js'

const ease = [0.76, 0, 0.24, 1]

function Row({ word, ready, delay, x }) {
  return (
    <motion.span className="row" style={{ x }}>
      {word.split('').map((c, i) => (
        <motion.span
          key={i}
          className="ch"
          initial={{ y: '105%', rotate: 6 }}
          animate={ready ? { y: '0%', rotate: 0 } : {}}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.055 }}
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  )
}

function Callout({ style, label, value, side = 'left', len = 90, delay, ready, hot }) {
  const isLeft = side === 'left'
  return (
    <motion.div
      className="callout"
      style={{ ...style, display: 'flex', alignItems: 'center', flexDirection: isLeft ? 'row-reverse' : 'row' }}
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.4 }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 9, background: hot ? '#ff5a1f' : '#ecebe7', flex: 'none' }} />
      <motion.span
        style={{ width: len, height: 1, background: hot ? '#ff5a1f' : 'rgba(236,235,231,.5)', transformOrigin: isLeft ? 'right' : 'left', flex: 'none' }}
        initial={{ scaleX: 0 }}
        animate={ready ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <span style={{ padding: '0 10px', textAlign: isLeft ? 'right' : 'left' }}>
        <span className="mono" style={{ fontSize: 9.5 }}>{label}</span>
        <b>{hot ? <i>{value}</i> : value}</b>
      </span>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const boost = useRef(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  useEffect(() => scrollYProgress.on('change', (v) => (boost.current = v)), [scrollYProgress])

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const pY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const pS = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // portrait tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 })
  useEffect(() => {
    const on = (e) => {
      mx.set((e.clientX / innerWidth - 0.5) * 2)
      my.set((e.clientY / innerHeight - 0.5) * 2)
    }
    addEventListener('pointermove', on, { passive: true })
    return () => removeEventListener('pointermove', on)
  }, [mx, my])

  return (
    <section id="home" ref={ref} className="hero" aria-label="Introduction">
      <RingField boost={boost} />
      <div className="hero-vignette" />

      <motion.div className="hero-top wrap" style={{ opacity: fade }}>
        <motion.div className="mono" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
          <span>safyanshaikh.in</span> / 2026 — index
        </motion.div>
        <motion.div className="mono" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.3 }}>
          Android <span>·</span> Full-stack <span>·</span> AI/ML
        </motion.div>
        <motion.div className="mono" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
          {profile.location} <span>{profile.coords}</span>
        </motion.div>
      </motion.div>

      <motion.div className="portrait-wrap" style={{ y: pY, scale: pS }}>
        <motion.div
          className="portrait glass"
          style={{ rotateX: rx, rotateY: ry }}
          initial={{ opacity: 0, scale: 0.86, filter: 'blur(14px)' }}
          animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          data-cursor="HELLO"
        >
          <span className="tick tl" />
          <span className="tick tr" />
          <span className="tick bl" />
          <span className="tick br" />
          <div className="portrait-img">
            <picture>
              <source srcSet={profile.photo} type="image/webp" />
              <img src={profile.photoFallback} alt="Portrait of Safyan Shaikh" width="900" height="900" />
            </picture>
            <div className="scanline" />
            <div className="reticle" />
          </div>
          <div className="portrait-meta">
            <span className="mono">SUBJ_01</span>
            <span className="mono" style={{ color: '#ff5a1f' }}>● REC</span>
          </div>
          <div className="callouts">
            <Callout ready={ready} delay={1.5} side="left" len={70} style={{ right: '100%', top: '12%' }} label="Subject" value="Safyan Shaikh" />
            <Callout ready={ready} delay={1.65} side="right" len={50} style={{ left: '100%', top: '40%' }} label="Studying" value="MCA · AI & ML" />
            <Callout ready={ready} delay={1.8} side="right" len={90} style={{ left: '100%', top: '74%' }} label="Status" value="Open to work" hot />
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-stage wrap">
        <h1 className="hero-name" aria-label="Safyan Shaikh">
          <Row word="Safyan" ready={ready} delay={0.1} x={x1} />
          <Row word="Shaikh" ready={ready} delay={0.3} x={x2} />
        </h1>
        <motion.div style={{ opacity: fade }}>
        <motion.div
          className="hero-line"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            I build complete products: an offline Android app, a store that takes real payments, ML on messy data.{' '}
            <em className="serif" style={{ fontSize: '1.15em' }}>And I care how they feel to use.</em>
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#work" className="btn btn-solid" onClick={(e) => (e.preventDefault(), scrollToHash('#work'))} data-cursor="SCROLL">
              See the work ↓
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost glass" data-cursor="MAIL">
              Say hello
            </a>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
