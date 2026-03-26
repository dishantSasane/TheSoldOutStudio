"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"])
  const backdropFilter = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
  ]

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50"
        style={{ padding: "16px 28px", backgroundColor, backdropFilter }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo — left */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="Go to top"
          >
            {/* Snowflake / asterisk icon matching Wix logo mark */}
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="4" x2="20" y2="36" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
              <line x1="4" y1="20" x2="36" y2="20" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
              <line x1="8.34" y1="8.34" x2="31.66" y2="31.66" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
              <line x1="31.66" y1="8.34" x2="8.34" y2="31.66" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div style={{ lineHeight: 1.05 }}>
              <div style={{ fontWeight: 900, fontSize: 14, color: "#000", letterSpacing: "-0.01em" }}>SoldOut</div>
              <div style={{ fontWeight: 900, fontSize: 14, color: "#000", letterSpacing: "-0.01em" }}>Labs</div>
            </div>
          </motion.button>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Desktop nav links — hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center" style={{ gap: 32 }}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      color: "#EB0000",
                      fontSize: "17px",
                      fontWeight: "800",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      padding: "4px 0",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Contact Us — always visible (desktop + tablet) */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                style={{
                  color: "#EB0000",
                  fontWeight: "900",
                  border: "2.5px solid #EB0000",
                  borderRadius: "9999px",
                  padding: "9px 28px",
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "#EB0000"
                  e.currentTarget.style.color = "#FFFFFF"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#EB0000"
                }}
              >
                Contact Us
              </button>
            </motion.div>

            {/* Hamburger — visible on mobile/tablet (below lg) */}
            <button
              className="flex lg:hidden"
              style={{ color: "#EB0000", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile / Tablet Menu Overlay */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: "#FFFFFF" }}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center" style={{ padding: "18px 28px" }}>
            {/* Logo in overlay */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="4" x2="20" y2="36" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
                <line x1="4" y1="20" x2="36" y2="20" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
                <line x1="8.34" y1="8.34" x2="31.66" y2="31.66" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
                <line x1="31.66" y1="8.34" x2="8.34" y2="31.66" stroke="#EB0000" strokeWidth="4" strokeLinecap="round"/>
              </svg>
              <div style={{ lineHeight: 1.05 }}>
                <div style={{ fontWeight: 900, fontSize: 13, color: "#000" }}>SoldOut</div>
                <div style={{ fontWeight: 900, fontSize: 13, color: "#000" }}>Labs</div>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{ color: "#EB0000", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-10 mt-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left uppercase transition-all"
                style={{ fontWeight: 900, fontSize: "clamp(2rem, 8vw, 3rem)", color: "#EB0000", background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.03em" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateX(12px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left uppercase transition-all"
              style={{ fontWeight: 900, fontSize: "clamp(2rem, 8vw, 3rem)", color: "#EB0000", background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.03em" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateX(12px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
            >
              Contact Us
            </button>
          </nav>
        </motion.div>
      )}
    </>
  )
}
