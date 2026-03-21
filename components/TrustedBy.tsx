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

const positions = [
  { top: 12, left: 15, rotate: -15 },
  { top: 20, left: 35, rotate: 15 },
  { top: 15, left: 60, rotate: -5 },
  { top: 25, left: 80, rotate: 20 },
  { top: 10, left: 92, rotate: 25 },
  { top: 80, left: 15, rotate: -5 },
  { top: 88, left: 32, rotate: -10 },
  { top: 78, left: 52, rotate: 5 },
  { top: 85, left: 72, rotate: -5 },
  { top: 82, left: 90, rotate: 10 },
]

export default function TrustedBy() {
  return (
    <section
      className="w-full overflow-hidden relative bg-white flex flex-col justify-center"
      style={{ minHeight: "750px" }}
      aria-label="Trusted by leading brands"
    >
      {/* Scattered brand logos */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-20" aria-hidden="true">
        {brands.map((brand, i) => {
          const isBottom = i >= 5;
          return (
            <div
              key={brand.name}
              className="absolute"
              style={{
                top: `${positions[i].top}%`,
                left: `${positions[i].left}%`,
                transform: `translate(-50%, -50%) rotate(${positions[i].rotate}deg)`,
              }}
            >
              <img
                src={brand.src}
                alt={brand.name}
                className={`w-auto object-contain ${brand.name === "Newww"
                    ? "h-16 md:h-24 max-w-[200px] md:max-w-[350px] invert opacity-90"
                    : isBottom
                      ? "h-24 md:h-32 max-w-[300px] md:max-w-[500px] scale-[1.5] md:scale-[2]"
                      : "h-16 md:h-24 max-w-[200px] md:max-w-[320px]"
                  }`}
              />
            </div>
          );
        })}
      </div>

      {/* Giant scrolling text */}
      <div className="relative z-10 flex items-center justify-center my-auto" style={{ height: 240 }}>
        <div className="scroll-text-track whitespace-nowrap" aria-label="Trusted by the best" style={{ userSelect: "none" }}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-black uppercase"
              style={{
                fontSize: "clamp(4rem, 14vw, 12rem)",
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
