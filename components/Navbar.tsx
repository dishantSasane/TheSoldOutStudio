"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

function InstagramIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SoldOutIcon({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="6" fill={color} />
      <line x1="24" y1="18" x2="24" y2="4" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="20,8 24,4 28,8" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="24" y1="30" x2="24" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="20,40 24,44 28,40" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="18" y1="24" x2="4" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="8,20 4,24 8,28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="30" y1="24" x2="44" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="40,20 44,24 40,28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="20" y1="20" x2="9" y2="9" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="13,8 9,9 10,13" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="28" y1="28" x2="39" y2="39" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="35,40 39,39 38,35" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="28" y1="20" x2="39" y2="9" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="38,13 39,9 35,8" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="20" y1="28" x2="9" y2="39" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polyline points="10,35 9,39 13,40" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
  ]

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{ backgroundColor: "var(--sol-red)" }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-3">
          <a href="#" className="flex items-center gap-2" aria-label="SoldOut Labs home">
            <span className="font-black text-lg md:text-xl tracking-tight leading-none text-white">The<br />SoldOut<br />Studio</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-semibold text-white/80 hover:text-white underline-offset-4 hover:underline transition-all"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-sm font-semibold px-5 py-2 rounded-full border-2 border-white text-white transition-all"
              onMouseEnter={e => (e.currentTarget.style.color = "var(--sol-red)", e.currentTarget.style.backgroundColor = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#fff", e.currentTarget.style.backgroundColor = "transparent")}
            >
              Contact Us
            </button>
          </div>

          <button className="md:hidden p-1 text-white" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: "var(--sol-black)" }}>
          <div className="flex justify-end p-6">
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-white">
              <X size={30} />
            </button>
          </div>
          <nav className="flex flex-col gap-8 px-10 mt-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-3xl font-black uppercase text-white hover:text-red-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left text-3xl font-black uppercase transition-colors"
              style={{ color: "var(--sol-red)" }}
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
