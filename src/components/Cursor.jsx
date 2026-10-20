import { useEffect, useRef, useState } from 'react'
import { useMedia } from '../lib/hooks.js'

/**
 * HUD cursor: a dot that follows exactly, a ring that trails, and a live x/y readout.
 * Any element with data-cursor="LABEL" grows the ring and shows the label.
 */
export default function Cursor() {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const dot = useRef(null)
  const ring = useRef(null)
  const xy = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('has-cursor')
    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my,
      id
    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      const t = e.target.closest?.('[data-cursor]')
      setLabel(t ? t.getAttribute('data-cursor') : '')
    }
    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`
      if (xy.current) xy.current.textContent = `x ${String(Math.round(mx)).padStart(4, '0')}  y ${String(Math.round(my)).padStart(4, '0')}`
      id = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', move, { passive: true })
    id = requestAnimationFrame(loop)
    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(id)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [fine])

  if (!fine) return null
  return (
    <>
      <div className="cur" ref={ring} aria-hidden="true">
        <div className={`cur-ring ${label ? 'big' : ''}`}>
          <span>{label}</span>
        </div>
      </div>
      <div className="cur" ref={dot} aria-hidden="true">
        <div className="cur-dot" />
        {!label && <div className="cur-xy" ref={xy} />}
      </div>
    </>
  )
}
