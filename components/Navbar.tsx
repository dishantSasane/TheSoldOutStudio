"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.92)"])
  const backdropFilter = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"])

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
          padding: "20px 24px",
          backgroundColor,
          backdropFilter,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-end w-full">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ gap: "32px" }}>
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
                    fontSize: "18px",
                    fontWeight: "800",
                    textDecoration: "none",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {link.label}
                </button>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                style={{
                  color: "#EB0000",
                  fontWeight: "900",
                  border: "2.5px solid #EB0000",
                  borderRadius: "9999px",
                  padding: "10px 32px",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  transition: "all 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)"
                  e.currentTarget.style.backgroundColor = "#EB0000"
                  e.currentTarget.style.color = "#FFFFFF"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#EB0000"
                }}
              >
                Contact Us
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            style={{ 
              color: "#EB0000",
              transition: "transform 0.2s"
            }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
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
              style={{ 
                color: "#EB0000",
                transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <X size={30} />
            </button>
          </div>
          <nav className="flex flex-col gap-8 px-10 mt-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-3xl font-black uppercase transition-all"
                style={{ color: "#EB0000" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05) translateX(10px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateX(0)"}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left text-3xl font-black uppercase transition-all"
              style={{ color: "#EB0000" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05) translateX(10px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateX(0)"}
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
