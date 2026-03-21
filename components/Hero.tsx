"use client"

import { useEffect, useRef } from "react"

const RIGHT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1518655048521-f130df041f66?w=1200&q=80",
    alt: "Large curved LED billboard with car advertisement at night",
  },
  {
    src: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=1200&q=80",
    alt: "Storefront digital billboard with vibrant product display",
  },
  {
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    alt: "Aerial view of busy city plaza with people walking",
  },
]

export default function Hero() {
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("img-visible")
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )
    imgRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* SECTION 1 — Sticky left text + 3 scroll-in images on the right */}
      <section className="relative w-full bg-white" style={{ minHeight: "270vh" }}>
        <div className="flex flex-col md:flex-row w-full">

          {/* Left sticky panel */}
          <div
            className="md:sticky md:top-0 flex-shrink-0 flex flex-col justify-center bg-white z-10"
            style={{ width: "100%", height: "100vh", maxWidth: "50%", padding: "96px 48px 64px 48px" }}
          >
            <h1
              className="hero-headline font-black uppercase"
              style={{
                color: "var(--sol-red)",
                fontSize: "clamp(2.6rem, 7vw, 7.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
              }}
            >
              STEP INTO
              <br />
              THE SPOT-
              <br />
              LIGHT WITH
              <br />
              SOLDOUT!
            </h1>

            <p className="hero-sub mt-8" style={{ color: "var(--sol-black)", fontWeight: 400, fontSize: "1.15rem" }}>
              No one can miss you now
            </p>

            <div className="hero-cta mt-6">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105"
                style={{ backgroundColor: "var(--sol-red)", color: "#fff", fontSize: "0.95rem" }}
              >
                Get a Quote
              </button>
            </div>
          </div>

          {/* Right: 3 stacked images, each 90vh */}
          <div className="hidden md:flex flex-col flex-1">
            {RIGHT_IMAGES.map((img, i) => (
              <div
                key={i}
                ref={(el) => { imgRefs.current[i] = el }}
                className="hero-img-block w-full overflow-hidden"
                style={{
                  height: "90vh",
                  opacity: 0,
                  transform: "translateY(48px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ display: "block" }} />
              </div>
            ))}
          </div>

          {/* Mobile: images stacked below text */}
          <div className="flex md:hidden flex-col gap-3 px-4 pb-8">
            {RIGHT_IMAGES.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img.src} alt={img.alt} className="w-full object-cover rounded" style={{ height: 240 }} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Billboard hero: full-bleed night city image */}
      <section id="about" className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1800&q=80"
          alt="Billboard campaign at night in the city"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.75)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }}
        />

        {/* About card — top right */}
        <div
          className="absolute bg-white p-7 shadow-2xl z-10"
          style={{ top: 80, right: 32, maxWidth: 360, animation: "fadeInUp 0.9s ease 0.3s both" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
            This is a space to share more about the business: who&apos;s behind it, what it does and what this site has to offer.
            It&apos;s an opportunity to tell the story behind the business or describe a special service or product it offers.
            You can use this section to share the company&apos;s history or highlight a particular feature that sets it apart from competitors.
          </p>
        </div>

        {/* Red headline block — bottom left */}
        <div
          className="absolute bottom-0 left-0 z-10 px-8 py-9"
          style={{ backgroundColor: "var(--sol-red)", maxWidth: 660 }}
        >
          <h2
            className="font-black uppercase text-white"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.75rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            THE CREATIVE FORCE
            <br />
            BEHIND YOUR
            <br />
            {"BRAND'S SUCCESS"}
          </h2>
        </div>
      </section>
    </>
  )
}
