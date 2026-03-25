"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 35, suffix: "%", delay: 0.1, label: "ROI growth through strategic OOH ads" },
  { target: 10, suffix: "M", delay: 0.2, label: "Consumers saw our campaigns in the past year" },
  { target: 25, suffix: "%", delay: 0.3, label: "Increase in conversion rate across various industries" },
]

export default function Stats() {
  const ref35 = useRef<HTMLSpanElement>(null)
  const ref10 = useRef<HTMLSpanElement>(null)  
  const ref25 = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const counters = [
      { ref: ref35.current, target: 35, suffix: "%" },
      { ref: ref10.current, target: 10, suffix: "M" },
      { ref: ref25.current, target: 25, suffix: "%" },
    ]
    counters.forEach(({ ref, target, suffix }) => {
      if (!ref) return
      gsap.fromTo(
        ref,
        { textContent: "0" + suffix },
        {
          textContent: target + suffix,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            once: true,
          },
          onUpdate: function(this: any) {
            const val = Math.round(
              parseFloat(this.targets()[0].textContent)
            )
            ref.textContent = val + suffix
          }
        }
      )
    })
  }, [])

  return (
    <section style={{ backgroundColor: "white", paddingTop: "80px", paddingBottom: "80px", width: "100%" }} aria-label="Your source of growth">
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", textAlign: "center", width: "100%" }}>
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "'madefor-display', 'Sora', sans-serif",
            fontSize: "38px",
            color: "#EB0000",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Your source of growth
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          style={{
            color: "#333133",
            fontFamily: "'madefor-text', sans-serif",
            fontSize: "18px",
            marginTop: "12px",
          }}
        >
          Empowering brands with targeted digital and outdoor advertising
        </motion.p>

        {/* 3-column stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginTop: "4rem" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: stat.delay, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <span 
                ref={i === 0 ? ref35 : i === 1 ? ref10 : ref25}
                style={{ display: "block", fontFamily: "'Sora', sans-serif", fontSize: "clamp(5rem, 12vw, 160px)", color: "#EB0000", fontWeight: "bold" }}
              >
                0{stat.suffix}
              </span>
              <span style={{ display: "block", fontSize: "16px", color: "#333133", textAlign: "center", marginTop: "1rem", fontFamily: "'madefor-text', sans-serif" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
