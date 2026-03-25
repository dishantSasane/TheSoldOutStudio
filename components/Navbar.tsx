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
        style={{
          backgroundColor: "transparent",
          padding: "20px 24px",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-end w-full">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ gap: "32px" }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#EB0000"}
                onMouseLeave={e => e.currentTarget.style.color = "#FFFFFF"}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              style={{
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
                borderRadius: "9999px",
                padding: "8px 24px",
                fontSize: "16px",
                backgroundColor: "transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#FFFFFF"
                e.currentTarget.style.color = "#000000"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#FFFFFF"
              }}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            style={{ color: "#FFFFFF" }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: "#000000" }}
        >
          <div className="flex justify-end" style={{ padding: "20px 24px" }}>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{ color: "#FFFFFF" }}
            >
              <X size={30} />
            </button>
          </div>
          <nav className="flex flex-col gap-8 px-10 mt-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-3xl font-black uppercase transition-colors"
                style={{ color: "#FFFFFF" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left text-3xl font-black uppercase transition-colors"
              style={{ color: "#FFFFFF" }}
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
