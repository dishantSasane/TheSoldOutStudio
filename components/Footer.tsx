"use client"

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FooterLogo() {
  return (
    <svg className="w-32 h-32" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="The SoldOut Studio logo">
      <circle cx="40" cy="40" r="14" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      <path d="M40 26 A14 14 0 0 1 54 40" stroke="#CC0000" strokeWidth="3" fill="none" />
      <line x1="40" y1="12" x2="40" y2="26" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="36,16 40,12 44,16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="40" y1="54" x2="40" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="36,64 40,68 44,64" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="12" y1="40" x2="26" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="16,36 12,40 16,44" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="54" y1="40" x2="68" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="64,36 68,40 64,44" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="20" y1="20" x2="30" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="24,19 20,20 21,24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="50" y1="50" x2="60" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="56,61 60,60 59,56" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="60" y1="20" x2="50" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="59,24 60,20 56,19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="20" y1="60" x2="30" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <polyline points="21,56 20,60 24,61" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

const scrollTo = (id: string) => {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: "var(--sol-black)" }} aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">

          {/* Logo */}
          <div className="md:col-span-2 flex items-start">
            <span className="font-black text-4xl md:text-5xl tracking-tight leading-none text-white">The<br />SoldOut<br />Studio</span>
          </div>

          {/* Site menu */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Site menu</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Contact Us", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm transition-colors hover:text-white text-left"
                    style={{ color: "var(--sol-light-grey)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Contact</h4>
            <address className="not-italic flex flex-col gap-2">
              {["Amrohi Villa, Hathi Mohalla", "Vasai West 401201"].map((line) => (
                <span key={line} className="text-sm" style={{ color: "var(--sol-light-grey)" }}>{line}</span>
              ))}
            </address>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Legal</h4>
            <ul className="flex flex-col gap-2">
              {["Privacy Policy", "Accessibility Statement"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: "var(--sol-light-grey)" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid var(--sol-border-dark)", color: "var(--sol-light-grey)" }}
        >
          <span>&copy; 2026 by The SoldOut Studio.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/thesoldoutstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={14} />
              The SoldOut Studio
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
