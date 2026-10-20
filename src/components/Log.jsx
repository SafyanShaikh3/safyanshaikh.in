import { motion } from 'framer-motion'
import { education, experience, journeySteps, philosophy } from '../data/content.js'

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
})

export default function Log() {
  return (
    <section id="log" className="sec" aria-label="Experience and education">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            Log<span className="serif">book</span>
          </h2>
          <div className="sec-idx">
            <div className="mono">(04) Experience & education</div>
            <div className="mono">Newest first</div>
          </div>
        </div>

        <div className="log">
          <div className="log-col">
            <h5 className="mono">Experience</h5>
            {experience.map((e, i) => (
              <motion.div className="log-item" key={e.company} {...rise(i)}>
                <div className="mono">
                  2025
                  <br />
                  <b>Grade A+</b>
                </div>
                <div>
                  <h6>{e.role}</h6>
                  <div className="mono" style={{ marginBottom: 8 }}>
                    {e.company} · {e.location} · {e.period}
                  </div>
                  <p>{e.detail}</p>
                </div>
              </motion.div>
            ))}
            <h5 className="mono" style={{ marginTop: 40 }}>How I work</h5>
            {philosophy.map((p, i) => (
              <motion.div className="log-item" key={p.title} {...rise(i)}>
                <div className="mono">
                  <b>0{i + 1}</b> {p.title}
                </div>
                <p>{p.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="log-col">
            <h5 className="mono">Education</h5>
            {education.map((e, i) => (
              <motion.div className="log-item" key={e.degree} {...rise(i)}>
                <div className="mono">
                  {e.status === 'In progress' ? <b>● Now</b> : 'Done'}
                </div>
                <div>
                  <h6>{e.degree}</h6>
                  <div className="mono" style={{ marginBottom: 8 }}>{e.institute}</div>
                  <p>{e.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="path">
          {journeySteps.map((s, i) => (
            <motion.div className="path-step" key={s.label} {...rise(i)}>
              <i />
              <span className="mono" style={{ display: 'block', marginBottom: 6 }}>Step 0{i + 1}</span>
              <b>{s.label}</b>
              <span>{s.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
