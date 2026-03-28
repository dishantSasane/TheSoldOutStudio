"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)



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
        style={{ padding: "16px 28px", backgroundColor: "transparent" }}
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
              <path d="M6 6 L14 14 M6 14 L6 6 L14 6" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
              <path d="M34 34 L26 26 M34 26 L34 34 L26 34" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
              <path d="M34 6 L26 14 M34 14 L34 6 L26 6" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
              <path d="M6 34 L14 26 M6 26 L6 34 L14 34" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
              <line x1="10" y1="30" x2="30" y2="10" stroke="#EB0000" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div style={{ lineHeight: 1.05, fontFamily: "Arial, sans-serif" }}>
              <div style={{ fontWeight: 800, fontSize: 21, color: "#000", letterSpacing: "-0.01em" }}>SoldOut</div>
              <div style={{ fontWeight: 800, fontSize: 21, color: "#000", letterSpacing: "-0.01em" }}>Labs</div>
            </div>
          </motion.button>

          {/* Right side */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            backgroundColor: "#FFFFFF",
            padding: "8px 24px",
            borderRadius: "9999px"
          }}>
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
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Arial, sans-serif",
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
                  fontWeight: "500",
                  border: "1px solid #EB0000",
                  borderRadius: "9999px",
                  padding: "7px 22px",
                  fontSize: "14px",
                  fontFamily: "Arial, sans-serif",
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
                <path d="M6 6 L14 14 M6 14 L6 6 L14 6" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
                <path d="M34 34 L26 26 M34 26 L34 34 L26 34" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
                <path d="M34 6 L26 14 M34 14 L34 6 L26 6" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
                <path d="M6 34 L14 26 M6 26 L6 34 L14 34" stroke="#000" strokeWidth="3" strokeLinejoin="miter" fill="none" />
                <line x1="10" y1="30" x2="30" y2="10" stroke="#EB0000" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div style={{ lineHeight: 1.05, fontFamily: "Arial, sans-serif" }}>
                <div style={{ fontWeight: 800, fontSize: 21, color: "#000" }}>SoldOut</div>
                <div style={{ fontWeight: 800, fontSize: 21, color: "#000" }}>Labs</div>
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