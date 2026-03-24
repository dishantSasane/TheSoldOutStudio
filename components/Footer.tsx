"use client"

function FooterLogo() {
  return (
    <svg style={{ width: "80px", height: "80px" }} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="The SoldOut Studio logo">
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
  const linkStyle = {
    color: "#FFFFFF",
    fontSize: "14px",
    textDecoration: "none",
    transition: "color 0.2s",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textAlign: "left" as const
  }

  const headingStyle = {
    color: "#FFFFFF",
    fontSize: "13px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    fontWeight: 600,
    marginBottom: "16px"
  }

  return (
    <footer className="w-full" style={{ backgroundColor: "#000000", paddingTop: "64px", paddingBottom: "40px" }} aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
          
          {/* Logo */}
          <div className="flex items-start">
            <FooterLogo />
          </div>

          {/* Site menu */}
          <div>
            <h4 style={headingStyle}>Site menu</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Contact Us", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = "#EB0000"}
                    onMouseLeave={e => e.currentTarget.style.color = "#FFFFFF"}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 style={headingStyle}>Follow us</h4>
            <ul className="flex flex-col gap-3">
               {[
                { label: "Instagram", href: "https://www.instagram.com/thesoldoutstudio" },
                { label: "Facebook", href: "#" },
                { label: "Youtube", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = "#EB0000"}
                    onMouseLeave={e => e.currentTarget.style.color = "#FFFFFF"}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={headingStyle}>Contact</h4>
            <address className="not-italic flex flex-col gap-3">
              {["Amrohi Villa, Hathi Mohalla", "Vasai West 401201"].map((line) => (
                <span key={line} style={{ color: "#FFFFFF", fontSize: "14px" }}>{line}</span>
              ))}
            </address>
          </div>

          {/* Legal */}
          <div>
            <h4 style={headingStyle}>Legal</h4>
            <ul className="flex flex-col gap-3">
              {["Privacy Policy", "Accessibility Statement"].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = "#EB0000"}
                    onMouseLeave={e => e.currentTarget.style.color = "#FFFFFF"}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "14px" }}>&copy; 2026 by SoldOut Labs.</span>
        </div>
      </div>
    </footer>
  )
}
