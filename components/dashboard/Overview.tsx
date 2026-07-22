"use client"

import { Users, Heart, TrendingUp, BarChart3 } from "lucide-react"

const stats = [
    { label: "Total reach", target: 2.4, decimals: 1, suffix: "M", icon: Users },
    { label: "Engagement", target: 8.2, decimals: 1, suffix: "%", icon: Heart },
    { label: "New followers", target: 12, decimals: 0, suffix: "K", icon: TrendingUp },
    { label: "Conversion", target: 3.4, decimals: 1, suffix: "%", icon: BarChart3 },
]

export default function Overview() {
    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
                Performance overview
            </p>
            <h1 id="main-title" className="text-2xl font-semibold text-white mb-6">
                Overview
            </h1>

            <div className="grid grid-cols-4 gap-3">
                {stats.map((s) => {
                    const Icon = s.icon
                    return (
                        <div key={s.label} className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-500">{s.label}</p>
                                <Icon size={14} className="text-slate-600" />
                            </div>
                            <p
                                className="text-xl font-semibold text-white"
                                data-target={s.target}
                                data-decimal={s.decimals}
                                data-suffix={s.suffix}
                            >
                                0
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}