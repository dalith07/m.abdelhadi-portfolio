"use client"

const feedback = [
    { name: "Anonymous", message: "Loved the last post on discipline, more of this please.", date: "Jul 12, 2026" },
    { name: "Sara K.", message: "Could you cover morning routines next?", date: "Jul 10, 2026" },
    { name: "Anonymous", message: "The TikTok audio was a bit loud on the fitness reel.", date: "Jul 08, 2026" },
]

export default function FeedbackSubmissions() {
    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
                Community input
            </p>
            <h1 id="main-title" className="text-2xl font-semibold text-white mb-6">
                Feedback Submissions
            </h1>

            <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="flex flex-col divide-y divide-slate-800">
                    {feedback.map((f, i) => (
                        <div key={i} className="py-3 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-200">{f.message}</p>
                                <p className="text-xs text-slate-500 mt-1">{f.name}</p>
                            </div>
                            <span className="text-xs text-slate-600 shrink-0">{f.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}