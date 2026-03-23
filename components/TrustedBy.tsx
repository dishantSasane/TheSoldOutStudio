"use client"

const mobileRotations = [-12, 6, -5, 9, -10, -6, 10, -7, 8, -9]

const brands = [
  { name: "SutraHR",      src: "/assets/SutraHR_logo.png",                  deskH: 80,  mobH: 40 },
  { name: "Autofina",     src: "/assets/autofina_robotics.png",             deskH: 96,  mobH: 44 },
  { name: "Flying Club",  src: "/assets/flying_club_logo.png",              deskH: 104, mobH: 42 },
  { name: "Funpool",      src: "/assets/funpool_logo.png",                  deskH: 110, mobH: 46 },
  { name: "Logo New",     src: "/assets/logo_new.png",                      deskH: 90,  mobH: 38 },
  { name: "Nosh Nook",    src: "/assets/logo_nosh_nook-removebg.png",       deskH: 140, mobH: 40 },
  { name: "New 2",        src: "/assets/new2.png",                          deskH: 136, mobH: 48 },
  { name: "Newww",        src: "/assets/newwww.png",                        deskH: 130, mobH: 44, invert: true },
  { name: "Omicron",      src: "/assets/omicronlogo.png",                   deskH: 138, mobH: 38 },
  { name: "Raju Bhai",    src: "/assets/raju bhai logo bg removed.png",     deskH: 142, mobH: 46 },
]

const desktopPositions = [
  { top:  9, left:  7,  rotate: -13 },
  { top: 16, left: 28,  rotate:   8 },
  { top:  8, left: 50,  rotate:  -4 },
  { top: 14, left: 72,  rotate:  12 },
  { top:  8, left: 88,  rotate:   7 },
  { top: 74, left:  8,  rotate:  -6 },
  { top: 82, left: 28,  rotate: -11 },
  { top: 72, left: 50,  rotate:   5 },
  { top: 78, left: 72,  rotate:  -9 },
  { top: 74, left: 90,  rotate:  10 },
]

export default function TrustedBy() {
  return (
    <section
      className="w-full bg-white relative"
      style={{ height: "clamp(540px, 80vw, 900px)", overflow: "hidden" }}
      aria-label="Trusted by leading brands"
    >
      {/* ── Desktop logos (absolute scattered) ── */}
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
              loading="lazy"
              style={{
                height:    brand.deskH,
                maxWidth:  brand.deskH * 5,
                width:     "auto",
                objectFit: "contain",
                filter:    brand.invert ? "invert(1)" : "none",
                opacity:   brand.invert ? 0.9 : 1,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Mobile logos (flex rows — no overlap possible) ── */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none select-none flex flex-col"
        style={{ zIndex: 20 }}
        aria-hidden="true"
      >
        {/* Top half: 5 logos split into row of 3 + row of 2 */}
        <div className="flex flex-col justify-evenly" style={{ height: "36%" }}>
          {/* Row 1: logos 0-2 */}
          <div className="flex justify-around items-center px-3">
            {brands.slice(0, 3).map((brand, i) => (
              <div key={brand.name} style={{ transform: `rotate(${mobileRotations[i]}deg)`, flexShrink: 0 }}>
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  style={{
                    height:    brand.mobH,
                    maxWidth:  100,
                    width:     "auto",
                    objectFit: "contain",
                    filter:    brand.invert ? "invert(1)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Row 2: logos 3-4 */}
          <div className="flex justify-around items-center px-8">
            {brands.slice(3, 5).map((brand, i) => (
              <div key={brand.name} style={{ transform: `rotate(${mobileRotations[i + 3]}deg)`, flexShrink: 0 }}>
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  style={{
                    height:    brand.mobH,
                    maxWidth:  110,
                    width:     "auto",
                    objectFit: "contain",
                    filter:    brand.invert ? "invert(1)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Spacer for marquee text */}
        <div style={{ height: "28%" }} />

        {/* Bottom half: 5 logos split into row of 3 + row of 2 */}
        <div className="flex flex-col justify-evenly" style={{ height: "36%" }}>
          {/* Row 3: logos 5-7 */}
          <div className="flex justify-around items-center px-3">
            {brands.slice(5, 8).map((brand, i) => (
              <div key={brand.name} style={{ transform: `rotate(${mobileRotations[i + 5]}deg)`, flexShrink: 0 }}>
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  style={{
                    height:    brand.mobH,
                    maxWidth:  100,
                    width:     "auto",
                    objectFit: "contain",
                    filter:    brand.invert ? "invert(1)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Row 4: logos 8-9 */}
          <div className="flex justify-around items-center px-8">
            {brands.slice(8).map((brand, i) => (
              <div key={brand.name} style={{ transform: `rotate(${mobileRotations[i + 8]}deg)`, flexShrink: 0 }}>
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="lazy"
                  style={{
                    height:    brand.mobH,
                    maxWidth:  110,
                    width:     "auto",
                    objectFit: "contain",
                    filter:    brand.invert ? "invert(1)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
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
