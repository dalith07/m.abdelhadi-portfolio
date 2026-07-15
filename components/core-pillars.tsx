import { Heart, Dumbbell, TrendingUp } from "lucide-react"

const pillars = [
    {
        icon: Heart,
        title: "Faith",
        description: "Finding clarity and purpose through spiritual grounding and daily prayer.",
    },
    {
        icon: Dumbbell,
        title: "Fitness",
        description: "Forging discipline through physical movement and optimized nutrition.",
    },
    {
        icon: TrendingUp,
        title: "Growth",
        description: "Continuous self-improvement in career, value, and personal standards.",
    },
]

const CorePillars = () => {
    return (
        <section className="dark w-full bg-background px-6">
            <div className="max-w-5xl mx-auto">
                <p className="text-center text-white/40 text-xs font-semibold tracking-[0.2em] mb-10">
                    CORE PILLARS
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {pillars.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-yellow-500/30 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                                <Icon size={18} className="text-yellow-500" />
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                            <p className="text-white/50 text-xs leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CorePillars