"use client"

import { useState } from "react"

const conversations = [
    { name: "Sara K.", last: "Could you cover morning routines next?", time: "2m", unread: true },
    { name: "Anonymous", last: "Loved the last post on discipline, more of this please.", time: "1h", unread: true },
    { name: "Karim H.", last: "The TikTok audio was a bit loud on the fitness reel.", time: "3h", unread: false },
    { name: "Yassmine T.", last: "Any chance of a Q&A live session soon?", time: "1d", unread: false },
]

export default function Messages() {
    const [selected, setSelected] = useState(0)

    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
                Inbox
            </p>
            <h1 id="main-title" className="text-2xl font-semibold text-white mb-6">
                Messages
            </h1>

            <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden grid grid-cols-[260px_1fr] h-[420px]">
                <div className="border-r border-slate-800 overflow-y-auto">
                    {conversations.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`w-full text-left px-4 py-3 border-b border-slate-800/60 transition-colors ${selected === i ? "bg-slate-800" : "hover:bg-slate-800/50"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-slate-200">{c.name}</span>
                                <span className="text-[11px] text-slate-500">{c.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">{c.last}</p>
                            {c.unread && <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col p-4">
                    <p className="text-sm text-slate-200 mb-1">{conversations[selected].name}</p>
                    <p className="text-xs text-slate-500 mb-4">Message from user</p>
                    <div className="flex-1 flex items-start">
                        <div className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 max-w-xs">
                            {conversations[selected].last}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            placeholder="Reply..."
                            className="flex-1 bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-300 px-3 py-2 outline-none"
                        />
                        <button className="text-xs bg-amber-400 text-slate-900 rounded-md px-3 py-2 font-medium hover:bg-amber-300 transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}