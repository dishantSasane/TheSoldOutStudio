"use client"

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

// Desktop positions — scattered top & bottom like the reference
const desktopPositions = [
  { top:  8, left:  6,  rotate: -12 },
  { top: 14, left: 26,  rotate:  8  },
  { top:  6, left: 48,  rotate: -4  },
  { top: 12, left: 68,  rotate: 14  },
  { top:  7, left: 86,  rotate:  6  },
  { top: 70, left:  6,  rotate: -6  },
  { top: 74, left: 26,  rotate: -12 },
  { top: 68, left: 48,  rotate:  4  },
  { top: 72, left: 68,  rotate: -8  },
  { top: 68, left: 88,  rotate: 10  },
]

// Mobile positions — same idea but condensed
const mobilePositions = [
  { top:  6,  left:  5,  rotate: -12 },
  { top:  6,  left: 40,  rotate:  6  },
  { top:  6,  left: 74,  rotate: -5  },
  { top: 22,  left: 22,  rotate:  8  },
  { top: 22,  left: 60,  rotate: -10 },
  { top: 66,  left:  5,  rotate: -5  },
  { top: 66,  left: 38,  rotate: 10  },
  { top: 66,  left: 72,  rotate: -6  },
  { top: 80,  left: 18,  rotate:  8  },
  { top: 80,  left: 60,  rotate: -8  },
]

export default function TrustedBy() {
  return (
    <section
      className="w-full overflow-hidden relative bg-white"
      style={{ height: "clamp(520px, 80vw, 820px)" }}
      aria-label="Trusted by leading brands"
    >
      {/* Scattered logos — desktop */}
      <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none z-20" aria-hidden="true">
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            className="absolute"
            style={{
              top: `${desktopPositions[i].top}%`,
              left: `${desktopPositions[i].left}%`,
              transform: `translate(-50%, -50%) rotate(${desktopPositions[i].rotate}deg)`,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              className={`w-auto object-contain ${brand.name === "Newww" ? "invert opacity-90" : ""}`}
              style={{ height: "clamp(40px, 4.5vw, 72px)", maxWidth: "clamp(120px, 14vw, 260px)" }}
            />
          </div>
        ))}
      </div>

      {/* Scattered logos — mobile */}
      <div className="md:hidden absolute inset-0 w-full h-full pointer-events-none select-none z-20" aria-hidden="true">
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            className="absolute"
            style={{
              top: `${mobilePositions[i].top}%`,
              left: `${mobilePositions[i].left}%`,
              transform: `translate(-50%, -50%) rotate(${mobilePositions[i].rotate}deg)`,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              className={`w-auto object-contain ${brand.name === "Newww" ? "invert opacity-90" : ""}`}
              style={{ height: "clamp(28px, 6vw, 48px)", maxWidth: "clamp(80px, 22vw, 160px)" }}
            />
          </div>
        ))}
      </div>

      {/* Giant scrolling text — centred vertically */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ pointerEvents: "none" }}
      >
        <div className="scroll-text-track whitespace-nowrap" aria-label="Trusted by the best" style={{ userSelect: "none" }}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-black uppercase"
              style={{
                fontSize: "clamp(3.5rem, 14vw, 12rem)",
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
    </section>
  )
}
