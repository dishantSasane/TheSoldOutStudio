"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 35, suffix: "%", label: "ROI growth through strategic\nOOH ads" },
  { value: 10, suffix: "M", label: "Consumers saw our campaigns\nin the past year" },
  { value: 25, suffix: "%", label: "Increase in conversion rate across\nvarious industries" },
]

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [start, target, duration])

  return count
}

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, 2000, animate)
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span
        className="font-black leading-none"
        style={{ fontSize: "clamp(4rem, 10vw, 7rem)", color: "var(--sol-red)", fontVariantNumeric: "tabular-nums" } as React.CSSProperties}
      >
        {count}{stat.suffix}
      </span>
      <p
        className="mt-4 text-sm font-medium leading-relaxed whitespace-pre-line"
        style={{ color: "var(--sol-red)", maxWidth: 220 }}
      >
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-24 bg-white" aria-label="Company statistics">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="font-semibold italic"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--sol-red)" }}
        >
          Your source of growth
        </h2>
        <p className="mt-2 text-base" style={{ color: "var(--sol-red)" }}>
          Empowering brands with targeted digital and outdoor advertising
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4">
          {stats.map((stat) => (
            <StatItem key={stat.suffix + stat.value} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
