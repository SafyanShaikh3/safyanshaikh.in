import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import CaseScene from './CaseScene.jsx'
import Cover from './Cover.jsx'
import { projects } from '../data/content.js'

const byId = Object.fromEntries(projects.map((p) => [p.id, p]))
const g = (id, file) => byId[id].gallery.find((x) => x.src.includes(file))

/* ── CardSense: one real phone screen, surrounded by glass panes of real facts ── */
const bridge = [
  'saveFile',
  'printPage',
  'postNotification',
  'syncCardReminders',
  'isBiometricAvailable',
  'authenticateBiometric',
  'setSecureScreen',
  'haptic',
]
const Chip = ({ k, v, hot }) => (
  <div style={{ padding: '12px 14px' }}>
    <div className="mono" style={{ fontSize: 9.5 }}>{k}</div>
    <div style={{ fontWeight: 800, fontVariationSettings: "'wdth' 70", fontSize: 30, lineHeight: 1, color: hot ? '#ff5a1f' : undefined }}>{v}</div>
  </div>
)
const cardsensePanes = [
  { item: g('cardsense', 'cardsense-home'), w: 'min(19vw, 300px)', x: '2vw', y: '0vh', z: 160, dy: 40, cap: 'Home screen · Android 15', alt: 'CardSense home screen' },
  {
    w: '23vw', x: '-20vw', y: '-14vh', z: -120, ry: 14, dy: 90, cap: 'AndroidBridge.kt',
    node: (
      <pre className="mono" style={{ margin: 0, padding: '14px 16px', fontSize: 11, lineHeight: 1.75, textTransform: 'none', letterSpacing: 0, color: '#b9b8b3', whiteSpace: 'pre' }}>
        <span style={{ color: '#77766f' }}>// 11 methods — only what a WebView can't do</span>
        {'\n'}
        {bridge.map((m) => (
          <span key={m}>
            <span style={{ color: '#ff5a1f' }}>@JavascriptInterface</span> fun <span style={{ color: '#ecebe7' }}>{m}</span>()
            {'\n'}
          </span>
        ))}
      </pre>
    ),
  },
  { w: '12vw', x: '20vw', y: '-20vh', z: 260, dy: 120, node: <Chip k="Network calls" v="0" hot /> },
  { w: '14vw', x: '22vw', y: '4vh', z: -40, ry: -10, dy: 70, node: <Chip k="Reminder job" v="09:00" /> },
  { w: '13vw', x: '-14vw', y: '20vh', z: 220, dy: 140, node: <Chip k="Re-lock after" v="30 s" /> },
  { w: '15vw', x: '18vw', y: '24vh', z: 90, dy: 50, node: <Chip k="Notification channels" v="4" /> },
]

/* ── Shofiy: real screenshots from a local install, storefront + admin + mobile ── */
const shofiyPanes = [
  { item: g('shofiy', 'shofiy-admin.webp'), w: '36vw', x: '-18vw', y: '-12vh', z: -220, ry: 16, dy: 90, cap: 'Admin dashboard' },
  { item: g('shofiy', 'shofiy-home'), w: '42vw', x: '1vw', y: '-2vh', z: 80, dy: 50, cap: 'Storefront' },
  { item: g('shofiy', 'shofiy-product'), w: '28vw', x: '21vw', y: '22vh', z: -60, ry: -12, dy: 110, cap: 'Product · live stock' },
  { item: g('shofiy', 'shofiy-admin-specials'), w: '26vw', x: '-12vw', y: '24vh', z: 140, dy: 130, cap: "Today's specials" },
  { item: g('shofiy', 'shofiy-mobile.webp'), w: '10vw', x: '27vw', y: '6vh', z: 300, dy: 120, cap: 'Mobile' },
]

const rest = projects.filter((p) => !['cardsense', 'shofiy'].includes(p.id))

function Index({ onOpen }) {
  const [hover, setHover] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 26 })
  const sy = useSpring(y, { stiffness: 260, damping: 26 })
  const rot = useMotionValue(0)
  const srot = useSpring(rot, { stiffness: 120, damping: 14 })
  const last = useRef(0)
  useEffect(() => {
    const on = (e) => {
      rot.set(Math.max(-14, Math.min(14, (e.clientX - last.current) * 0.6)))
      last.current = e.clientX
      x.set(e.clientX + 24)
      y.set(e.clientY - 120)
    }
    addEventListener('pointermove', on, { passive: true })
    return () => removeEventListener('pointermove', on)
  }, [x, y, rot])

  return (
    <div className="wrap" style={{ paddingTop: 'clamp(60px, 10vh, 120px)' }}>
      <div className="sec-head" style={{ marginBottom: 0 }}>
        <h3 className="mono" style={{ margin: 0 }}>More work — ({String(rest.length).padStart(2, '0')})</h3>
        <span className="mono sec-idx">Click a row for the details</span>
      </div>
      <div onMouseLeave={() => setHover(null)}>
        {rest.map((p, i) => (
          <motion.button
            key={p.id}
            className="idx-row"
            onClick={() => onOpen(p.id)}
            onMouseEnter={() => setHover(p)}
            data-cursor="OPEN"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono">{String(i + 3).padStart(2, '0')}</span>
            <h4>{p.title}</h4>
            <span className="idx-tl">{p.tagline}</span>
            <span className="mono idx-year">{p.year}</span>
            <span className="idx-arrow">↗</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div
            className="idx-preview glass"
            style={{ x: sx, y: sy, rotate: srot }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <Cover project={hover} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 2px 2px' }}>
              {hover.tech.slice(0, 4).map((t) => (
                <span key={t} className="tag" style={{ fontSize: 9.5, padding: '3px 7px' }}>{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Work({ onOpen }) {
  return (
    <section id="work" aria-label="Selected work" style={{ paddingTop: 'clamp(90px, 14vh, 160px)' }}>
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <h2 className="sec-title">
            Selected <span className="serif">work</span>
          </h2>
          <div className="sec-idx">
            <div className="mono">(02) Index</div>
            <div className="mono">{String(projects.length).padStart(2, '0')} projects · 2025–26</div>
          </div>
        </div>
      </div>
      <CaseScene project={byId.cardsense} index={1} panes={cardsensePanes} onOpen={onOpen} />
      <CaseScene project={byId.shofiy} index={2} panes={shofiyPanes} onOpen={onOpen} />
      <Index onOpen={onOpen} />
    </section>
  )
}
