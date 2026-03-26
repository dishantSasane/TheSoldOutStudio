"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
gsap.registerPlugin(ScrollTrigger)

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

// Card dimensions — matches Wix reference
// Cards are NOT full screen — they're partial width/height on right side
const CARD_WIDTH = "64vw"   // ~64% of viewport width
const CARD_HEIGHT = "44vh"   // ~68% of viewport height
const CARD_LEFT = "34vw"   // starts at 34% from left (overlaps H1 right edge)
const CARD_TOP = "65vh"   // starts 28% from top (vertically centered-ish)
// Gap between cards = 100vh / N spacing, so white is visible between them

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
              fontSize: "clamp(3.8rem, 18vw, 7.5rem)", 
              lineHeight: 0.88, 
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [segmentFill, setSegmentFill] = useState(0)

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!sectionRef.current) return

    // Set initial states
    gsap.set(cardRefs.current[0], { y: 0, rotateX: 0 })
    for (let i = 1; i < N; i++) {
      gsap.set(cardRefs.current[i], {
        y: "110vh",
        rotateX: 42,
        transformPerspective: 1000,
        transformOrigin: "center bottom",
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

    // Card 0: just moves up, no rotation
    tl.to(cardRefs.current[0], {
      y: "-150vh",
      ease: "none",
      duration: 0.25,
    }, 0)

    // Cards 1-3: enter with rotateX flip then exit up
    for (let i = 1; i < N; i++) {
      tl.to(cardRefs.current[i], {
        y: "0vh",
        rotateX: 0,
        ease: "power2.out",
        duration: 0.25,
      }, (i - 1) * 0.2)
      tl.to(cardRefs.current[i], {
        y: "-150vh",
        ease: "none",
        duration: 0.25,
      }, (i - 1) * 0.2 + 0.25)
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
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
          height: "900vh",
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
            }}
          >
            <motion.h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                color: "#EB0000",
                fontSize: "clamp(4rem, 12.5vw, 155px)",
                lineHeight: 0.86,
                textTransform: "uppercase",
                hyphens: "none",
                wordBreak: "keep-all",
                margin: 0,
                width: "85%",
                letterSpacing: "-0.04em",
              }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              STEP INTO THE<br />
              SPOTLIGHT WITH<br />
              SOLDOUT!
            </motion.h1>
            <motion.p style={{
              marginTop: 28,
              fontSize: 22,
              color: "#EB0000",
              fontWeight: 700,
              fontFamily: "'Sora', sans-serif",
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
                  padding: "16px 48px",
                  borderRadius: 999,
                  border: "none",
                  color: "#FFFFFF",
                  backgroundColor: "#EB0000",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
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

            if (i === 0) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
                >
                  {card}
                </motion.div>
              )
            }

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
