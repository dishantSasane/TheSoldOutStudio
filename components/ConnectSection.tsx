"use client"

const WA_NUMBER = "919876543210"
const WA_MESSAGE = encodeURIComponent(
  "Hey, I want to make my brand stand out. Let's connect and see how SoldOut can help."
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

function WhatsAppIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        d="M16 7C11.03 7 7 11.03 7 16c0 1.61.43 3.12 1.17 4.43L7 25l4.71-1.13A8.95 8.95 0 0016 25c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4.42 12.42c-.18.5-1.05.97-1.46 1.03-.39.05-.88.07-1.42-.09-.33-.1-.75-.23-1.29-.46-2.27-.98-3.75-3.28-3.86-3.43-.11-.15-.9-1.2-.9-2.28 0-1.09.57-1.62.77-1.84.2-.22.44-.27.59-.27h.42c.14 0 .33-.05.52.4l.74 1.8c.06.14.03.3-.04.42l-.32.47c-.08.12-.16.25-.07.49.31.82.97 1.59 1.57 2.1.66.57 1.36.87 1.6.97.23.1.37.08.51-.05l.44-.52c.15-.18.3-.12.5-.07l1.73.82c.2.1.33.14.38.22.05.35-.13.93-.31 1.29z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export default function ConnectSection() {
  return (
    <section id="contact" className="w-full" style={{ backgroundColor: "#EB0000" }} aria-label="Connect with us">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">

        {/* Left — headline */}
        <div className="flex-1 text-center md:text-left">
          <h2
            style={{ 
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(3rem, 7vw, 96px)", 
              color: "#FFFFFF",
              textTransform: "uppercase",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            READY TO GET SOLDOUT?
          </h2>
          <p 
            style={{ 
              color: "#FFFFFF",
              opacity: 0.8,
              fontSize: "18px",
              marginTop: "24px"
            }}
          >
            Let&apos;s build something that sells.
          </p>
        </div>

        {/* Right — WhatsApp CTA */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-4 w-full h-full md:mt-4">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#FFFFFF",
              borderRadius: "9999px",
              height: "56px",
              padding: "0 32px",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={28} />
            <span style={{ color: "#000000", fontSize: "24px", fontWeight: 700 }}>Chat on WhatsApp</span>
          </a>

          <p style={{ color: "#FFFFFF", opacity: 0.6, fontSize: "14px", marginTop: "4px" }}>
            &#x21b3; We reply within minutes
          </p>
        </div>
      </div>
    </section>
  )
}

