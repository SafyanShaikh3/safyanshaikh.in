import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/hooks.js'

/**
 * A winding tunnel of contour rings, flown through in real time.
 * Mouse steers the camera; `boost` (0..1, from scroll) speeds the flight up.
 */
export default function RingField({ boost }) {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const reduce = prefersReducedMotion()
    const COUNT = 46
    const FAR = 14
    const SEG = 140
    let w = 0,
      h = 0,
      dpr = 1,
      id,
      visible = true
    const rings = Array.from({ length: COUNT }, (_, i) => ({ z: 0.4 + (i / COUNT) * FAR, k: i }))
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const size = () => {
      dpr = Math.min(1.6, devicePixelRatio || 1)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    const onMove = (e) => {
      mouse.tx = (e.clientX / innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / innerHeight - 0.5) * 2
    }
    addEventListener('pointermove', onMove, { passive: true })
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)

    const pathX = (z, t) => Math.sin(z * 0.32 + t * 0.25) * 0.55
    const pathY = (z, t) => Math.cos(z * 0.27 + t * 0.2) * 0.35

    let last = performance.now()
    let t = 0
    const frame = (now) => {
      id = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!visible) return
      const b = boost?.current ?? 0
      t += dt
      const speed = reduce ? 0 : 0.9 + b * 7
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      ctx.clearRect(0, 0, w, h)
      const F = Math.min(w, h) * 0.62
      const cx = w * 0.5
      const cy = h * 0.46
      const camX = pathX(0, t) + mouse.x * 0.35
      const camY = pathY(0, t) + mouse.y * 0.25

      for (const r of rings) {
        r.z -= speed * dt
        if (r.z < 0.25) {
          r.z += FAR
          r.k += COUNT
        }
      }
      const sorted = [...rings].sort((a, b) => b.z - a.z)
      for (const r of sorted) {
        const z = r.z
        const near = Math.min(1, (z - 0.25) / 0.8)
        const far = 1 - z / FAR
        const a = Math.pow(Math.max(0, far), 1.6) * near
        if (a < 0.01) continue
        const ox = pathX(z, t) - camX
        const oy = pathY(z, t) - camY
        const hot = r.k % 11 === 0
        ctx.beginPath()
        for (let i = 0; i <= SEG; i++) {
          const th = (i / SEG) * Math.PI * 2
          const wob =
            1 +
            0.07 * Math.sin(3 * th + r.k * 0.7 + t * 0.8) +
            0.035 * Math.sin(7 * th - t * 1.1 + r.k) +
            b * 0.05 * Math.sin(13 * th + t * 4)
          const x = (ox + Math.cos(th) * wob) / z
          const y = (oy + Math.sin(th) * wob * 0.82) / z
          const sx = cx + x * F
          const sy = cy + y * F
          i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy)
        }
        ctx.lineWidth = hot ? 1.4 : 1
        ctx.strokeStyle = hot ? `rgba(255,90,31,${Math.min(1, a * 1.4)})` : `rgba(236,235,231,${a * 0.42})`
        ctx.stroke()
      }
    }
    id = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(id)
      ro.disconnect()
      io.disconnect()
      removeEventListener('pointermove', onMove)
    }
  }, [boost])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
