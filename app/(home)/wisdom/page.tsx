"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const quotes = [
    {
        text: "Discipline is the highest form of self-love. To honor your commitments is to honor your potential.",
        source: "The Path of Discipline",
    },
    {
        text: "Faith is not the absence of doubt, it is moving forward despite it.",
        source: "Daily Reflections",
    },
    {
        text: "You do not rise to the level of your goals. You fall to the level of your systems.",
        source: "On Habits",
    },
    {
        text: "Consistency is louder than intensity. Show up, especially when it's boring.",
        source: "The Weekly Vibe",
    },
]

export default function WisdomPage() {
    return (
        <main className="min-h-screen w-full bg-black pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-white/40 text-xs font-semibold tracking-[0.2em] mb-3">
                        DAILY WISDOM
                    </p>
                    <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">
                        Words to Live By
                    </h1>
                    <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
                        Reflections on faith, discipline, and consistent growth.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-5">
                    {quotes.map((q, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/3 border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors"
                        >
                            <Quote size={22} className="text-yellow-500 mb-4" />
                            <p className="text-white text-base sm:text-lg font-medium leading-relaxed mb-4">
                                {q.text}
                            </p>
                            <p className="text-white/40 text-xs tracking-wide">
                                — {q.source.toUpperCase()}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}