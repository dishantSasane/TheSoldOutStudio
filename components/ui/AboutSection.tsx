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
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRef    = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return

    // Initial hidden state — 3D tilt + blur (mirrors Hero H1)
    gsap.set(headingRef.current, {
      opacity: 0,
      y: 40,
      rotationX: 40,
      rotationY: -15,
      transformPerspective: 800,
      transformOrigin: "left center",
      scale: 0.95,
      filter: "blur(8px)",
    })
    if (paraRef.current) {
      gsap.set(paraRef.current, { opacity: 0, y: 20 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end:   "top 20%",
        scrub: 1,          // plays forward on scroll down, reverses on scroll up
      },
    })

    // Phase 1 — fade in, rise, 3D overshoot, blur to 2px
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      rotationX: -5,
      rotationY: 5,
      scale: 1.02,
      filter: "blur(2px)",
      duration: 0.65,
      ease: "power3.out",
    }, 0)

    // Phase 2 — snap flat, scale back, clear blur
    tl.to(headingRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.35,
      ease: "power2.inOut",
    })

    // Paragraph fades in during phase 1 with a slight delay
    if (paraRef.current) {
      tl.to(paraRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0.2)
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
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
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8"
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      >
        <h2
          ref={headingRef}
          className="font-black uppercase text-white"
          style={{
            fontSize: "clamp(1.6rem, 7vw, 2.6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            backgroundColor: "#EB0000",
            padding: "16px 24px",
            display: "inline-block",
            fontFamily: "Arial, sans-serif",
          }}
        >
          THE CREATIVE FORCE
          <br />
          BEHIND YOUR
          <br />
          BRAND&apos;S SUCCESS
        </h2>
        <div style={{ marginTop: 12 }} />
        <p
          ref={paraRef}
          className="mt-4 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          We&apos;re not just another marketing agency — we&apos;re your content and growth partner. At SoldOut, we create high-impact content and manage your entire social presence from end to end.
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   DESKTOP about section (>= md)
───────────────────────────────────────────── */
function DesktopAbout() {
  const sectionRef  = useRef<HTMLElement>(null)
  const boxRef      = useRef<HTMLDivElement>(null)
  const redBoxRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !boxRef.current || !redBoxRef.current) return

    // Red box — initial hidden state (3D tilt + blur)
    gsap.set(redBoxRef.current, {
      opacity: 0,
      y: 40,
      rotationX: 40,
      rotationY: -15,
      transformPerspective: 800,
      transformOrigin: "left center",
      scale: 0.95,
    })

    // White box — starts lower, scrolls up
    gsap.set(boxRef.current, { y: "30vh" })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: true,
      }
    })

    // Red box Phase 1 — twist in (0 → 0.65)
    tl.to(redBoxRef.current, {
      opacity: 1,
      y: 0,
      rotationX: -5,
      rotationY: 5,
      scale: 1.02,
      duration: 0.65,
      ease: "power3.out",
    }, 0)

    // Red box Phase 2 — snap flat (0.65 → 1.0)
    tl.to(redBoxRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.inOut",
    })

    // White box scrolls concurrently over the full timeline
    tl.to(boxRef.current, {
      y: "-100vh",
      ease: "none",
      duration: 1,
    }, 0)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
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
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex items-end px-10 pb-12 gap-8"
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      >
        {/* Left: red box / heading */}
        <div ref={redBoxRef} style={{ flex: "0 0 auto", maxWidth: 540 }}>
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
        </div>

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
