const WA_NUMBER = "919876543210"
const WA_MESSAGE = encodeURIComponent(
  "Hey, I want to make my brand stand out. Let's connect and see how SoldOut can help."
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`
const IG_URL = "https://www.instagram.com/thesoldoutstudio"

function WhatsAppIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="white" />
      <path
        d="M16 7C11.03 7 7 11.03 7 16c0 1.61.43 3.12 1.17 4.43L7 25l4.71-1.13A8.95 8.95 0 0016 25c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4.42 12.42c-.18.5-1.05.97-1.46 1.03-.39.05-.88.07-1.42-.09-.33-.1-.75-.23-1.29-.46-2.27-.98-3.75-3.28-3.86-3.43-.11-.15-.9-1.2-.9-2.28 0-1.09.57-1.62.77-1.84.2-.22.44-.27.59-.27h.42c.14 0 .33-.05.52.4l.74 1.8c.06.14.03.3-.04.42l-.32.47c-.08.12-.16.25-.07.49.31.82.97 1.59 1.57 2.1.66.57 1.36.87 1.6.97.23.1.37.08.51-.05l.44-.52c.15-.18.3-.12.5-.07l1.73.82c.2.1.33.14.38.22.05.35-.13.93-.31 1.29z"
        fill="#CC0000"
      />
    </svg>
  )
}

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function ConnectSection() {
  return (
    <section id="contact" className="w-full" style={{ backgroundColor: "var(--sol-red)" }} aria-label="Connect with us">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">

        {/* Left — headline */}
        <div className="flex-1 text-center md:text-left">
          <h2
            className="font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            READY TO GET
            <br />
            SOLDOUT?
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg leading-relaxed max-w-xs mx-auto md:mx-0" style={{ color: "rgba(255,255,255,0.9)" }}>
            Ready to grow your brand and stand out? Let&apos;s make it happen.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-semibold"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
              WhatsApp
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-semibold"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
              The SoldOut Studio
            </a>
          </div>
        </div>

        {/* Right — WhatsApp CTA */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-6 md:gap-8 w-full">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-full px-6 md:px-8 py-4 md:py-5 shadow-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95 w-full max-w-sm"
            style={{ textDecoration: "none" }}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={36} />
            <div>
              <p className="font-black text-lg md:text-xl leading-tight" style={{ color: "var(--sol-red)" }}>Chat on WhatsApp</p>
              <p className="text-sm mt-0.5" style={{ color: "#666" }}>We reply within minutes</p>
            </div>
          </a>

          {/* Limited slots badge */}
          <div className="flex items-center gap-2 w-full max-w-sm">
            <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: "#fff" }} />
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
              Limited slots available each month
            </p>
          </div>

          {/* Pre-typed message preview */}
          <div className="w-full max-w-sm rounded-2xl p-4 md:p-5 shadow-inner" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
            <p className="text-xs mb-2 uppercase tracking-widest font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
              Pre-filled message
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: "#fff" }}>
              &ldquo;Hey, I want to make my brand stand out. Let&apos;s connect and see how SoldOut can help.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
