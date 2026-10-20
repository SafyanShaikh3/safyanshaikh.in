/** Typographic cover for projects that have no screenshots yet. Clearly a graphic, never a fake screen. */
const seed = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

export default function Cover({ project }) {
  const n = seed(project.id)
  const f = 1 + (n % 5) * 0.35
  const lines = Array.from({ length: 16 }, (_, i) => {
    const y0 = 20 + i * 14
    let d = `M0 ${y0}`
    for (let x = 0; x <= 400; x += 10) {
      const y = y0 + Math.sin(x * 0.012 * f + i * 0.5 + (n % 7)) * (10 + (i % 4) * 4) + Math.sin(x * 0.03 + i) * 3
      d += ` L${x} ${y.toFixed(1)}`
    }
    return d
  })
  return (
    <div className="cover">
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
        {lines.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={i === (n % 16) ? '#ff5a1f' : 'rgba(236,235,231,.18)'} strokeWidth="1" />
        ))}
      </svg>
      <span className="mono">{project.category} · {project.year}</span>
      <b>{project.title}</b>
    </div>
  )
}
