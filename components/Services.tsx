"use client"

import { motion } from "framer-motion"

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
  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="services"
      style={{ backgroundColor: "#EB0000", width: "100%", padding: "80px 0", fontFamily: "Arial, sans-serif" }}
      aria-label="Our services"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>
        {/* Header */}
        <motion.h2
          className="font-black uppercase"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(1.6rem, 3.5vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 720,
            marginBottom: "clamp(32px, 6vw, 64px)",
          }}
        >
          A FULL SPECTRUM OF SERVICES<br />TO REACH YOUR TARGET AUDIENCE
        </motion.h2>

        {/* Service list */}
        <div>
          {services.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderTop: "1.5px solid rgba(255,255,255,0.3)",
                padding: "clamp(20px, 4vw, 36px) 0",
                display: "flex",
                alignItems: "flex-start",
                gap: "clamp(20px, 4vw, 52px)",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontWeight: 900,
                  flexShrink: 0,
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                  minWidth: "clamp(40px, 5vw, 64px)",
                }}
              >
                {svc.num}
              </span>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  className="font-black uppercase"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                    marginBottom: 8,
                  }}
                >
                  {svc.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.6 }}>
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1.5px solid rgba(255,255,255,0.3)" }} />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          style={{ marginTop: "clamp(32px, 5vw, 52px)", textAlign: "center" }}
        >
          <button
            onClick={scrollToContact}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 44px",
              borderRadius: 9999,
              border: "2.5px solid #FFFFFF",
              color: "#EB0000",
              backgroundColor: "#FFFFFF",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.22s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#FFFFFF"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#FFFFFF"
              e.currentTarget.style.color = "#EB0000"
            }}
          >
            Contact Us Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}
