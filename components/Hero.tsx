"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const RIGHT_VIDEOS = [
  {
    src: "/assets/videos/Mumbai_2.0.mp4",
    label: "Mumbai 2.0",
    counter: "01",
  },
  {
    src: "/assets/videos/Copy_of_Mexican_Lounge.mp4",
    label: "Mexican Lounge",
    counter: "02",
  },
  {
    src: "/assets/videos/The_Emirates_Experience.mp4",
    label: "The Emirates Experience",
    counter: "03",
  },
]

// 4 panels for the desktop scroll experience (placeholders until horizontal videos added)
const PANELS = [
  { label: "Mumbai 2.0",              counter: "01" },
  { label: "Mexican Lounge",          counter: "02" },
  { label: "The Emirates Experience", counter: "03" },
  { label: "Mumbai Premium",          counter: "04" },
]

/* ─────────────────────────────────────────────
   MOBILE HERO  (shown only on < md screens)
   Full-screen video background + text overlay,
   then a "Our Work" reel below
───────────────────────────────────────────── */
function MobileHero() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ── Splash screen ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 560 }}>
        {/* Video background */}
        <video
          src={RIGHT_VIDEOS[0].src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-16">
          <h1
            className="font-black uppercase text-white hero-headline"
            style={{
              fontSize: "clamp(3.2rem, 16vw, 6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            STEP INTO
            <br />
            <span style={{ color: "var(--sol-red)" }}>THE SPOT-</span>
            <br />
            LIGHT WITH
            <br />
            SOLDOUT!
          </h1>

          <p
            className="hero-sub mt-5 text-base font-medium"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Don&apos;t worry, It&apos;s already SoldOut.
          </p>

          <div className="hero-cta mt-6">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-white text-sm transition-transform active:scale-95"
              style={{ backgroundColor: "var(--sol-red)" }}
            >
              Start Your Growth
            </button>
          </div>

          {/* Video label pill */}
          <div
            className="absolute top-5 right-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--sol-red)" }}
            />
            <span className="text-white text-xs font-semibold uppercase tracking-widest">
              {RIGHT_VIDEOS[0].label}
            </span>
          </div>
        </div>
      </section>

      {/* ── Our Work reel ── */}
      <section className="w-full py-14" style={{ backgroundColor: "var(--sol-black)" }}>
        <div className="px-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--sol-red)" }}>
            Our Work
          </p>
          <h2 className="font-black text-white uppercase text-2xl leading-tight">
            Campaigns That<br />Command Attention
          </h2>
        </div>

        <div className="flex flex-col gap-3 px-4">
          {RIGHT_VIDEOS.map((vid, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "9/5.5", backgroundColor: "#111" }}
            >
              <video
                src={vid.src}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }}
              />
              {/* Counter */}
              <div className="absolute top-3 right-4 z-10">
                <span className="font-black text-xl" style={{ color: "var(--sol-red)", fontVariantNumeric: "tabular-nums" }}>
                  {vid.counter}
                </span>
                <span className="text-xs ml-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  /{String(RIGHT_VIDEOS.length).padStart(2, "0")}
                </span>
              </div>
              {/* Label */}
              <div className="absolute bottom-3 left-4 z-10">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--sol-red)" }}>
                  Now Playing
                </p>
                <p className="text-sm font-black text-white uppercase tracking-wide">
                  {vid.label}
                </p>
              </div>
              {/* Left accent stripe */}
              <div
                className="absolute left-0 top-[15%] bottom-[15%] rounded-r"
                style={{ width: 3, backgroundColor: "var(--sol-red)" }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ─────────────────────────────────────────────
   DESKTOP HERO  (shown only on >= md screens)
   Wix-style scroll-driven 3D perspective stack:
   sticky viewport, text overlay left, 4 panels
   right that animate in with matrix3d tilt.
───────────────────────────────────────────── */
function DesktopHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
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
      setScrollProgress(progress)
      const idx = Math.min(Math.floor(progress * PANELS.length), PANELS.length - 1)
      setActiveIndex(idx)
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

  // Wix-style 3D perspective transform based on per-panel scroll progress.
  // progress < 0  → panel is below, hidden (tilted perspective position)
  // progress 0→1  → panel enters: perspective tilt flattens to none
  // progress > 1  → panel exits upward as next panel pushes in
  const getPanelTransform = (progress: number): { transform: string; opacity: number } => {
    if (progress <= 0) {
      // Below viewport — tilted, hidden when fully out of range
      const ty = 100 - progress * 100   // 100% at progress=0, grows larger below
      const rx = 25 - progress * 25      // 25deg at progress=0
      const sc = Math.max(0, 0.85 + progress * 0.15)
      return {
        transform: `perspective(1200px) translateY(${ty}%) rotateX(${rx}deg) scale(${sc})`,
        opacity: progress < -0.05 ? 0 : 1,
      }
    }
    if (progress >= 1) {
      // Fully in place; exit upward as subsequent panel arrives
      const exitT = progress - 1  // 0 at in-place → 1 when next panel is fully in
      if (exitT > 0) {
        return { transform: `translateY(${-exitT * 100}%)`, opacity: 1 }
      }
      return { transform: "none", opacity: 1 }
    }
    // Entering: ease-out cubic interpolation from tilted/below → flat
    const eased = 1 - Math.pow(1 - progress, 3)
    const ty = (1 - eased) * 60
    const rx = (1 - eased) * 25
    const sc = 0.85 + eased * 0.15
    return {
      transform: `perspective(1200px) translateY(${ty}%) rotateX(${rx}deg) scale(${sc})`,
      opacity: 1,
    }
  }

  const N = PANELS.length
  const segmentProgress = scrollProgress * N - activeIndex
  const clampedSegment = Math.max(0, Math.min(segmentProgress, 1))

  return (
    <>
      {/*
        Outer scroll track: 600vh = 6× viewport.
        4 panels × 150vh each gives smooth per-panel transitions.
        NOTE: overflow-x clips horizontal bleed from 3D transforms;
        overflow-y must stay visible so position:sticky works on the child.
      */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "600vh",
          backgroundColor: "#ffffff",
          overflowX: "hidden",
        }}
      >
        {/* ── Sticky viewport — stays at top while section scrolls ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
          }}
        >
          {/* ── Video / panel stack — right side ── */}
          <div
            style={{
              position: "absolute",
              left: "33vw",
              top: 0,
              width: "67vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            {PANELS.map((panel, i) => {
              const videoProgress = scrollProgress * N - i
              const { transform, opacity } = getPanelTransform(videoProgress)
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    willChange: "transform",
                    transform,
                    opacity,
                    // Placeholder: swap for <video> when landscape files are ready
                    backgroundColor: "#F0F0F0",
                  }}
                />
              )
            })}
          </div>

          {/* ── Left text panel — overlays videos, pointer-events:none on text ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              zIndex: 2,
              padding: "80px 0 0 4vw",
              pointerEvents: "none",
            }}
          >
            <h1
              className="hero-headline"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                color: "#EB0000",
                fontSize: "clamp(4.5rem, 10vw, 140px)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                hyphens: "none",
                wordBreak: "keep-all",
                margin: 0,
                width: "65%",
                pointerEvents: "none",
              }}
            >
              STEP INTO THE SPOTLIGHT WITH SOLDOUT!
            </h1>

            <p
              className="hero-sub"
              style={{
                marginTop: 24,
                fontSize: 18,
                color: "#333133",
                fontWeight: 400,
              }}
            >
              No one can miss you now
            </p>

            <div
              className="hero-cta"
              style={{ marginTop: 32, pointerEvents: "auto" }}
            >
              <button
                onClick={scrollToContact}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 32px",
                  borderRadius: 999,
                  border: "2px solid #EB0000",
                  color: "#EB0000",
                  backgroundColor: "transparent",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "#EB0000"
                  e.currentTarget.style.color = "#FFFFFF"
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

          {/* ── Progress indicators — bottom left ── */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "4vw",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              pointerEvents: "none",
            }}
          >
            {PANELS.map((panel, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#eee",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: "#EB0000",
                      width:
                        i < activeIndex
                          ? "100%"
                          : i === activeIndex
                          ? `${clampedSegment * 100}%`
                          : "0%",
                      transition: i === activeIndex ? "none" : "width 0.4s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: i === activeIndex ? "#EB0000" : "#bbb",
                    transition: "color 0.4s ease",
                  }}
                >
                  {panel.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Scroll hint — fades out after first scroll ── */}
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: "5vw",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 3,
              opacity: scrollProgress > 0.05 ? 0 : 1,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 1,
                height: 40,
                backgroundColor: "#EB0000",
                animation: "scrollPulse 1.4s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#999",
              }}
            >
              Scroll
            </span>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.6); opacity: 0.4; }
        }
      `}</style>
    </>
  )
}

/* ─────────────────────────────────────────────
   ROOT EXPORT — renders the right layout per breakpoint
───────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      {/* Mobile only */}
      <div className="block md:hidden">
        <MobileHero />
      </div>
      {/* Desktop only */}
      <div className="hidden md:block">
        <DesktopHero />
      </div>
    </>
  )
}
