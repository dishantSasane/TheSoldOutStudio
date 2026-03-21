"use client"

import { useEffect, useRef, useState } from "react"

const services = [
  { num: "01", title: "Billboards & Large Format Displays", desc: "Command attention at scale with strategic placements in high-traffic locations." },
  { num: "02", title: "Transit Advertising", desc: "Reach commuters and travellers with bold messaging across buses, metros, and stations." },
  { num: "03", title: "Place-Based Advertising", desc: "Targeted ads in gyms, malls, offices, and entertainment venues your audience frequents." },
  { num: "04", title: "Digital Out-of-Home (OOH)", desc: "Dynamic, data-driven digital displays that adapt to audience, time, and context." },
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
      className="w-full py-24"
      style={{ backgroundColor: "var(--sol-black)" }}
      aria-label="Our services"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
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
            A Full Spectrum of Services to Reach Your Target Audience
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--sol-light-grey)" }}>
            From strategy to execution, we bring campaigns that deliver
          </p>
        </div>

        <div>
          {services.map((svc, i) => (
            <div
              key={svc.num}
              className="service-item flex items-start gap-6 py-8 px-4"
              style={{
                borderTop: "1px solid var(--sol-border-dark)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 150}ms, transform 0.5s ease ${i * 150}ms`,
              }}
            >
              <span
                className="font-black flex-shrink-0 leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--sol-red)", minWidth: 64 }}
              >
                {svc.num}
              </span>
              <div className="pt-1">
                <h3 className="font-bold text-xl" style={{ color: "var(--sol-white)" }}>{svc.title}</h3>
                <p className="mt-2 text-base leading-relaxed" style={{ color: "var(--sol-light-grey)" }}>{svc.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--sol-border-dark)", opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${services.length * 150}ms` }} />
        </div>

        <div className="mt-12 text-center" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${services.length * 150 + 100}ms` }}>
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
