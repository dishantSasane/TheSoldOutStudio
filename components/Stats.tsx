"use client"

import { useEffect, useRef, useState } from "react"

const pillars = [
  {
    icon: "🎯",
    title: "Content That Converts",
    desc: "We create content designed to grab attention and turn viewers into customers.",
  },
  {
    icon: "📅",
    title: "Consistency That Builds Brands",
    desc: "Regular posting and strategic execution to keep your brand active and growing.",
  },
  {
    icon: "📈",
    title: "Growth-Focused Approach",
    desc: "Everything we do — from shoots to posting — is focused on reach, engagement, and results.",
  },
]

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
    <section ref={sectionRef} className="w-full py-20 md:py-28 bg-white" aria-label="Why brands choose us">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Header */}
        <h2
          className="font-black uppercase"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            color: "var(--sol-black)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Why Brands Choose Us
        </h2>
        <p className="mt-3 text-base md:text-lg" style={{ color: "#555" }}>
          We focus on consistency, creativity, and growth that actually matters.
        </p>

        {/* Red accent line */}
        <div className="mx-auto mt-6 mb-14" style={{ width: 60, height: 4, backgroundColor: "var(--sol-red)", borderRadius: 2 }} />

        {/* 3-column pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-left">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="flex flex-col gap-4 p-7 rounded-2xl border"
              style={{
                borderColor: "#eee",
                backgroundColor: "#fafafa",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.55s ease ${i * 140}ms, transform 0.55s ease ${i * 140}ms`,
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl flex-shrink-0"
                style={{ backgroundColor: "var(--sol-red)" }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="font-black text-lg md:text-xl leading-tight" style={{ color: "var(--sol-black)" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "#666" }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
