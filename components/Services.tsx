"use client"

import { useEffect, useRef, useState } from "react"

const services = [
  {
    num: "01",
    title: "Content Production",
    tagline: "High-quality content tailored to your brand.",
    desc: "We handle end-to-end shoots including reels, brand videos, podcasts, and commercial content across industries — from schools and education to industrial and international projects.",
  },
  {
    num: "02",
    title: "Creative & Advanced Media",
    tagline: "Content that stands out in a crowded digital space.",
    desc: "From animations and AI-generated visuals to creative storytelling formats, we produce content designed to capture attention and elevate your brand identity.",
  },
  {
    num: "03",
    title: "Social Media Management",
    tagline: "Consistency that builds authority.",
    desc: "We manage your social media platforms end-to-end — from content planning and posting to audience engagement and brand positioning.",
  },
  {
    num: "04",
    title: "Content Strategy & Optimization",
    tagline: "Not just posting — strategic growth.",
    desc: "We schedule content, optimize your pages, and refine performance to ensure maximum reach, engagement, and long-term growth.",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-20 md:py-24"
      style={{ backgroundColor: "var(--sol-black)" }}
      aria-label="Our services"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-black uppercase"
            style={{
              color: "var(--sol-white)",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            End-to-End Content &amp; Social Media Solutions
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: "var(--sol-light-grey)" }}>
            We create, manage, and scale your digital presence with high-quality content and strategic execution.
          </p>
        </div>

        {/* Service list */}
        <div>
          {services.map((svc, i) => (
            <div
              key={svc.num}
              className="service-item flex items-start gap-5 md:gap-6 py-7 md:py-8 px-2 md:px-4"
              style={{
                borderTop: "1px solid var(--sol-border-dark)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 150}ms, transform 0.5s ease ${i * 150}ms`,
              }}
            >
              <span
                className="font-black flex-shrink-0 leading-none"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "var(--sol-red)", minWidth: 56 }}
              >
                {svc.num}
              </span>
              <div className="pt-1">
                <h3 className="font-bold text-lg md:text-xl" style={{ color: "var(--sol-white)" }}>{svc.title}</h3>
                <p className="mt-1 text-sm md:text-base font-semibold italic" style={{ color: "var(--sol-red)" }}>{svc.tagline}</p>
                <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "var(--sol-light-grey)" }}>{svc.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--sol-border-dark)", opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${services.length * 150}ms` }} />
        </div>

        {/* Bottom upgrade line */}
        <div
          className="mt-12 text-center"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${services.length * 150 + 100}ms` }}
        >
          <p className="text-base md:text-lg font-semibold italic mb-6" style={{ color: "var(--sol-light-grey)" }}>
            From shooting to scaling — we handle everything your brand needs to grow online.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-3 text-sm font-semibold rounded-full border transition-all hover:bg-white hover:text-black"
            style={{ color: "var(--sol-white)", borderColor: "var(--sol-white)" }}
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  )
}
