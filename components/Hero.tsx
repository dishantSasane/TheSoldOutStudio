"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

const PANELS = [
  { label: "Mumbai 2.0",              src: "/assets/videos/Mumbai_2.0.mp4" },
  { label: "Mexican Lounge",          src: "/assets/videos/Copy_of_Mexican_Lounge.mp4" },
  { label: "The Emirates Experience", src: "/assets/videos/The_Emirates_Experience.mp4" },
  { label: "Mumbai Premium",          src: "/assets/videos/Mumbai_2.0.mp4" },
]

const N = PANELS.length

// Wider/taller clamp values give cards more screen presence on small devices
const CARD_WIDTH  = "clamp(220px, 80vw, 900px)"
const CARD_HEIGHT = "clamp(180px, 50vh, 600px)"
const CARD_LEFT   = "34vw"
const CARD_TOP    = "65vh"

function UnifiedHero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([])
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const headingRef    = useRef<HTMLHeadingElement>(null)
  const mainVideoRef  = useRef<HTMLVideoElement | null>(null)

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
    gsap.ticker.lagSmoothing(500, 33)
    gsap.ticker.fps(60)

    // matchMedia is orientation-aware and accurate on real devices.
    // window.innerWidth can be stale after orientation change.
    const mq       = window.matchMedia("(max-width: 767px)")
    const isMobile = mq.matches

    // ── Single video element ──────────────────────────────────────────────
    const mainVideo = document.createElement("video")
    mainVideo.loop  = true
    mainVideo.muted = true
    mainVideo.setAttribute("playsinline", "")
    mainVideo.preload = "none"
    mainVideo.src     = PANELS[0].src
    Object.assign(mainVideo.style, {
      width: "100%", height: "100%",
      objectFit: "cover", display: "block",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
    })
    mainVideoRef.current = mainVideo

    const firstCard = cardRefs.current[0]
    if (firstCard) {
      firstCard.appendChild(mainVideo)
      mainVideo.load()
      mainVideo.play().catch(() => {})
    }

    // ── Preloader — fetches next panel's bytes in the background ──────────
    const preloader = document.createElement("video")
    preloader.muted   = true
    preloader.preload = "auto"

    const preloadNext = (nextIdx: number) => {
      preloader.src = PANELS[nextIdx].src
      preloader.load()
    }
    if (N > 1) preloadNext(1)

    // ── H1 twist-in ──────────────────────────────────────────────────────
    // Reduced perspective on mobile: lighter GPU matrix math
    const perspectiveVal = isMobile ? 600 : 1000

    gsap.set(headingRef.current, {
      opacity: 0, y: 40,
      rotationX: 40, rotationY: -15,
      transformPerspective: perspectiveVal,
      transformOrigin: "left center",
      scale: 0.95,
    })

    const textTl = gsap.timeline()
    textTl
      .to(headingRef.current, {
        opacity: 1, y: 0, rotationX: -5, rotationY: 5, scale: 1.02,
        duration: isMobile ? 0.6 : 0.8, ease: "power3.out",
      })
      .to(headingRef.current, {
        rotationX: 0, rotationY: 0, scale: 1,
        duration: isMobile ? 0.3 : 0.4, ease: "power2.inOut",
      })

    // ── Card initial states ───────────────────────────────────────────────
    gsap.set(cardRefs.current[0], { x: 0, y: 0, z: -200, scale: 0.85, rotation: 0, opacity: 0.6 })
    for (let i = 1; i < N; i++) {
      gsap.set(cardRefs.current[i], { x: "-8vw", y: "60vh", z: -200, scale: 0.85, rotation: -20, opacity: 0.6 })
    }

    // ── ScrollTrigger ─────────────────────────────────────────────────────
    // Lower scrub on mobile: touch momentum + 0.5 lerp = perceptible lag.
    // 0.3 tracks fingers more tightly on real devices.
    let currentIdx   = 0
    let lastProgress = 0

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: isMobile ? 0.3 : 0.5,
        onUpdate: (self) => {
          const progress = self.progress

          if (Math.abs(progress - lastProgress) < 0.005) return
          lastProgress = progress

          const idx = Math.min(Math.floor(progress * N), N - 1)

          if (idx !== currentIdx) {
            currentIdx = idx
            const newCard = cardRefs.current[idx]
            if (newCard && mainVideo) {
              mainVideo.src = PANELS[idx].src
              mainVideo.load()
              newCard.appendChild(mainVideo)
              mainVideo.play().catch(() => {})
            }
            preloadNext((idx + 1) % N)
          }

          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = progress > 0.03 ? "0" : "1"
          }
        },
      },
    })

    const CY        = "-27vh"
    const settleDur = isMobile ? 0.16 : 0.20
    const exitDur   = isMobile ? 0.14 : 0.18
    const enterDur  = isMobile ? 0.16 : 0.20
    const gap       = 0.05
    // Reduced rotation intensity on mobile: less GPU overdraw at extreme angles
    const exitRotation = isMobile ? 10 : 20
    const exitScale    = isMobile ? 0.92 : 0.9

    tl.to(cardRefs.current[0], {
      y: CY, z: 0, scale: 1, opacity: 1,
      ease: "power3.out", duration: settleDur,
    }, 0)
    tl.to(cardRefs.current[0], {
      x: "45vw", y: "-120vh", rotation: exitRotation, scale: exitScale, opacity: 0,
      ease: "power3.inOut", duration: exitDur,
    }, settleDur + gap)

    let nextEnterTime = settleDur + gap + exitDur
    for (let i = 1; i < N; i++) {
      const enterStart = nextEnterTime
      const exitStart  = enterStart + enterDur + gap

      tl.to(cardRefs.current[i], {
        x: 0, y: CY, z: 0, scale: 1, rotation: 0, opacity: 1,
        ease: "power3.out", duration: enterDur,
      }, enterStart)

      if (i < N - 1) {
        tl.to(cardRefs.current[i], {
          x: "45vw", y: "-120vh", rotation: exitRotation, scale: exitScale, opacity: 0,
          ease: "power3.inOut", duration: exitDur,
        }, exitStart)
        nextEnterTime = exitStart + exitDur
      }
    }

    // Pause video when section is fully offscreen
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onLeave:      () => mainVideo.pause(),
      onEnterBack:  () => mainVideo.play().catch(() => {}),
    })

    // Replay H1 on scroll-to-top
    const onScroll = () => {
      if (window.scrollY === 0) {
        gsap.set(headingRef.current, {
          opacity: 0, y: 40,
          transformPerspective: perspectiveVal,
          transformOrigin: "left center",
          scale: 0.95,
        })
        textTl.restart()
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // Orientation change: let the viewport settle (100ms) then recalculate
    // scroll positions — fixes layout glitches after device rotation
    const onOrientationChange = () => {
      setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    window.addEventListener("orientationchange", onOrientationChange)

    const refreshOnLoad = () => ScrollTrigger.refresh()
    window.addEventListener("load", refreshOnLoad)
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 800)

    return () => {
      textTl.kill()
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("orientationchange", onOrientationChange)
      window.removeEventListener("load", refreshOnLoad)
      clearTimeout(refreshTimer)
      mainVideo.pause()
      mainVideo.src = ""
      mainVideo.remove()
      preloader.src = ""
      preloader.remove()
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "500vh",
          backgroundColor: "#ffffff",
          contain: "layout paint",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            // perspective set via CSS var — media query reduces it on mobile
            // without JS, avoiding layout thrash on orientation change
            perspective: "var(--hero-perspective, 1000px)",
            transformStyle: "preserve-3d",
            contain: "layout paint",
          }}
        >
          {/* ── H1 TEXT ── */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100vh",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "4vw",
              pointerEvents: "none",
              perspective: "var(--hero-perspective, 1000px)",
              transformStyle: "preserve-3d",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            <h1
              ref={headingRef}
              className="hero-h1"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                color: "#EB0000",
                fontSize: "clamp(1.6rem, 8.5vw, 130px)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                // whiteSpace controlled by media query below —
                // nowrap on desktop, normal on mobile to prevent overflow
                margin: 0,
                letterSpacing: "-0.04em",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              STEP INTO THE<br />
              SPOTLIGHT WITH<br />
              SOLDOUT!
            </h1>
            <motion.p
              style={{
                marginTop: 28,
                fontSize: "clamp(1rem, 2.5vw, 32px)",
                color: "#EB0000",
                fontWeight: 500,
                fontFamily: "Arial, sans-serif",
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              No one can miss you now
            </motion.p>
            <motion.div
              style={{ marginTop: 40, pointerEvents: "auto" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <button
                onClick={scrollToContact}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "16px 42px",
                  borderRadius: 999,
                  border: "none",
                  color: "#FFFFFF",
                  backgroundColor: "#EB0000",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Arial, sans-serif",
                  transition: "transform 0.25s, opacity 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)"
                  e.currentTarget.style.opacity = "0.9"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.opacity = "1"
                }}
              >
                Get a Quote
              </button>
            </motion.div>
          </div>

          {/* ── CARDS — single video reparented here by useEffect ── */}
          {PANELS.map((_, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                position: "absolute",
                left: CARD_LEFT,
                top: CARD_TOP,
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                zIndex: 10,
                overflow: "hidden",
                backgroundColor: "#111",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            />
          ))}

          {/* ── SCROLL HINT ── */}
          <div
            ref={scrollHintRef}
            style={{
              position: "absolute",
              bottom: 40,
              right: "4vw",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 1,
              transition: "opacity 0.6s ease",
              pointerEvents: "none",
            }}
          >
            <div style={{
              width: 1, height: 44,
              backgroundColor: "#EB0000",
              animation: "scrollPulse 1.4s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#999",
              fontFamily: "'Sora', sans-serif",
            }}>
              Scroll
            </span>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50%       { transform: scaleY(0.55); opacity: 0.35; }
        }

        /* Reduce 3D perspective cost on mobile GPUs */
        @media (max-width: 767px) {
          :root { --hero-perspective: 600px; }
        }
        @media (min-width: 768px) {
          :root { --hero-perspective: 1000px; }
        }

        /* Prevent H1 overflow on small screens.
           whiteSpace: nowrap is ideal for desktop typography but causes
           horizontal scroll on narrow viewports. CSS media query overrides
           the inline style via the hero-h1 class + !important. */
        @media (max-width: 767px) {
          .hero-h1 {
            white-space: normal !important;
            word-break: break-word;
          }
        }
      `}</style>
    </>
  )
}

export default function Hero() {
  return <UnifiedHero />
}
