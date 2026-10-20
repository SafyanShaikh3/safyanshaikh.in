import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cover from './Cover.jsx'
import { Shot } from './Frames.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function ProjectSheet({ project: p, onClose }) {
  const [lb, setLb] = useState(null)

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && (lb ? setLb(null) : onClose())
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [lb, onClose])

  const links = [
    ['Source', p.github],
    ['Live', p.demo],
  ].filter(([, v]) => v)

  return (
    <>
      <motion.div className="sheet-bg" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.aside
        className="psheet glass"
        role="dialog"
        aria-modal="true"
        aria-label={`${p.title} details`}
        initial={{ x: '105%', rotateY: -12 }}
        animate={{ x: 0, rotateY: 0 }}
        exit={{ x: '105%', rotateY: -8 }}
        transition={{ duration: 0.75, ease }}
        style={{ transformPerspective: 1400 }}
      >
        <div className="psheet-top">
          <span className="mono">
            {p.category} · {p.year}
          </span>
          <button className="psheet-close" onClick={onClose} aria-label="Close" data-cursor="CLOSE" autoFocus>
            ✕
          </button>
        </div>
        <div className="psheet-body" data-lenis-prevent>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7, ease }}>
            <span className="mono">{p.tagline}</span>
            <h2>{p.title}</h2>
            <p className="lead">{p.description}</p>
            <div className="case-tags">
              {p.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            {links.length > 0 && (
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                {links.map(([k, v]) => (
                  <a key={k} className="btn btn-ghost" href={v} target="_blank" rel="noreferrer">
                    {k} ↗
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {p.gallery?.length ? (
            <>
              <h5 className="mono">Screens — from the running app</h5>
              <div className="gal">
                {p.gallery.map((g) => (
                  <button key={g.src} onClick={() => setLb(g)} data-cursor="ZOOM">
                    <figure>
                      {g.kind === 'phone' ? (
                        <div className="pframe-wrap">
                          <Shot item={g} />
                        </div>
                      ) : (
                        <Shot item={g} />
                      )}
                      <figcaption>{g.caption}</figcaption>
                    </figure>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ marginTop: 30, maxWidth: 420 }}>
              <Cover project={p} />
            </div>
          )}

          {p.stats && (
            <div className="case-stats glass" style={{ margin: '30px 0 0', borderRadius: 16, gridTemplateColumns: `repeat(${Math.min(4, p.stats.length)}, 1fr)`, paddingBottom: 14 }}>
              {p.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="ps-two" style={{ marginTop: 30 }}>
            <div className="ps-card glass">
              <h5 className="mono" style={{ marginTop: 0 }}>The problem</h5>
              <p>{p.problem}</p>
            </div>
            <div className="ps-card glass">
              <h5 className="mono" style={{ marginTop: 0 }}>What I built</h5>
              <p>{p.solution}</p>
            </div>
          </div>

          {p.highlights?.length > 0 && (
            <>
              <h5 className="mono">Engineering notes</h5>
              {p.highlights.map((h, i) => (
                <div className="ps-hl" key={h.label}>
                  <span className="mono accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <b>{h.label}</b>
                    <p>{h.detail}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          <h5 className="mono">Features</h5>
          <ul className="ps-feat">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </motion.aside>

      <AnimatePresence>
        {lb && (
          <motion.div className="lb" onClick={() => setLb(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-cursor="CLOSE">
            <motion.img src={lb.src} alt={lb.caption} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease }} />
            <div className="mono">{lb.caption}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
