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
      className="w-full min-h-screen overflow-hidden block py-8 md:py-12 flex flex-col justify-center"
      style={{ backgroundColor: "#EB0000", minHeight: "100vh" }}
      aria-label="Our services"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="font-black uppercase"
            style={{
              color: "#FFFFFF",
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            A FULL SPECTRUM OF SERVICES TO REACH YOUR TARGET AUDIENCE
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: "#FFFFFF" }}>
            From strategy to execution, we bring campaigns that deliver
          </p>
        </div>

        {/* Service list */}
        <div>
          {services.map((svc, i) => (
            <div
              key={svc.num}
              className="service-item flex items-start gap-5 md:gap-6 py-4 px-2 md:px-4"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.2)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 150}ms, transform 0.5s ease ${i * 150}ms`,
              }}
            >
              <span
                className="font-black flex-shrink-0 leading-none"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "#FFFFFF", minWidth: 56 }}
              >
                {svc.num}
              </span>
              <div className="pt-1">
                <h3 className="font-bold text-lg md:text-xl" style={{ color: "#FFFFFF" }}>{svc.title}</h3>
                <p className="mt-1 text-sm md:text-base font-semibold italic" style={{ color: "#FFFFFF" }}>{svc.tagline}</p>
                <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{svc.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${services.length * 150}ms` }} />
        </div>
      </div>
    </section>
  )
}
