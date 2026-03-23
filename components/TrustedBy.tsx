"use client"

import { useEffect, useRef } from "react"

const brands = [
  { name: "SutraHR", src: "/assets/SutraHR_logo.png" },
  { name: "Autofina", src: "/assets/autofina_robotics.png" },
  { name: "Flying Club", src: "/assets/flying_club_logo.png" },
  { name: "Funpool", src: "/assets/funpool_logo.png" },
  { name: "Logo New", src: "/assets/logo_new.png" },
  { name: "Nosh Nook", src: "/assets/logo_nosh_nook-removebg.png" },
  { name: "New 2", src: "/assets/new2.png" },
  { name: "Newww", src: "/assets/newwww.png" },
  { name: "Omicron", src: "/assets/omicronlogo.png" },
  { name: "Raju Bhai", src: "/assets/raju bhai logo bg removed.png" },
]

export default function TrustedBy() {
  return (
    <section
      className="w-full overflow-hidden bg-white py-16 md:py-24"
      aria-label="Trusted by leading brands"
    >
      {/* Scrolling marquee headline */}
      <div className="relative flex overflow-hidden mb-12 md:mb-16">
        <div className="scroll-text-track whitespace-nowrap" aria-label="Trusted by the best" style={{ userSelect: "none" }}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-black uppercase"
              style={{
                fontSize: "clamp(3rem, 10vw, 9rem)",
                lineHeight: 1,
                color: "var(--sol-black)",
                letterSpacing: "-0.04em",
                paddingRight: "4vw",
              }}
            >
              {"TRUSTED BY THE BEST\u00A0\u00A0\u00A0"}
            </span>
          ))}
        </div>
      </div>

      {/* Responsive logo grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center w-full">
              <img
                src={brand.src}
                alt={brand.name}
                className={`w-full max-w-[100px] md:max-w-[140px] h-12 md:h-16 object-contain ${brand.name === "Newww" ? "invert opacity-90" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
