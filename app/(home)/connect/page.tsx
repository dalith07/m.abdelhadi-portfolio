// "use client"

// import { motion } from "framer-motion"
// import Link from "next/link"
// import { Instagram, Briefcase, Mail, ArrowRight } from "lucide-react"

// const links = [
//     {
//         icon: Instagram,
//         title: "Instagram",
//         description: "@m.abdelhadi",
//         href: "https://instagram.com/m.abdelhadi",
//     },
//     {
//         icon: Briefcase,
//         title: "Professional",
//         description: "Connect on LinkedIn",
//         href: "https://linkedin.com",
//     },
//     {
//         icon: Mail,
//         title: "Email",
//         description: "Reach out directly",
//         href: "mailto:contact@mabdelhadi.com",
//     },
// ]

// export default function ConnectPage() {
//     return (
//         <main className="min-h-screen w-full bg-black pt-32 pb-20 px-6">
//             <div className="max-w-3xl mx-auto">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="text-center mb-16"
//                 >
//                     <p className="text-white/40 text-xs font-semibold tracking-[0.2em] mb-3">
//                         CONNECT
//                     </p>
//                     <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">
//                         Let&apos;s Work Together
//                     </h1>
//                     <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
//                         Reach out through any of these channels.
//                     </p>
//                 </motion.div>

//                 <div className="flex flex-col gap-4">
//                     {links.map(({ icon: Icon, title, description, href }, i) => (
//                         <motion.div
//                             key={title}
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: i * 0.1 }}
//                             viewport={{ once: true }}
//                         >
//                             <Link
//                                 href={href}
//                                 target={href.startsWith("http") ? "_blank" : undefined}
//                                 rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
//                                 className="group bg-white/3 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-yellow-500/30 transition-colors"
//                             >
//                                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
//                                     <Icon size={20} className="text-white/70" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <h3 className="text-white text-sm font-semibold">{title}</h3>
//                                     <p className="text-white/50 text-xs">{description}</p>
//                                 </div>
//                                 <ArrowRight size={18} className="text-white/40 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
//                             </Link>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </main>
//     )
// }


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Clock, Link2, Share2, Globe, Send } from "lucide-react"

const interests = [
    "Fitness Coaching",
    "Spiritual Guidance",
    "Professional Collaboration",
    "Other",
]

export default function ConnectPage() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [interest, setInterest] = useState(interests[0])
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // handle submission
        console.log({ fullName, email, interest, message })
    }

    return (
        <main className="min-h-screen w-full bg-black pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                        Let&apos;s Connect
                    </h1>
                    <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                        Whether you&apos;re looking for fitness coaching, spiritual guidance, or a
                        professional collaboration, I&apos;m here to facilitate the next step in your journey.
                    </p>
                </motion.div>

                {!isFormOpen ? (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Info card */}
                        <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
                            <p className="text-yellow-500 text-[10px] font-semibold tracking-[0.15em] mb-3">
                                STAY DISCIPLINED
                            </p>
                            <p className="text-white text-sm font-medium italic leading-relaxed mb-6">
                                &ldquo;Excellence is not a singular act, but a habit.
                                We are what we repeatedly do.&rdquo;
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <Mail size={14} className="text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-[10px] font-semibold tracking-wide">EMAIL</p>
                                        <p className="text-white text-xs mt-0.5">contact@mabdelhadi.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <MapPin size={14} className="text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-[10px] font-semibold tracking-wide">LOCATION</p>
                                        <p className="text-white text-xs mt-0.5">Global / Remote</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                        <Clock size={14} className="text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-[10px] font-semibold tracking-wide">AVAILABILITY</p>
                                        <p className="text-white text-xs mt-0.5">Mon — Fri, 09:00 - 18:00 EST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Socials + trigger */}
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-white/3 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-yellow-500/30 transition-colors text-left"
                        >
                            <span className="text-white/40 text-[10px] font-semibold tracking-[0.15em]">
                                SOCIALS
                            </span>
                            <div className="flex items-center gap-4 text-white/60">
                                <Link2 size={16} />
                                <Share2 size={16} />
                                <Globe size={16} />
                            </div>
                        </button>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-white/3 border border-white/10 rounded-2xl p-6 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                                        FULL NAME
                                    </label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="w-full bg-white text-black text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                                        EMAIL ADDRESS
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-white text-black text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                                    PRIMARY INTEREST
                                </label>
                                <select
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                >
                                    {interests.map((opt) => (
                                        <option key={opt} value={opt} className="bg-black">
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                                    YOUR MESSAGE
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="How can I help you improve?"
                                    rows={4}
                                    required
                                    className="w-full bg-transparent border-b border-white/10 text-white text-sm placeholder:text-white/30 py-2 focus:outline-none focus:border-yellow-500/50 resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 border border-yellow-500/50 text-yellow-500 text-xs font-semibold tracking-wide px-5 py-2.5 rounded-md hover:bg-yellow-500/10 transition-colors"
                                >
                                    SEND MESSAGE
                                    <Send size={12} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="text-white/40 text-xs hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.form>
                    </AnimatePresence>
                )}
            </div>
        </main>
    )
}