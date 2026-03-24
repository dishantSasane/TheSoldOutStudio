"use client"

import { useEffect, useRef, useState } from "react"

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: "white", paddingTop: "80px", paddingBottom: "80px", width: "100%" }} aria-label="Your source of growth">
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", textAlign: "center", width: "100%" }}>
        {/* Header */}
        <h2
          style={{
            fontFamily: "'madefor-display', 'Sora', sans-serif",
            fontSize: "38px",
            color: "#EB0000",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Your source of growth
        </h2>
        <p
          style={{ 
            color: "#333133", 
            fontFamily: "'madefor-text', sans-serif",
            fontSize: "18px",
            marginTop: "12px"
          }}
        >
          Empowering brands with targeted digital and outdoor advertising
        </p>

        {/* 3-column stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginTop: "4rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease 0ms, transform 0.6s ease 0ms`,
            }}
          >
            <span style={{ display: "block", fontFamily: "'Sora', sans-serif", fontSize: "clamp(5rem, 12vw, 160px)", color: "#EB0000", fontWeight: "bold" }}>
              35%
            </span>
            <span style={{ display: "block", fontSize: "16px", color: "#333133", textAlign: "center", marginTop: "1rem", fontFamily: "'madefor-text', sans-serif" }}>
              ROI growth through strategic OOH ads
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease 150ms, transform 0.6s ease 150ms`,
            }}
          >
            <span style={{ display: "block", fontFamily: "'Sora', sans-serif", fontSize: "clamp(5rem, 12vw, 160px)", color: "#EB0000", fontWeight: "bold" }}>
              10M
            </span>
            <span style={{ display: "block", fontSize: "16px", color: "#333133", textAlign: "center", marginTop: "1rem", fontFamily: "'madefor-text', sans-serif" }}>
              Consumers saw our campaigns in the past year
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s ease 300ms, transform 0.6s ease 300ms`,
            }}
          >
            <span style={{ display: "block", fontFamily: "'Sora', sans-serif", fontSize: "clamp(5rem, 12vw, 160px)", color: "#EB0000", fontWeight: "bold" }}>
              25%
            </span>
            <span style={{ display: "block", fontSize: "16px", color: "#333133", textAlign: "center", marginTop: "1rem", fontFamily: "'madefor-text', sans-serif" }}>
              Increase in conversion rate across various industries
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
