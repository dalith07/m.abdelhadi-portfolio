"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Heart, Quote } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const habits = [
    "Build strong habits",
    "Deepen faith",
    "Improve character",
    "Never stop learning",
    "Stay fit and healthy",
    "Make an impact",
]

const stats = [
    { value: 5, suffix: "+", label: "Years of Discipline" },
    { value: 100, suffix: "+", label: "People Coached" },
    { value: 365, suffix: "", label: "Days a Year Showing Up" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const counter = { val: 0 }

        const anim = gsap.to(counter, {
            val: value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                if (el) el.textContent = Math.floor(counter.val) + suffix
            },
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        })

        return () => {
            anim.scrollTrigger?.kill()
            anim.kill()
        }
    }, [value, suffix])

    return (
        <p
            ref={ref}
            className="text-yellow-500 text-2xl sm:text-3xl font-bold mb-1"
        >
            0{suffix}
        </p>
    )
}

export default function AboutPage() {
    return (
        <section className="w-full bg-black px-6 py-20 sm:py-24">
            <div className="max-w-5xl mx-auto">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-4"
                >
                    <span className="w-8 h-px bg-yellow-500/50" />
                    <span className="text-yellow-500 text-xs font-semibold tracking-[0.2em]">ABOUT ME</span>
                    <span className="w-8 h-px bg-yellow-500/50" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    viewport={{ once: true }}
                    className="text-white text-2xl sm:text-3xl font-bold text-center mb-14"
                >
                    A Life Built on Faith, Discipline & Purpose
                </motion.h2>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-14"
                >
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                        I&apos;m Mohammed Abdelhadi — a young man who believes real strength starts with faith and discipline before it ever shows up in the gym.
                        My days begin and end with prayer, because I believe salah keeps a person grounded no matter how demanding life gets.
                        Between workouts, work, and daily responsibilities, I try to stay close to my deen, hold onto good character,
                        and remind the people around me that consistency in the small things — prayer, training, honesty, effort —
                        is what quietly builds an extraordinary life.
                    </p>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-4">
                        I don&apos;t see fitness and faith as two separate paths. Taking care of the body Allah gave me is part of taking care of my
                        purpose. That&apos;s why I coach others the same way I try to live — train hard, pray on time, stay humble, and never stop improving.
                    </p>
                </motion.div>

                {/* Stats row - GSAP animated counters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
                >
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white/3 border border-white/10 rounded-2xl py-6 px-3 text-center"
                        >
                            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            <p className="text-white/50 text-[11px] sm:text-xs leading-tight">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Mission + Habits card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative bg-linear-to-br from-white/4 to-white/1 border border-white/10 rounded-3xl p-6 sm:p-10 overflow-hidden mb-14"
                >
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative z-10">
                        <div>
                            <div className="w-11 h-11 rounded-full bg-yellow-500/10 flex items-center justify-center mb-5">
                                <Heart size={18} className="text-yellow-500" />
                            </div>
                            <h3 className="text-white text-lg font-semibold mb-3">My Mission</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                To help people become the best version of themselves through discipline, faith,
                                good character, continuous learning, and fitness. Every day is a chance to grow
                                closer to purpose and serve something bigger than ourselves.
                            </p>
                        </div>

                        <div>
                            <div className="w-11 h-11 rounded-full bg-yellow-500/10 flex items-center justify-center mb-5">
                                <CheckCircle2 size={18} className="text-yellow-500" />
                            </div>
                            <h3 className="text-white text-lg font-semibold mb-4">What I Stand For</h3>
                            <div className="flex flex-col gap-3">
                                {habits.map((habit) => (
                                    <div key={habit} className="flex items-center gap-3">
                                        <CheckCircle2 size={15} className="text-yellow-500 shrink-0" />
                                        <span className="text-white/70 text-sm">{habit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <Quote size={22} className="text-yellow-500 mx-auto mb-4" />
                    <p className="text-white text-base sm:text-lg font-medium leading-relaxed mb-3">
                        Discipline in prayer, discipline in training — the same muscle that gets you to the gym
                        gets you to the masjid.
                    </p>
                    <p className="text-white/40 text-xs tracking-wide">— MOHAMMED ABDELHADI</p>
                </motion.div>

            </div>
        </section>
    )
}