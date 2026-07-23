"use client"

import { Users, Heart, TrendingUp, BarChart3, Download } from "lucide-react"

const stats = [
    { label: "Total reach", target: 2.4, decimals: 1, suffix: "M", icon: Users },
    { label: "Engagement", target: 8.2, decimals: 1, suffix: "%", icon: Heart },
    { label: "New followers", target: 12, decimals: 0, suffix: "K", icon: TrendingUp },
    { label: "Conversion", target: 3.4, decimals: 1, suffix: "%", icon: BarChart3 },
]

const content = [
    { title: "The SAM Discipline: Cultivating Quiet Strength", platform: "Instagram", views: "452K", engagement: "12.4%", saves: "8,432" },
    { title: "Faith & Fitness: The Temple Under Tension", platform: "TikTok", views: "310K", engagement: "9.8%", saves: "5,120" },
    { title: "Finding Stillness in the Noise", platform: "YouTube", views: "185K", engagement: "15.2%", saves: "12,045" },
]

export default function Analytics() {
    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
                Performance overview
            </p>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 id="main-title" className="text-xl font-semibold text-white sm:text-2xl">
                    Analytics Dashboard
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                    <select className="bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-300 px-3 py-1.5 outline-none">
                        <option>Last 30 Days</option>
                    </select>
                    <button className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-300 px-3 py-1.5 hover:bg-slate-800 transition-colors">
                        <Download size={14} />
                        Export
                    </button>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
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

            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
                <div id="chartcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-200 mb-3">Audience Growth</p>
                    <svg viewBox="0 0 400 140" className="w-full h-36">
                        <polyline
                            id="growthline"
                            points="10,100 100,70 190,85 280,40 390,55"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div id="distcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-200 mb-1">Platform Distribution</p>
                    <p className="text-xs text-slate-500 mb-4">Where your audience engages most.</p>
                    <div className="flex flex-col gap-2 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-amber-400" />
                                Instagram
                            </span>
                            <span className="text-slate-300">50%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-teal-400" />
                                TikTok
                            </span>
                            <span className="text-slate-300">25%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-slate-500" />
                                YouTube
                            </span>
                            <span className="text-slate-300">25%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-slate-200">Top Performing Content</p>
                    <button className="text-xs text-amber-400 hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-xs">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-800">
                            <th className="text-left font-normal py-2">Content</th>
                            <th className="text-left font-normal py-2">Platform</th>
                            <th className="text-left font-normal py-2">Views</th>
                            <th className="text-left font-normal py-2">Engagement</th>
                            <th className="text-left font-normal py-2">Saves</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((c) => (
                            <tr key={c.title} className="border-b border-slate-800/60 text-slate-300">
                                <td className="py-2 pr-2">{c.title}</td>
                                <td className="py-2 text-slate-400">{c.platform}</td>
                                <td className="py-2">{c.views}</td>
                                <td className="py-2">{c.engagement}</td>
                                <td className="py-2">{c.saves}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}