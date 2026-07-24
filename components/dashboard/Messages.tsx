
// "use client"

// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ArrowLeft, Lock, Inbox } from "lucide-react"
// import { getMessages } from "@/action/message/getMessages"
// import { useIsMobile } from "@/hooks/use-mobile"

// type DbMessage = {
//     id: string
//     content: string
//     interest: string | null
//     createdAt: string
//     user: {
//         id: string
//         name: string
//         email: string
//         image: string | null
//     }
// }

// function timeAgo(iso: string) {
//     const diff = Date.now() - new Date(iso).getTime()
//     const mins = Math.floor(diff / 60000)
//     if (mins < 1) return "now"
//     if (mins < 60) return `${mins}m`
//     const hours = Math.floor(mins / 60)
//     if (hours < 24) return `${hours}h`
//     const days = Math.floor(hours / 24)
//     return `${days}d`
// }

// function initials(name: string) {
//     return name
//         .split(" ")
//         .map((p) => p[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase()
// }

// export default function Messages() {
//     const [messages, setMessages] = useState<DbMessage[]>([])
//     const [selected, setSelected] = useState<string | null>(null)
//     const [loading, setLoading] = useState(true)
//     const [showMobileDetail, setShowMobileDetail] = useState(false)
//     const isMobile = useIsMobile()

//     useEffect(() => {
//         getMessages().then((data) => {
//             setMessages(data)
//             setSelected(data[0]?.id ?? null)
//             setLoading(false)
//         })
//     }, [])

//     const activeMessage = messages.find((m) => m.id === selected) ?? null
//     const showList = !isMobile || !showMobileDetail
//     const showDetail = !isMobile || showMobileDetail

//     const handleSelect = (id: string) => {
//         setSelected(id)
//         if (isMobile) setShowMobileDetail(true)
//     }

//     return (
//         <div>
//             <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
//                 Inbox
//             </p>
//             <h1 id="main-title" className="mb-6 text-xl font-semibold text-white sm:text-2xl">
//                 Messages
//             </h1>

//             <div
//                 id="contentcard"
//                 className="grid min-h-105 grid-cols-1 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 md:h-105 md:grid-cols-[260px_1fr]"
//             >
//                 {/* Conversation list */}
//                 <div className={`border-slate-800 md:border-r ${showList ? "flex flex-col" : "hidden md:flex md:flex-col"} max-h-72 overflow-y-auto md:max-h-none`}>
//                     {loading ? (
//                         <div className="p-4 space-y-3">
//                             {[...Array(4)].map((_, i) => (
//                                 <div key={i} className="h-14 rounded-md bg-slate-800/50 animate-pulse" />
//                             ))}
//                         </div>
//                     ) : messages.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 px-4 text-center">
//                             <Inbox size={22} />
//                             <p className="text-xs">No messages yet</p>
//                         </div>
//                     ) : (
//                         <motion.div
//                             initial="hidden"
//                             animate="show"
//                             variants={{
//                                 hidden: {},
//                                 show: { transition: { staggerChildren: 0.05 } },
//                             }}
//                         >
//                             {messages.map((m) => (
//                                 <motion.button
//                                     key={m.id}
//                                     variants={{
//                                         hidden: { opacity: 0, x: -10 },
//                                         show: { opacity: 1, x: 0 },
//                                     }}
//                                     onClick={() => handleSelect(m.id)}
//                                     className={`w-full text-left px-4 py-3 border-b border-slate-800/60 transition-colors ${selected === m.id ? "bg-slate-800" : "hover:bg-slate-800/50"
//                                         }`}
//                                 >
//                                     <div className="flex items-center justify-between mb-1">
//                                         <span className="text-sm text-slate-200 truncate">{m.user.name}</span>
//                                         <span className="text-[11px] text-slate-500 shrink-0 ml-2">{timeAgo(m.createdAt)}</span>
//                                     </div>
//                                     <p className="text-xs text-slate-500 truncate">{m.content}</p>
//                                 </motion.button>
//                             ))}
//                         </motion.div>
//                     )}
//                 </div>

//                 {/* Detail pane */}
//                 <div className={`min-w-0 flex-col p-3 sm:p-4 ${showDetail ? "flex" : "hidden md:flex"}`}>
//                     <AnimatePresence mode="wait">
//                         {activeMessage ? (
//                             <motion.div
//                                 key={activeMessage.id}
//                                 initial={false}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -8 }}
//                                 transition={{ duration: 0.25, ease: "easeOut" }}
//                                 className="flex h-full flex-col"
//                             >
//                                 <div className="mb-4 flex items-center gap-3">
//                                     {isMobile && (
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowMobileDetail(false)}
//                                             className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 md:hidden"
//                                             aria-label="Back to messages"
//                                         >
//                                             <ArrowLeft size={16} />
//                                         </button>
//                                     )}
//                                     <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs font-medium text-amber-400 shrink-0 overflow-hidden">
//                                         {activeMessage.user.image ? (
//                                             // eslint-disable-next-line @next/next/no-img-element
//                                             <img src={activeMessage.user.image} alt={activeMessage.user.name} className="w-full h-full object-cover" />
//                                         ) : (
//                                             initials(activeMessage.user.name)
//                                         )}
//                                     </div>
//                                     <div className="min-w-0">
//                                         <p className="text-sm text-slate-200 truncate">{activeMessage.user.name}</p>
//                                         <p className="text-xs text-slate-500 truncate">{activeMessage.user.email}</p>
//                                     </div>
//                                     {activeMessage.interest && (
//                                         <span className="ml-auto shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
//                                             {activeMessage.interest}
//                                         </span>
//                                     )}
//                                 </div>

//                                 <div className="flex-1 flex items-start overflow-y-auto">
//                                     <div className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 max-w-sm whitespace-pre-wrap">
//                                         {activeMessage.content}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ) : (
//                             <div className="flex-1 flex items-center justify-center text-slate-600 text-xs">
//                                 Select a message
//                             </div>
//                         )}
//                     </AnimatePresence>

//                     {/* Reply composer — disabled: admins view only, no reply channel */}
//                     <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
//                         <input
//                             placeholder="Replying is disabled"
//                             disabled
//                             className="flex-1 bg-slate-800/50 border border-slate-800 rounded-md text-xs text-slate-600 px-3 py-2 outline-none cursor-not-allowed"
//                         />
//                         <button
//                             disabled
//                             className="flex items-center gap-1.5 text-xs bg-slate-800 text-slate-600 rounded-md px-3 py-2 font-medium cursor-not-allowed"
//                         >
//                             <Lock size={12} />
//                             Send
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Lock, Inbox } from "lucide-react"
import { getMessages } from "@/action/message/getMessages"
import { useIsMobile } from "@/hooks/use-mobile"

type DbMessage = {
    id: string
    content: string
    interest: string | null
    createdAt: string
    user: {
        id: string
        name: string
        email: string
        image: string | null
    }
}

function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "now"
    if (mins < 60) return `${mins}m`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    return `${days}d`
}

function initials(name: string) {
    return name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
}

export default function Messages() {
    const [messages, setMessages] = useState<DbMessage[]>([])
    const [selected, setSelected] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [showMobileDetail, setShowMobileDetail] = useState(false)
    const isMobile = useIsMobile()

    useEffect(() => {
        getMessages().then((data) => {
            setMessages(data)
            setSelected(data[0]?.id ?? null)
            setLoading(false)
        })
    }, [])

    const activeMessage = messages.find((m) => m.id === selected) ?? null
    const showList = !isMobile || !showMobileDetail
    const showDetail = !isMobile || showMobileDetail

    const handleSelect = (id: string) => {
        setSelected(id)
        if (isMobile) setShowMobileDetail(true)
    }

    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
                Inbox
            </p>
            <h1 id="main-title" className="mb-6 text-xl font-semibold text-white sm:text-2xl">
                Messages
            </h1>

            <div
                id="contentcard"
                className="grid min-h-105 grid-cols-1 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 md:h-105 md:grid-cols-[260px_1fr]"
            >
                {/* Conversation list */}
                <div className={`border-slate-800 md:border-r ${showList ? "flex flex-col" : "hidden md:flex md:flex-col"} slim-scroll max-h-72 overflow-y-auto md:max-h-none`}>
                    {loading ? (
                        <div className="p-4 space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-14 rounded-md bg-slate-800/50 animate-pulse" />
                            ))}
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 px-4 text-center">
                            <Inbox size={22} />
                            <p className="text-xs">No messages yet</p>
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.05 } },
                            }}
                        >
                            {messages.map((m) => (
                                <motion.button
                                    key={m.id}
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        show: { opacity: 1, x: 0 },
                                    }}
                                    onClick={() => handleSelect(m.id)}
                                    className={`w-full text-left px-4 py-3 border-b border-slate-800/60 transition-colors ${selected === m.id ? "bg-slate-800" : "hover:bg-slate-800/50"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-slate-200 truncate">{m.user.name}</span>
                                        <span className="text-[11px] text-slate-500 shrink-0 ml-2">{timeAgo(m.createdAt)}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{m.content}</p>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Detail pane */}
                <div className={`min-w-0 flex-col p-3 sm:p-4 ${showDetail ? "flex" : "hidden md:flex"}`}>
                    <AnimatePresence mode="wait">
                        {activeMessage ? (
                            <motion.div
                                key={activeMessage.id}
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="flex h-full flex-col"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    {isMobile && (
                                        <button
                                            type="button"
                                            onClick={() => setShowMobileDetail(false)}
                                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 md:hidden"
                                            aria-label="Back to messages"
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                    )}
                                    <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs font-medium text-amber-400 shrink-0 overflow-hidden">
                                        {activeMessage.user.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={activeMessage.user.image} alt={activeMessage.user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            initials(activeMessage.user.name)
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-200 truncate">{activeMessage.user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{activeMessage.user.email}</p>
                                    </div>
                                    {activeMessage.interest && (
                                        <span className="ml-auto shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                            {activeMessage.interest}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 flex items-start overflow-y-auto">
                                    <div className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 max-w-sm whitespace-pre-wrap">
                                        {activeMessage.content}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-slate-600 text-xs">
                                Select a message
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Reply composer — disabled: admins view only, no reply channel */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
                        <input
                            placeholder="Replying is disabled"
                            disabled
                            className="flex-1 bg-slate-800/50 border border-slate-800 rounded-md text-xs text-slate-600 px-3 py-2 outline-none cursor-not-allowed"
                        />
                        <button
                            disabled
                            className="flex items-center gap-1.5 text-xs bg-slate-800 text-slate-600 rounded-md px-3 py-2 font-medium cursor-not-allowed"
                        >
                            <Lock size={12} />
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}