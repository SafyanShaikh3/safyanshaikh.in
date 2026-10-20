import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True while a media query matches; re-renders on change. */
export function useMedia(query, initial = false) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

export const useDesktop = () => useMedia('(min-width: 821px)', true)

let lenis = null

/** Smooth, weighted scrolling. Skipped for reduced-motion users. */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function stopScroll(stop) {
  if (lenis) stop ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = stop ? 'hidden' : ''
}

/** Asia/Kolkata wall clock, ticking every second. */
export function useISTClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}
