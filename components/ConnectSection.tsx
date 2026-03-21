const WA_NUMBER = "919876543210"
const WA_MESSAGE = encodeURIComponent(
  "Hi! I need to grow my brand. Let's connect and explore what SoldOut Labs can do for me!"
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

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

export default function ConnectSection() {
  return (
    <section id="contact" className="w-full" style={{ backgroundColor: "var(--sol-red)" }} aria-label="Connect with us">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-center md:items-start gap-14">

        {/* Left — headline */}
        <div className="flex-1">
          <h2
            className="font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            CONNECT
            <br />
            WITH US
          </h2>
          <p className="mt-6 text-lg leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.9)" }}>
            Ready to put your brand in the spotlight? Let&apos;s talk.
          </p>
        </div>

        {/* Right — WhatsApp CTA */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-8">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-full px-8 py-5 shadow-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{ textDecoration: "none" }}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={36} />
            <div>
              <p className="font-black text-xl leading-tight" style={{ color: "var(--sol-red)" }}>Chat on WhatsApp</p>
              <p className="text-sm mt-0.5" style={{ color: "#666" }}>We reply within minutes</p>
            </div>
          </a>

          {/* Pre-typed message preview */}
          <div className="w-full max-w-sm rounded-2xl p-5 shadow-inner" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
            <p className="text-xs mb-2 uppercase tracking-widest font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
              Pre-filled message
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: "#fff" }}>
              &ldquo;Hi! I need to grow my brand. Let&apos;s connect and explore what SoldOut Labs can do for me!&rdquo;
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-1">
            <a
              href="mailto:soldoutlabs.growth@gmail.com"
              className="text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              soldoutlabs.growth@gmail.com
            </a>
            <a
              href="https://www.instagram.com/soldout.labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              @soldout.labs on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
