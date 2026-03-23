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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0) // 0–1 within whole section
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
      const progress = Math.min(scrolled / totalScrollable, 1) // 0 → 1
      setScrollProgress(progress)

      // Each video occupies 1/N of the scroll range
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

  // For each video panel, compute its translateY based on scroll progress
  // Panel 0 is always visible. Panel i slides up from bottom when scroll hits its range.
  const getPanelStyle = (i: number) => {
    const N = RIGHT_VIDEOS.length
    const panelStart = i / N        // scroll progress at which this panel starts entering
    const panelActive = (i + 0.35) / N  // fully settled

    if (i === 0) {
      // First panel always fully visible (slides out upward slightly at end)
      const exitStart = (N - 1) / N
      if (scrollProgress >= exitStart) {
        const t = (scrollProgress - exitStart) / (1 / N)
        const y = -t * 6 // subtle upward drift on last video
        return { transform: `translateY(${y}%)`, opacity: 1, zIndex: i + 1 }
      }
      return { transform: "translateY(0%)", opacity: 1, zIndex: i + 1 }
    }

    if (scrollProgress < panelStart) {
      // Not yet — parked below
      return { transform: "translateY(100%)", opacity: 1, zIndex: i + 1 }
    }

    // Entering: progress from 0 → 1 as scrollProgress goes panelStart → panelActive
    const t = Math.min((scrollProgress - panelStart) / (panelActive - panelStart), 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - t, 3)
    const y = (1 - eased) * 100
    return { transform: `translateY(${y}%)`, opacity: 1, zIndex: i + 1 }
  }

  // Progress bar: within the current video's range
  const N = RIGHT_VIDEOS.length
  const segmentSize = 1 / N
  const segmentProgress = (scrollProgress - activeIndex * segmentSize) / segmentSize
  const clampedSegment = Math.max(0, Math.min(segmentProgress, 1))

  return (
    <>
      {/* ─── SECTION 1: Scroll-pinned hero ─── */}
      <section
        ref={sectionRef}
        className="relative w-full bg-white"
        style={{ height: `${(RIGHT_VIDEOS.length + 1) * 100}vh` }}
      >
        {/* Sticky wrapper — fills viewport while scrolling */}
        <div
          className="sticky top-0 flex flex-col md:flex-row w-full overflow-hidden"
          style={{ height: "100vh" }}
        >
          {/* ── Left: text panel ── */}
          <div
            className="flex-shrink-0 flex flex-col justify-center bg-white z-20 relative w-full md:max-w-[50%] h-auto md:h-full px-6 md:px-12 pt-16 pb-10 md:pt-24 md:pb-16"
          >
            <h1
              className="hero-headline font-black uppercase"
              style={{
                color: "var(--sol-red)",
                fontSize: "clamp(2.6rem, 7vw, 7.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
            >
              STEP INTO
              <br />
              THE SPOT-
              <br />
              LIGHT WITH
              <br />
              SOLDOUT!
            </h1>

            <p
              className="hero-sub mt-8"
              style={{ color: "var(--sol-black)", fontWeight: 400, fontSize: "1.15rem" }}
            >
              No one can miss you now
            </p>

            <div className="hero-cta mt-6">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                style={{ backgroundColor: "var(--sol-red)", color: "#fff", fontSize: "0.95rem" }}
              >
                Get a Quote
              </button>
            </div>

            {/* Track indicators */}
            <div className="hidden md:flex flex-col gap-4 mt-14">
              {RIGHT_VIDEOS.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Animated bar */}
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
                        backgroundColor: "var(--sol-red)",
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
                      color: i === activeIndex ? "var(--sol-red)" : "#bbb",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {v.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll hint — fades out after first scroll */}
            <div
              className="absolute bottom-9 left-6 md:left-12 flex items-center"
              style={{
                gap: 10,
                opacity: scrollProgress > 0.05 ? 0 : 1,
                transition: "opacity 0.5s ease",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 40,
                  backgroundColor: "var(--sol-red)",
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

          {/* ── Right: stacking video stage ── */}
          <div
            ref={stageRef}
            className="hidden md:block flex-1 relative overflow-hidden"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            {RIGHT_VIDEOS.map((vid, i) => {
              const panelStyle = getPanelStyle(i)
              const isActive = i === activeIndex

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    willChange: "transform",
                    ...panelStyle,
                  }}
                >
                  {/* Video */}
                  <video
                    src={vid.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      backgroundColor: "#000",
                      display: "block",
                    }}
                  />

                  {/* Bottom gradient for readability */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Red left accent stripe — only on active */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "15%",
                      bottom: "15%",
                      width: 3,
                      backgroundColor: "var(--sol-red)",
                      borderRadius: "0 2px 2px 0",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease 0.2s",
                    }}
                  />

                  {/* Counter — top right */}
                  <div
                    style={{
                      position: "absolute",
                      top: 28,
                      right: 28,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      zIndex: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: 900,
                        color: "var(--sol-red)",
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {vid.counter}
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
                      /{String(RIGHT_VIDEOS.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Label — bottom left */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 36,
                      left: 24,
                      zIndex: 5,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--sol-red)",
                        marginBottom: 4,
                      }}
                    >
                      Now Playing
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {vid.label}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Global progress bar at very bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: "rgba(255,255,255,0.08)",
                zIndex: 20,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${scrollProgress * 100}%`,
                  backgroundColor: "var(--sol-red)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </div>

          {/* ── Mobile: stacked videos ── */}
          <div className="flex md:hidden flex-col w-full gap-4 px-4 pb-8">
            {RIGHT_VIDEOS.map((vid, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#0a0a0a",
                  borderRadius: 12,
                  overflow: "hidden",
                  height: "min(320px, 55vw)",
                  position: "relative",
                }}
              >
                <video
                  src={vid.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: 99,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {vid.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 ─── */}
      <section id="about" className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
        <video
          src="/assets/videos/Mumbai_Most_Premium_Coworking_Space.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.55)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col md:flex-row items-start md:items-end px-6 md:px-10 pb-10 md:pb-12 gap-6 md:gap-8">
          <div className="flex-shrink-0 md:max-w-[560px]">
            <h2
              className="font-black uppercase text-white"
              style={{ fontSize: "clamp(1.3rem, 4.8vw, 3rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              THE CREATIVE FORCE
              <br />
              <span style={{ color: "var(--sol-red)" }}>BEHIND YOUR</span>
              <br />
              {"BRAND'S SUCCESS"}
            </h2>
            <div style={{ marginTop: 16, height: 4, width: 80, backgroundColor: "var(--sol-red)", borderRadius: 2 }} />
          </div>
          <div className="hidden md:flex items-stretch gap-8 ml-auto max-w-[450px]">
            <div style={{ width: 2, flexShrink: 0, backgroundColor: "rgba(255,255,255,0.25)" }} />
            <div className="flex items-center">
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 400 }}>
                This is a space to share more about the business: who&apos;s behind it, what it does and what this site has to offer.
                It&apos;s an opportunity to tell the story behind the business or describe a special service or product it offers.
                You can use this section to share the company&apos;s history or highlight a particular feature that sets it apart from competitors.
              </p>
            </div>
          </div>
          <p className="md:hidden text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            This is a space to share more about the business: who&apos;s behind it, what it does and what this site has to offer.
          </p>
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