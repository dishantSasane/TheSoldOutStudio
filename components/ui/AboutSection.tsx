"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   MOBILE about section (< md)
───────────────────────────────────────────── */
function MobileAbout() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{ height: "70svh", minHeight: 420 }}
    >
      <video
        src="/assets/videos/Mumbai_Most_Premium_Coworking_Space_optimized.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.5)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="font-black uppercase text-white"
          style={{
            fontSize: "clamp(1.6rem, 7vw, 2.6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            backgroundColor: "#EB0000",
            padding: "16px 24px",
            display: "inline-block",
            fontFamily: "Arial, sans-serif"
          }}
        >
          THE CREATIVE FORCE
          <br />
          BEHIND YOUR
          <br />
          BRAND&apos;S SUCCESS
        </h2>
        <div style={{ marginTop: 12 }} />
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
          We&apos;re not just another marketing agency — we&apos;re your content and growth partner. At SoldOut, we create high-impact content and manage your entire social presence from end to end.
        </p>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   DESKTOP about section (>= md)
───────────────────────────────────────────── */
function DesktopAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !boxRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true, // Fixes the video in place
      }
    })

    // Set initial position lower down
    gsap.set(boxRef.current, { y: "30vh" })

    // Smooth linear translation as you scroll
    tl.to(boxRef.current, {
      y: "-100vh",
      ease: "none",
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
      <video
        src="/assets/videos/Mumbai_Most_Premium_Coworking_Space_optimized.mp4"
        autoPlay loop muted playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.55)" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end px-10 pb-12 gap-8">
        {/* Left: red box / heading */}
        <motion.div
          style={{ flex: "0 0 auto", maxWidth: 540 }}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-black uppercase text-white" style={{ 
            fontSize: "clamp(1.8rem, 4.8vw, 3.4rem)", 
            lineHeight: 0.98, 
            letterSpacing: "-0.03em",
            backgroundColor: "#EB0000",
            padding: "24px 32px",
            display: "inline-block",
            fontFamily: "Arial, sans-serif"
          }}>
            THE CREATIVE FORCE
            <br />
            BEHIND YOUR
            <br />
            BRAND&apos;S SUCCESS
          </h2>
          <div style={{ marginTop: 16 }} />
        </motion.div>

        {/* Right: text content */}
        <div 
          ref={boxRef}
          className="ml-auto max-w-[480px] flex flex-col justify-center gap-4"
          style={{ 
            backgroundColor: "#FFFFFF", 
            padding: "40px", 
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            zIndex: 20
          }}
        >
          <motion.p
            style={{ color: "#333333", fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 500 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            We&apos;re not just another marketing agency — we&apos;re your content and growth partner.
          </motion.p>
          <motion.p
            style={{ color: "#555555", fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 400 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            At SoldOut, we create high-impact content and manage your entire social presence from end to end. From shooting scroll-stopping visuals to planning, posting, and optimizing your content — everything is built to grow your brand consistently.
          </motion.p>
          <motion.p
            style={{ color: "#555555", fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 400 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            We&apos;ve worked across industries including businesses, education, industrial projects, podcasts, and international content — adapting strategies that actually work for your audience.
          </motion.p>
          <motion.p
            style={{ color: "#333333", fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 700 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            If your brand needs attention, consistency, and real growth — we make it happen.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <>
      {/* Mobile only */}
      <div className="block md:hidden">
        <MobileAbout />
      </div>
      {/* Desktop only */}
      <div className="hidden md:block">
        <DesktopAbout />
      </div>
    </>
  )
}
