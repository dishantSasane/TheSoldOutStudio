"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

const RIGHT_VIDEOS = [
  { src: "/assets/videos/Mumbai_2.0.mp4", label: "Mumbai 2.0" },
  { src: "/assets/videos/Copy_of_Mexican_Lounge.mp4", label: "Mexican Lounge" },
  { src: "/assets/videos/The_Emirates_Experience.mp4", label: "The Emirates Experience" },
]

const PANELS = [
  { label: "Mumbai 2.0", img: "/videos/hero-placeholder-1.png" },
  { label: "Mexican Lounge", img: "/videos/hero-placeholder-2.png" },
  { label: "The Emirates Experience", img: "/videos/hero-placeholder-3.png" },
  { label: "Mumbai Premium", img: "/videos/hero-placeholder-4.png" },
]

const N = PANELS.length

// Card dimensions — centered on viewport
const CARD_WIDTH = "64vw"
const CARD_HEIGHT = "44vh"
const CARD_LEFT = "34vw"   // starts at 34% from left (overlaps H1 right edge)
const CARD_TOP = "65vh"    // starts at 65% from top (bottom-right corner)

/* ─── MOBILE ─── */
function MobileHero() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 560, backgroundColor: "#FFFFFF" }}>
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-20">
          <motion.h1 className="font-black uppercase"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 6.5rem)",
              lineHeight: 0.88,
              whiteSpace: "nowrap",
              letterSpacing: "-0.04em",
              color: "#EB0000"
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            STEP INTO THE<br />
            SPOTLIGHT WITH<br />
            SOLDOUT!
          </motion.h1>
          <motion.p className="mt-6 text-lg font-bold" style={{ color: "#EB0000" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            No one can miss you now
          </motion.p>
          <motion.div className="mt-8"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <button onClick={scrollToContact}
              className="inline-flex items-center px-10 py-4 rounded-full font-bold text-white text-base"
              style={{ backgroundColor: "#EB0000" }}>
              Get a Quote
            </button>
          </motion.div>
        </div>
      </section>
      <section className="w-full py-14" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="px-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#EB0000" }}>Our Work</p>
          <h2 className="font-black text-white uppercase text-2xl leading-tight">
            Campaigns That<br />Command Attention
          </h2>
        </div>
        <div className="flex flex-col gap-3 px-4">
          {RIGHT_VIDEOS.map((vid, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "9/5.5", backgroundColor: "#111" }}>
              <video src={vid.src} autoPlay loop muted playsInline preload="none"
                className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              <div className="absolute bottom-3 left-4 z-10">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#EB0000" }}>
                  Now Playing
                </p>
                <p className="text-sm font-black text-white uppercase tracking-wide">{vid.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ─── DESKTOP ─── */
function DesktopHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [segmentFill, setSegmentFill] = useState(0)

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!sectionRef.current) return

    // Register here (client-only) to avoid SSR window errors on Vercel
    gsap.registerPlugin(ScrollTrigger)

    // H1 — initial state: tilted in 3D, blurred
    gsap.set(headingRef.current, {
      opacity: 0,
      y: 40,
      rotationX: 40,
      rotationY: -15,
      transformPerspective: 1000,
      transformOrigin: "left center",
      scale: 0.95,
      filter: "blur(8px)",
    })

    // H1 premium twist-in with overshoot
    const textTl = gsap.timeline()
    textTl
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        rotationX: -5,
        rotationY: 5,
        scale: 1.02,
        filter: "blur(2px)",
        duration: 0.8,
        ease: "power3.out",
      })
      .to(headingRef.current, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.inOut",
      })

    // Set initial states — card 0 at bottom-right anchor, others off-screen below
    gsap.set(cardRefs.current[0], { x: 0, y: 0, z: -200, scale: 0.85, rotation: 0, opacity: 0.6 })
    for (let i = 1; i < N; i++) {
      gsap.set(cardRefs.current[i], {
        x: "-8vw",
        y: "60vh",    // CSS top:65vh + 60vh = 125vh → off screen below
        z: -200,
        scale: 0.85,
        rotation: -20,
        opacity: 0.6
      })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const idx = Math.min(Math.floor(progress * N), N - 1)
          setActiveIndex(idx)
          setSegmentFill(Math.max(0, Math.min((progress * N - idx) * 100, 100)))
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = progress > 0.03 ? "0" : "1"
          }
        },
      },
    })

    // CY = center y offset: CARD_TOP(65vh) + CY = 38vh (below navbar) → CY = -27vh
    const CY = "-27vh"
    const settleDur = 0.20   // card 0 rises from bottom-right to center
    const exitDur = 0.18   // card arcs out upper-right
    const enterDur = 0.20   // card arcs in from lower-left to center
    const gap = 0.05   // tiny pause between phases

    // Card 0: visible at bottom-right on load → rises to center → exits upper-right
    tl.to(cardRefs.current[0], {
      y: CY,
      z: 0,
      scale: 1,
      opacity: 1,
      ease: "power3.out",
      duration: settleDur,
    }, 0)
    tl.to(cardRefs.current[0], {
      filter: "blur(6px)",
      duration: 0.1,
    }, 0)
    tl.to(cardRefs.current[0], {
      filter: "blur(0px)",
      duration: 0.1,
    }, 0.1)
    tl.to(cardRefs.current[0], {
      x: "70vw",
      y: "-200vh",
      rotation: 30,
      scale: 0.85,
      ease: "power3.inOut",
      duration: exitDur,
    }, settleDur + gap)

    // Cards 1–3: arc in from below to center, then arc out upper-right
    let nextEnterTime = settleDur + gap + exitDur
    for (let i = 1; i < N; i++) {
      const enterStart = nextEnterTime
      const exitStart = enterStart + enterDur + gap

      tl.to(cardRefs.current[i], {
        x: 0,
        y: CY,
        z: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: "power3.out",
        duration: enterDur,
      }, enterStart)

      tl.to(cardRefs.current[i], {
        filter: "blur(6px)",
        duration: 0.1,
      }, enterStart)

      tl.to(cardRefs.current[i], {
        filter: "blur(0px)",
        duration: 0.1,
      }, enterStart + 0.1)

      if (i < N - 1) {
        tl.to(cardRefs.current[i], {
          x: "70vw",
          y: "-200vh",
          rotation: 30,
          scale: 0.85,
          ease: "power3.inOut",
          duration: exitDur,
        }, exitStart)
        nextEnterTime = exitStart + exitDur
      }
    }

    // Replay H1 twist-in whenever page reaches scroll top (logo click or back-scroll)
    const onScroll = () => {
      if (window.scrollY === 0) {
        gsap.set(headingRef.current, {
          opacity: 0,
          y: 40,
          rotationX: 40,
          rotationY: -15,
          scale: 0.95,
          filter: "blur(8px)",
        })
        textTl.restart()
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // Refresh ScrollTrigger after fonts + images finish loading so
    // scroll distances are accurate (Vercel loads assets async)
    const refreshOnLoad = () => ScrollTrigger.refresh()
    window.addEventListener("load", refreshOnLoad)
    // Also refresh after a short delay as a safety net for slow CDN assets
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 800)

    return () => {
      textTl.kill()
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("load", refreshOnLoad)
      clearTimeout(refreshTimer)
    }
  }, [])

  return (
    <>
      {/* 900vh scroll track — slow scroll so videos are highlighted */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "1500vh",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Sticky viewport — locks for entire hero scroll */}
        <div
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >

          {/* H1 TEXT — z-index 2, BEHIND cards */}
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
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <h1
              ref={headingRef}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                color: "#EB0000",
                fontSize: "clamp(3rem, 8.5vw, 130px)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                margin: 0,
                letterSpacing: "-0.04em",
              }}
            >
              STEP INTO THE<br />
              SPOTLIGHT WITH<br />
              SOLDOUT!
            </h1>
            <motion.p style={{
              marginTop: 28,
              fontSize: "32px",
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
            <motion.div style={{ marginTop: 40, pointerEvents: "auto" }}
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

          {/* CARDS — absolutely positioned, GSAP handles all transforms
              Each card starts at the same CARD_TOP position;
              initial offsets are applied via gsap.set in useEffect */}
          {PANELS.map((panel, i) => {
            const card = (
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
                  willChange: "transform",
                }}
              >
                <img
                  src={panel.img}
                  alt={panel.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            )

            // No Framer Motion wrapper here — GSAP exclusively owns all
            // card transforms via ScrollTrigger. A dual-animation conflict
            // between Framer Motion and GSAP caused glitches on Vercel.
            return card
          })}

          {/* SCROLL HINT */}
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
              width: 1,
              height: 44,
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
      `}</style>
    </>
  )
}

export default function Hero() {
  return (
    <>
      <div className="block md:hidden"><MobileHero /></div>
      <div className="hidden md:block"><DesktopHero /></div>
    </>
  )
}
