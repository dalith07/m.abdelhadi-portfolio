"use client"

import { motion } from "framer-motion"
import { Dumbbell, Utensils, Moon, Flame } from "lucide-react"

const pillars = [
    {
        icon: Dumbbell,
        title: "Strength Training",
        description: "4-5 sessions a week focused on compound lifts and progressive overload.",
    },
    {
        icon: Utensils,
        title: "Nutrition",
        description: "High protein, whole foods, and consistent meal timing over strict diets.",
    },
    {
        icon: Moon,
        title: "Recovery",
        description: "7-8 hours of sleep and active recovery days to let the body rebuild.",
    },
    {
        icon: Flame,
        title: "Conditioning",
        description: "Regular cardio and mobility work to sustain long-term performance.",
    },
]

export default function FitnessPage() {
    return (
        <main className="min-h-screen w-full bg-black pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-white/40 text-xs font-semibold tracking-[0.2em] mb-3">
                        FITNESS
                    </p>
                    <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">
                        Forging Discipline
                    </h1>
                    <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
                        Physical movement and optimized nutrition as a foundation for everything else.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {pillars.map(({ icon: Icon, title, description }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                                <Icon size={18} className="text-yellow-500" />
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                            <p className="text-white/50 text-xs leading-relaxed">{description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}