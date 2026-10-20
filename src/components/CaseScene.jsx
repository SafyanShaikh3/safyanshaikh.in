import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { Shot } from './Frames.jsx'
import { useDesktop } from '../lib/hooks.js'

/**
 * A pinned 3D "room" for one featured project. Real screenshots float as glass panes at
 * different depths; scrolling swings the whole world from a tilted table to face-on and
 * pulls the layers apart, the mouse adds a little parallax on top.
 */
function Pane({ p, progress, i }) {
  const spread = useTransform(progress, [0, 0.45, 1], [0.15, 1, 1.25])
  const z = useTransform(spread, (s) => p.z * s)
  const y = useTransform(progress, [0, 1], [(p.dy ?? 60) * 0.7, -(p.dy ?? 60) * 0.7])
  const opacity = useTransform(progress, [0, 0.1 + i * 0.03, 0.95, 1], [0.1, 1, 1, 0.7])
  return (
    <motion.div className="pane-pos" style={{ left: p.x, top: p.y, y, z, rotateY: p.ry || 0, rotateX: p.rx || 0 }}>
      <motion.div className="pane glass" style={{ width: p.w, opacity }}>
        {p.cap && (
          <span className="pane-cap">
            <i>{String(i + 1).padStart(2, '0')}</i> — {p.cap}
          </span>
        )}
        {p.node ? p.node : <Shot item={p.item} alt={p.alt} />}
      </motion.div>
    </motion.div>
  )
}

export default function CaseScene({ project, index, panes, onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })
  useEffect(() => {
    const on = (e) => {
      mx.set(e.clientX / innerWidth - 0.5)
      my.set(e.clientY / innerHeight - 0.5)
    }
    addEventListener('pointermove', on, { passive: true })
    return () => removeEventListener('pointermove', on)
  }, [mx, my])

  const baseRX = useTransform(p, [0, 0.5, 1], [42, 6, -6])
  const baseRY = useTransform(p, [0, 0.5, 1], [-28, -6, 10])
  const rotateX = useTransform([baseRX, smy], ([a, b]) => a - b * 8)
  const rotateY = useTransform([baseRY, smx], ([a, b]) => a + b * 12)
  const worldZ = useTransform(p, [0, 0.5, 1], [-420, 0, -80])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const infoY = useTransform(p, [0, 0.15], [60, 0])
  const infoO = useTransform(p, [0, 0.1, 0.96, 1], [0, 1, 1, 0.3])

  const mobileShots = project.gallery || []
  const desktop = useDesktop()

  return (
    <section ref={ref} className="case" aria-label={`${project.title} case study`}>
      <div className="case-stick">
        <div className="case-num">
          <span className="mono">Featured · {project.year}</span>
          <b>{String(index).padStart(2, '0')}</b>
        </div>

        <div className="case-scene" aria-hidden="true">
          <motion.div className="case-world" style={{ left: '60%', rotateX, rotateY, z: worldZ }}>
            {panes.map((pn, i) => (
              <Pane key={i} p={pn} i={i} progress={p} />
            ))}
          </motion.div>
        </div>

        <motion.div className="case-info glass" style={desktop ? { y: infoY, opacity: infoO } : undefined}>
          <span className="tick tl" />
          <span className="tick br" />
          <span className="mono">{project.category} — {project.tagline}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.stats && (
            <div className="case-stats">
              {project.stats.slice(0, 4).map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="case-tags">
            {project.tech.slice(0, 6).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <button className="btn btn-solid" onClick={() => onOpen(project.id)} data-cursor="OPEN">
            Read the case study →
          </button>
        </motion.div>

        <div className="case-mobile">
          {mobileShots.map((g) => (
            <Shot key={g.src} item={g} />
          ))}
        </div>

        <div className="case-progress">
          <motion.i style={{ width: bar }} />
        </div>
      </div>
    </section>
  )
}
