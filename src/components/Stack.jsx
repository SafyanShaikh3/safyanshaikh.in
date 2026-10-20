import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { skillGroups } from '../data/content.js'

const CX = 500
const CY = 410

function layout() {
  return skillGroups.map((g, gi) => {
    const a = (gi / skillGroups.length) * Math.PI * 2 - Math.PI / 2 + 0.3
    const hx = CX + Math.cos(a) * 250
    const hy = CY + Math.sin(a) * 235
    const items = g.items.slice(0, 6)
    const leaves = items.map((name, li) => {
      const spread = 2.4
      const la = a - spread / 2 + (li / Math.max(1, items.length - 1)) * spread
      const r = 96 + (li % 2) * 46
      return { name, x: hx + Math.cos(la) * r, y: hy + Math.sin(la) * r, a: la }
    })
    return { ...g, hx, hy, a, leaves }
  })
}

export default function Stack() {
  const nodes = useMemo(layout, [])
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    if (pinned) return
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), 2600)
    return () => clearInterval(id)
  }, [pinned, nodes.length])

  const enter = (i) => {
    setPinned(true)
    setActive(i)
  }

  return (
    <section id="stack" className="sec" aria-label="Skills">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            The <span className="serif">stack</span>
          </h2>
          <div className="sec-idx">
            <div className="mono">(03) Skills</div>
            <div className="mono">Hover a group to trace it</div>
          </div>
        </div>

        <div className="stack-grid" onMouseLeave={() => setPinned(false)}>
          <div className="const glass" aria-hidden="true">
            <span className="tick tl" />
            <span className="tick tr" />
            <span className="tick bl" />
            <span className="tick br" />
            <div className="const-hud">
              <span className="mono">Graph / skills.map</span>
              <span className="mono">
                Node <span className="accent">{String(active + 1).padStart(2, '0')}</span> / {String(nodes.length).padStart(2, '0')}
              </span>
            </div>
            <svg viewBox="0 0 1000 820">
              <defs>
                <radialGradient id="glow">
                  <stop offset="0%" stopColor="#ff5a1f" stopOpacity=".55" />
                  <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[120, 240, 360].map((r) => (
                <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="rgba(236,235,231,.06)" strokeDasharray="2 6" />
              ))}
              {nodes.map((n, i) => {
                const on = i === active
                return (
                  <g key={n.title} onMouseEnter={() => enter(i)} style={{ cursor: 'default' }}>
                    <motion.line
                      x1={CX} y1={CY} x2={n.hx} y2={n.hy}
                      stroke={on ? '#ff5a1f' : 'rgba(236,235,231,.22)'}
                      strokeWidth={on ? 1.5 : 1}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                    />
                    {n.leaves.map((l, li) => (
                      <g key={l.name}>
                        <motion.line
                          x1={n.hx} y1={n.hy} x2={l.x} y2={l.y}
                          stroke={on ? 'rgba(255,90,31,.8)' : 'rgba(236,235,231,.12)'}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.8 + i * 0.1 + li * 0.04 }}
                        />
                        <circle cx={l.x} cy={l.y} r={on ? 3.5 : 2.5} fill={on ? '#ff5a1f' : '#ecebe7'} opacity={on ? 1 : 0.5} />
                        <text
                          x={l.x + (Math.cos(l.a) >= 0 ? 8 : -8)}
                          y={l.y + 4}
                          textAnchor={Math.cos(l.a) >= 0 ? 'start' : 'end'}
                          opacity={on ? 1 : 0.38}
                          style={{ transition: 'opacity .4s' }}
                        >
                          {l.name}
                        </text>
                      </g>
                    ))}
                    {on && <circle cx={n.hx} cy={n.hy} r="46" fill="url(#glow)" />}
                    <g className="hub">
                      <circle cx={n.hx} cy={n.hy} r="7" fill={on ? '#ff5a1f' : '#0a0a0b'} stroke={on ? '#ff5a1f' : '#ecebe7'} />
                      <text x={n.hx} y={n.hy - 16} textAnchor="middle" opacity={on ? 1 : 0.7}>
                        {n.title.toUpperCase()}
                      </text>
                    </g>
                  </g>
                )
              })}
              <circle cx={CX} cy={CY} r="26" fill="#ecebe7" />
              <text x={CX} y={CY + 5} textAnchor="middle" style={{ fontFamily: 'Archivo Variable', fontWeight: 800, fontSize: 15, fill: '#0a0a0b' }}>
                SS
              </text>
            </svg>
          </div>

          <div className="groups">
            {nodes.map((g, i) => (
              <motion.div
                key={g.title}
                className={`group glass ${i === active ? 'on' : ''}`}
                onMouseEnter={() => enter(i)}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <h5>
                  {g.title} <span className="mono" style={{ color: i === active ? '#ff5a1f' : undefined }}>{String(i + 1).padStart(2, '0')}</span>
                </h5>
                <div className="chips">
                  {g.items.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
