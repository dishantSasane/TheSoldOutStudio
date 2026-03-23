"use client"

// Each logo gets its own size (height in px) so they all look visually prominent
const brands = [
  { name: "SutraHR",      src: "/assets/SutraHR_logo.png",                    deskH: 70,  mobH: 52 },
  { name: "Autofina",     src: "/assets/autofina_robotics.png",               deskH: 80,  mobH: 60 },
  { name: "Flying Club",  src: "/assets/flying_club_logo.png",                deskH: 90,  mobH: 66 },
  { name: "Funpool",      src: "/assets/funpool_logo.png",                    deskH: 80,  mobH: 58 },
  { name: "Logo New",     src: "/assets/logo_new.png",                        deskH: 75,  mobH: 56 },
  { name: "Nosh Nook",    src: "/assets/logo_nosh_nook-removebg.png",         deskH: 88,  mobH: 64 },
  { name: "New 2",        src: "/assets/new2.png",                            deskH: 76,  mobH: 58 },
  { name: "Newww",        src: "/assets/newwww.png",                          deskH: 68,  mobH: 50, invert: true },
  { name: "Omicron",      src: "/assets/omicronlogo.png",                     deskH: 84,  mobH: 62 },
  { name: "Raju Bhai",    src: "/assets/raju bhai logo bg removed.png",       deskH: 92,  mobH: 68 },
]

const desktopPositions = [
  { top:  9, left:  7,  rotate: -13 },
  { top: 16, left: 28,  rotate:   8 },
  { top:  8, left: 50,  rotate:  -4 },
  { top: 14, left: 72,  rotate:  12 },
  { top:  8, left: 88,  rotate:   7 },
  { top: 70, left:  8,  rotate:  -6 },
  { top: 76, left: 28,  rotate: -11 },
  { top: 68, left: 50,  rotate:   5 },
  { top: 74, left: 72,  rotate:  -9 },
  { top: 70, left: 90,  rotate:  10 },
]

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
      style={{ height: "clamp(520px, 78vw, 860px)", overflow: "hidden" }}
      aria-label="Trusted by leading brands"
    >
      {/* ── Desktop logos ── */}
      <div className="hidden md:block absolute inset-0 pointer-events-none select-none" style={{ zIndex: 20 }} aria-hidden="true">
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            className="absolute"
            style={{
              top:       `${desktopPositions[i].top}%`,
              left:      `${desktopPositions[i].left}%`,
              transform: `translate(-50%, -50%) rotate(${desktopPositions[i].rotate}deg)`,
            }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              style={{
                height:    brand.deskH,
                maxWidth:  brand.deskH * 4,
                width:     "auto",
                objectFit: "contain",
                filter:    brand.invert ? "invert(1)" : "none",
                opacity:   brand.invert ? 0.9 : 1,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Mobile logos ── */}
      <div className="md:hidden absolute inset-0 pointer-events-none select-none" style={{ zIndex: 20 }} aria-hidden="true">
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
                height:    brand.mobH,
                maxWidth:  brand.mobH * 3.5,
                width:     "auto",
                objectFit: "contain",
                filter:    brand.invert ? "invert(1)" : "none",
                opacity:   brand.invert ? 0.9 : 1,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Scrolling marquee ── */}
      <div
        className="absolute inset-x-0"
        style={{ top: "50%", transform: "translateY(-50%)", overflow: "hidden", zIndex: 10 }}
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
