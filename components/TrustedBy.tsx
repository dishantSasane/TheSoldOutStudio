"use client"

const brands = [
  { name: "SutraHR",      src: "/assets/SutraHR_logo.png" },
  { name: "Autofina",     src: "/assets/autofina_robotics.png" },
  { name: "Flying Club",  src: "/assets/flying_club_logo.png" },
  { name: "Funpool",      src: "/assets/funpool_logo.png" },
  { name: "Logo New",     src: "/assets/logo_new.png" },
  { name: "Nosh Nook",    src: "/assets/logo_nosh_nook-removebg.png" },
  { name: "New 2",        src: "/assets/new2.png" },
  { name: "Newww",        src: "/assets/newwww.png" },
  { name: "Omicron",      src: "/assets/omicronlogo.png" },
  { name: "Raju Bhai",    src: "/assets/raju bhai logo bg removed.png" },
]

// Top row: 5 logos scattered above the text
// Bottom row: 5 logos scattered below the text
// top/left in % relative to the section, rotate in degrees
const positions = [
  // ── Top row ──
  { top:  9, left:  7,  rotate: -13 },
  { top: 16, left: 28,  rotate:   8 },
  { top:  8, left: 50,  rotate:  -4 },
  { top: 14, left: 72,  rotate:  12 },
  { top:  8, left: 88,  rotate:   7 },
  // ── Bottom row ──
  { top: 70, left:  8,  rotate:  -6 },
  { top: 76, left: 28,  rotate: -11 },
  { top: 68, left: 50,  rotate:   5 },
  { top: 74, left: 72,  rotate:  -9 },
  { top: 70, left: 90,  rotate:  10 },
]

// Separate tighter positions for mobile so nothing bleeds off-screen
const mobilePositions = [
  { top:  5,  left: 10,  rotate: -12 },
  { top:  5,  left: 42,  rotate:   6 },
  { top:  5,  left: 76,  rotate:  -5 },
  { top: 22,  left: 24,  rotate:   9 },
  { top: 22,  left: 62,  rotate: -10 },
  { top: 65,  left: 10,  rotate:  -6 },
  { top: 65,  left: 42,  rotate:  10 },
  { top: 65,  left: 76,  rotate:  -7 },
  { top: 80,  left: 24,  rotate:   8 },
  { top: 80,  left: 62,  rotate:  -9 },
]

export default function TrustedBy() {
  return (
    <section
      className="w-full bg-white relative"
      style={{ height: "clamp(480px, 75vw, 800px)", overflow: "hidden" }}
      aria-label="Trusted by leading brands"
    >
      {/* ── Scattered logos (desktop) ── */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none select-none"
        style={{ zIndex: 20 }}
        aria-hidden="true"
      >
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            className="absolute"
            style={{
              top:       `${positions[i].top}%`,
              left:      `${positions[i].left}%`,
              transform: `translate(-50%, -50%) rotate(${positions[i].rotate}deg)`,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              style={{
                height:   "clamp(50px, 5.5vw, 90px)",
                maxWidth: "clamp(140px, 17vw, 300px)",
                width: "auto",
                objectFit: "contain",
                filter: brand.name === "Newww" ? "invert(1)" : "none",
                opacity: brand.name === "Newww" ? 0.9 : 1,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Scattered logos (mobile) ── */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none select-none"
        style={{ zIndex: 20 }}
        aria-hidden="true"
      >
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            className="absolute"
            style={{
              top:       `${mobilePositions[i].top}%`,
              left:      `${mobilePositions[i].left}%`,
              transform: `translate(-50%, -50%) rotate(${mobilePositions[i].rotate}deg)`,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              style={{
                height:   "clamp(36px, 9vw, 62px)",
                maxWidth: "clamp(100px, 30vw, 180px)",
                width: "auto",
                objectFit: "contain",
                filter: brand.name === "Newww" ? "invert(1)" : "none",
                opacity: brand.name === "Newww" ? 0.9 : 1,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Giant scrolling marquee — centred in the section ── */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div
          className="scroll-text-track whitespace-nowrap"
          aria-label="Trusted by the best"
          style={{ userSelect: "none" }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-black uppercase"
              style={{
                fontSize:      "clamp(3.5rem, 14vw, 12rem)",
                lineHeight:    1,
                color:         "var(--sol-black)",
                letterSpacing: "-0.04em",
                paddingRight:  "4vw",
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
