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
   Original scroll-pinned stacking video experience
───────────────────────────────────────────── */
function DesktopHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
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
      const N = RIGHT_VIDEOS.length
      const idx = Math.min(Math.floor(progress * N), N - 1)
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

  const getPanelStyle = (i: number) => {
    const N = RIGHT_VIDEOS.length
    const panelStart = i / N
    const panelActive = (i + 0.35) / N
    if (i === 0) {
      const exitStart = (N - 1) / N
      if (scrollProgress >= exitStart) {
        const t = (scrollProgress - exitStart) / (1 / N)
        return { transform: `translateY(${-t * 6}%)`, opacity: 1, zIndex: i + 1 }
      }
      return { transform: "translateY(0%)", opacity: 1, zIndex: i + 1 }
    }
    if (scrollProgress < panelStart) return { transform: "translateY(100%)", opacity: 1, zIndex: i + 1 }
    const t = Math.min((scrollProgress - panelStart) / (panelActive - panelStart), 1)
    const eased = 1 - Math.pow(1 - t, 3)
    return { transform: `translateY(${(1 - eased) * 100}%)`, opacity: 1, zIndex: i + 1 }
  }

  const N = RIGHT_VIDEOS.length
  const segmentSize = 1 / N
  const segmentProgress = (scrollProgress - activeIndex * segmentSize) / segmentSize
  const clampedSegment = Math.max(0, Math.min(segmentProgress, 1))

  return (
    <>
      {/* ─── Desktop sticky hero ─── */}
      {/* Outer scroll track: 500vh gives ~166vh per video for smooth reveal */}
      <section
        ref={sectionRef}
        style={{ position: "relative", width: "100%", height: "500vh" }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {/* ── Left text panel ── */}
          <div
            style={{
              width: "50%",
              height: "100vh",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "5vw",
              paddingRight: "3vw",
              position: "relative",
              zIndex: 20,
              flexShrink: 0,
            }}
          >
            <h1
              className="hero-headline"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                color: "#EB0000",
                fontSize: "clamp(4.5rem, 9vw, 130px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                hyphens: "none",
                wordBreak: "keep-all",
                margin: 0,
              }}
            >
              STEP INTO THE SPOTLIGHT WITH SOLDOUT!
            </h1>

            <p
              className="hero-sub"
              style={{
                marginTop: 20,
                fontSize: 18,
                color: "#333133",
                fontWeight: 400,
              }}
            >
              No one can miss you now
            </p>

            <div className="hero-cta" style={{ marginTop: 32 }}>
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

            {/* Track indicators */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 56 }}>
              {RIGHT_VIDEOS.map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 32, height: 3, borderRadius: 2, backgroundColor: "#eee", overflow: "hidden", flexShrink: 0 }}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        backgroundColor: "#EB0000",
                        width: i < activeIndex ? "100%" : i === activeIndex ? `${clampedSegment * 100}%` : "0%",
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
                    {v.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                left: "5vw",
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: scrollProgress > 0.05 ? 0 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              <div style={{ width: 1, height: 40, backgroundColor: "#EB0000", animation: "scrollPulse 1.4s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999" }}>
                Scroll
              </span>
            </div>
          </div>

          {/* ── Right stacking video stage ── */}
          <div
            ref={stageRef}
            style={{
              width: "50%",
              height: "100vh",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {RIGHT_VIDEOS.map((vid, i) => {
              const panelStyle = getPanelStyle(i)
              const isActive = i === activeIndex
              return (
                <div key={i} style={{ position: "absolute", inset: 0, willChange: "transform", ...panelStyle }}>
                  <video
                    src={vid.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 3, backgroundColor: "#EB0000", borderRadius: "0 2px 2px 0", opacity: isActive ? 1 : 0, transition: "opacity 0.4s ease 0.2s" }} />
                  <div style={{ position: "absolute", top: 28, right: 28, display: "flex", alignItems: "baseline", gap: 4, zIndex: 5 }}>
                    <span style={{ fontSize: "2.2rem", fontWeight: 900, color: "#EB0000", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{vid.counter}</span>
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>/{String(RIGHT_VIDEOS.length).padStart(2, "0")}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 36, left: 24, zIndex: 5 }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#EB0000", marginBottom: 4 }}>Now Playing</p>
                    <p style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em" }}>{vid.label}</p>
                  </div>
                </div>
              )
            })}
            {/* Overall progress bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, backgroundColor: "rgba(255,255,255,0.08)", zIndex: 20 }}>
              <div style={{ height: "100%", width: `${scrollProgress * 100}%`, backgroundColor: "#EB0000", transition: "width 0.05s linear" }} />
            </div>
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