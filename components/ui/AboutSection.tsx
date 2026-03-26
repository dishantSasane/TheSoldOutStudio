"use client"

import { motion } from "framer-motion"

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
  return (
    <section id="about" className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
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
        <div className="flex items-stretch gap-8 ml-auto max-w-[460px]">
          <div style={{ width: 2, flexShrink: 0, backgroundColor: "rgba(255,255,255,0.25)" }} />
          <div className="flex flex-col justify-center gap-3">
            <motion.p
              style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 400 }}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We&apos;re not just another marketing agency — we&apos;re your content and growth partner.
            </motion.p>
            <motion.p
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 400 }}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              At SoldOut, we create high-impact content and manage your entire social presence from end to end. From shooting scroll-stopping visuals to planning, posting, and optimizing your content — everything is built to grow your brand consistently.
            </motion.p>
            <motion.p
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 400 }}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We&apos;ve worked across industries including businesses, education, industrial projects, podcasts, and international content — adapting strategies that actually work for your audience.
            </motion.p>
            <motion.p
              style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 600 }}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              If your brand needs attention, consistency, and real growth — we make it happen.
            </motion.p>
          </div>
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
