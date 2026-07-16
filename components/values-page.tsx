"use client"

import { useRef, useState, useLayoutEffect } from "react"
import gsap from "gsap"
import { Dumbbell, BookOpen, Moon, Handshake, Brain, Target, ChevronLeft, ChevronRight } from "lucide-react"

const values = [
    { icon: Dumbbell, label: "Fitness" },
    { icon: BookOpen, label: "Learning" },
    { icon: Moon, label: "Faith" },
    { icon: Handshake, label: "Good Character" },
    { icon: Brain, label: "Discipline" },
    { icon: Target, label: "Consistency" },
]

const loopValues = [...values, ...values]
const SPEED = 40 // px per second, constant regardless of restarts

export default function ValuesPage() {
    const trackRef = useRef<HTMLDivElement>(null)
    const tweenRef = useRef<gsap.core.Tween | null>(null)
    const halfWidthRef = useRef(0)
    const isPausedRef = useRef(false)
    const [, forceRender] = useState(0)

    const startLoop = (fromX: number) => {
        const track = trackRef.current
        if (!track) return

        tweenRef.current?.kill()

        const halfWidth = halfWidthRef.current
        // normalize starting x into [-halfWidth, 0] range
        let x = fromX % halfWidth
        if (x > 0) x -= halfWidth

        gsap.set(track, { x })

        const remainingDistance = Math.abs(x + halfWidth)
        const duration = remainingDistance / SPEED

        tweenRef.current = gsap.to(track, {
            x: -halfWidth,
            duration,
            ease: "none",
            onComplete: () => startLoop(-halfWidth),
        })

        if (isPausedRef.current) tweenRef.current.pause()
    }

    useLayoutEffect(() => {
        const track = trackRef.current
        if (!track) return
        halfWidthRef.current = track.scrollWidth / 2
        startLoop(0)

        return () => {
            tweenRef.current?.kill()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setPaused = (paused: boolean) => {
        isPausedRef.current = paused
        if (paused) {
            tweenRef.current?.pause()
        } else {
            tweenRef.current?.resume()
        }
        forceRender((n) => n + 1)
    }

    const scrollByCard = (dir: "left" | "right") => {
        const track = trackRef.current
        if (!track) return

        tweenRef.current?.kill()

        const cardShift = 210
        const currentX = (gsap.getProperty(track, "x") as number) || 0
        const targetX = currentX + (dir === "left" ? cardShift : -cardShift)

        gsap.to(track, {
            x: targetX,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                if (!isPausedRef.current) startLoop(targetX)
                else gsap.set(track, { x: targetX })
            },
        })
    }

    return (
        <section className="w-full bg-black px-6 py-16 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="w-10 h-px bg-yellow-500/40" />
                    <h2 className="text-white text-xl font-semibold">Daily Values</h2>
                    <span className="w-10 h-px bg-yellow-500/40" />
                </div>

                <div className="relative">
                    <button
                        onClick={() => scrollByCard("left")}
                        className="absolute hover:cursor-pointer -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black border border-white/10 text-white/60 hover:text-yellow-500 hover:border-yellow-500/40 flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => scrollByCard("right")}
                        className="absolute hover:cursor-pointer -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black border border-white/10 text-white/60 hover:text-yellow-500 hover:border-yellow-500/40 flex items-center justify-center transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-linear-to-r from-black to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-black to-transparent z-10" />

                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <div ref={trackRef} className="flex gap-4 w-max">
                            {loopValues.map(({ icon: Icon, label }, i) => (
                                <div
                                    key={`${label}-${i}`}
                                    className="shrink-0 w-40 sm:w-47.5 bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-yellow-500/30 hover:bg-white/5 transition-colors"
                                >
                                    <Icon size={22} className="text-yellow-500" />
                                    <span className="text-white/80 text-sm text-center">{label}</span>
                                    <span className="w-6 h-px bg-yellow-500/30" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}