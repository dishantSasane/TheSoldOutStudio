"use client"
import { useEffect, useRef, useState, useCallback } from "react"

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
const CARD_GAP = 80     // 80vh gap between staggered cards
// Gap between cards = 100vh / N spacing, so white is visible between them

/* ─── MOBILE ─── */
function MobileHero() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 560 }}>
        <video src={RIGHT_VIDEOS[0].src} autoPlay loop muted playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" }} />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-16">
          <h1 className="font-black uppercase text-white"
            style={{ fontSize: "clamp(3.2rem, 16vw, 6rem)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            STEP INTO<br />
            <span style={{ color: "#EB0000" }}>THE SPOT-</span><br />
            LIGHT WITH<br />SOLDOUT!
          </h1>
          <p className="mt-5 text-base font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
            No one can miss you now
          </p>
          <div className="mt-6">
            <button onClick={scrollToContact}
              className="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-white text-sm"
              style={{ backgroundColor: "#EB0000" }}>
              Get a Quote
            </button>
          </div>
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [rawProgress, setRawProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const totalScrollable = section.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(scrolled / totalScrollable, 1)
      setRawProgress(progress)
      setActiveIndex(Math.min(Math.floor(progress * N), N - 1))
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onScroll])

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // pos = card's personal scroll position
  // pos < 0        → parked below viewport
  // pos 0 → 1      → ENTERING  (card 0: just translateY, cards 1-3: rotateX flip + translateY)
  // pos 1 → 2      → IN PLACE and starting to EXIT (plain translateY upward)
  // pos > 2        → gone above viewport
  //
  // KEY: gap between cards is NATURAL — each card is CARD_HEIGHT tall (~68vh)
  // and each card gets 1 full viewport-height of scroll space
  // So at any moment during transition, white space is visible above/below each card
  // The H1 text shows through these white gaps — this is the Wix look
  const getTransform = (index: number): { transform: string; zIndex: number } => {
    const pos = rawProgress * N - index

    // Card 0 — flat on load, exits plain up
    if (index === 0) {
      if (pos <= 1) {
        return { transform: "none", zIndex: N - index }
      }
      const exitFraction = Math.min(pos - 1, 1)
      return {
        transform: `translateY(${exitFraction * -150}%)`,
        zIndex: N - index,
      }
    }

    // Cards 1-3
    if (pos <= 0) {
      const distance = (1 - pos) * CARD_GAP
      return {
        transform: `perspective(1000px) translateY(${distance}vh) rotateX(42deg)`,
        zIndex: N - index, // lower index = higher z = front of stack
      }
    }

    if (pos < 1) {
      const e = 1 - Math.pow(1 - pos, 3)
      return {
        transform: `perspective(1000px) translateY(${(1-e)*CARD_GAP}vh) rotateX(${(1-e)*42}deg)`,
        zIndex: N - index,
      }
    }

    if (pos < 2) {
      const exitFraction = pos - 1
      return {
        transform: `translateY(${exitFraction * -150}%)`,
        zIndex: N - index,
      }
    }

    return {
      transform: "translateY(-155%)",
      zIndex: N - index,
    }
  }

  const segmentFill = Math.max(0, Math.min((rawProgress * N - activeIndex) * 100, 100))

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
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "4vw",
              pointerEvents: "none",
            }}
          >
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                color: "#EB0000",
                fontSize: "clamp(3.8rem, 9.5vw, 130px)",
                lineHeight: 0.91,
                textTransform: "uppercase",
                hyphens: "none",
                wordBreak: "keep-all",
                margin: 0,
                width: "58%",
                letterSpacing: "-0.02em",
              }}
            >
              STEP INTO THE SPOTLIGHT WITH SOLDOUT!
            </h1>
            <p style={{
              marginTop: 28,
              fontSize: 17,
              color: "#333133",
              fontWeight: 400,
              fontFamily: "'Sora', sans-serif",
            }}>
              No one can miss you now
            </p>
            <div style={{ marginTop: 32, pointerEvents: "auto" }}>
              <button
                onClick={scrollToContact}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "13px 34px",
                  borderRadius: 999,
                  border: "2px solid #EB0000",
                  color: "#EB0000",
                  backgroundColor: "transparent",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                  transition: "background-color 0.25s, color 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "#EB0000"
                  e.currentTarget.style.color = "#fff"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#EB0000"
                }}
              >
                Get a Quote
              </button>
            </div>
          </div>

          {/* CARDS — positioned individually, NOT in a shared container
              This is key — each card is absolutely positioned in the sticky
              viewport directly, using CARD_LEFT/TOP/WIDTH/HEIGHT
              z-index is ABOVE text (2), so cards overlay H1
              White space between cards shows H1 through the gaps */}
          {PANELS.map((panel, i) => {
            const { transform, zIndex } = getTransform(i)
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: CARD_LEFT,
                  top: CARD_TOP,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  zIndex: zIndex,
                  overflow: "hidden",
                  willChange: "transform",
                  transformOrigin: "center top",
                  transform: transform,
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
          })}

          {/* PROGRESS INDICATORS — z-index 40, above everything */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "4vw",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              pointerEvents: "none",
            }}
          >
            {PANELS.map((panel, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 2, borderRadius: 2,
                  backgroundColor: "rgba(0,0,0,0.12)",
                  overflow: "hidden", flexShrink: 0,
                }}>
                  <div style={{
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: "#EB0000",
                    width:
                      i < activeIndex ? "100%"
                        : i === activeIndex ? `${segmentFill}%`
                          : "0%",
                    transition: i === activeIndex ? "none" : "width 0.3s ease",
                  }} />
                </div>
                <span style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: i === activeIndex ? "#EB0000" : "#bbb",
                  transition: "color 0.3s ease",
                  fontFamily: "'Sora', sans-serif",
                }}>
                  {panel.label}
                </span>
              </div>
            ))}
          </div>

          {/* SCROLL HINT */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: "4vw",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: rawProgress > 0.03 ? 0 : 1,
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