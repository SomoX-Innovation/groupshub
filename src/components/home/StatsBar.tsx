'use client'

import { useEffect, useRef, useState } from 'react'

interface StatItem {
  value: string
  numericValue: number
  suffix: string
  label: string
  icon: string
  gradient: string
}

const stats: StatItem[] = [
  { value: '10,000+', numericValue: 10000, suffix: '+', label: 'Groups Listed', icon: '🌐', gradient: 'from-blue-500 to-cyan-500' },
  { value: '195', numericValue: 195, suffix: '', label: 'Countries', icon: '🗺️', gradient: 'from-violet-500 to-purple-500' },
  { value: '50+', numericValue: 50, suffix: '+', label: 'Categories', icon: '🏷️', gradient: 'from-pink-500 to-rose-500' },
  { value: '3', numericValue: 3, suffix: '', label: 'Platforms', icon: '📱', gradient: 'from-amber-500 to-orange-500' },
]

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const count = useCountUp(stat.numericValue, 1500, animate)
  const display = animate
    ? (stat.numericValue >= 1000 ? count.toLocaleString() : count) + stat.suffix
    : stat.value

  return (
    <div className="glass-card card-hover rounded-2xl p-6 text-center flex flex-col items-center gap-2">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-xl mb-1 shadow-lg`}>
        {stat.icon}
      </div>
      <p className={`text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
        {display}
      </p>
      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
    </div>
  )
}

export function StatsBar() {
  const ref = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
