import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import Stack from './components/Stack.jsx'
import Log from './components/Log.jsx'
import Contact from './components/Contact.jsx'
import ProjectSheet from './components/ProjectSheet.jsx'
import { projects } from './data/content.js'
import { useLenis, stopScroll } from './lib/hooks.js'

export default function App() {
  const [ready, setReady] = useState(false)
  const [openId, setOpenId] = useState(null)
  useLenis()

  useEffect(() => {
    document.body.classList.toggle('is-loading', !ready)
  }, [ready])

  useEffect(() => {
    stopScroll(!!openId)
  }, [openId])

  const open = useCallback((id) => setOpenId(id), [])
  const project = projects.find((p) => p.id === openId)

  return (
    <>
      <AnimatePresence>{!ready && <Preloader key="pre" onDone={() => setReady(true)} />}</AnimatePresence>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Manifesto />
        <Marquee />
        <Work onOpen={open} />
        <Stack />
        <Log />
        <Contact />
      </main>
      <AnimatePresence>
        {project && <ProjectSheet key={project.id} project={project} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
