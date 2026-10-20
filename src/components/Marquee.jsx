import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

const items = [
  ['Android', false],
  ['Full-stack', true],
  ['AI / ML', false],
  ['Offline-first', true],
  ['Payments', false],
  ['Kotlin', true],
]

/** Big type that drifts on its own and lurches with scroll velocity (direction flips too). */
export default function Marquee() {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const factor = useTransform(vel, [-2000, 0, 2000], [-6, 0, 6], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${((v % 50) - 50) % 50}%`)

  useAnimationFrame((_, delta) => {
    let move = dir.current * -2.2 * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * -Math.abs(f) * (delta / 1000)
    base.set(base.get() + move)
  })

  const row = (
    <>
      {items.map(([t, o], i) => (
        <span className="marq-item" key={i}>
          <span className={o ? 'o' : ''}>{t}</span>
          <span className="star" />
        </span>
      ))}
    </>
  )
  return (
    <div className="marq" aria-hidden="true">
      <motion.div className="marq-track" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </div>
  )
}
