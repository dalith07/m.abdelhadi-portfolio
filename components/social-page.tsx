// "use client"

// import Link from "next/link"
// import { motion } from "framer-motion"
// import { ArrowRight } from "lucide-react"
// import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa"

// const socials = [
//     { icon: FaInstagram, label: "Instagram", href: "https://instagram.com", color: "text-pink-500" },
//     { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com", color: "text-white" },
//     { icon: FaYoutube, label: "YouTube", href: "https://youtube.com", color: "text-red-500" },
//     { icon: FaFacebook, label: "Facebook", href: "https://facebook.com", color: "text-blue-500" },
// ]

// export default function SocialPage() {
//     return (
//         <section className="w-full bg-black px-6 py-16">
//             <div className="max-w-4xl mx-auto">
//                 <div className="flex items-center justify-center gap-4 mb-8">
//                     <span className="w-10 h-px bg-yellow-500/40" />
//                     <h2 className="text-white text-xl font-semibold">Social Links</h2>
//                     <span className="w-10 h-px bg-yellow-500/40" />
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                     {socials.map(({ icon: Icon, label, href, color }, i) => (
//                         <motion.div
//                             key={label}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4, delay: i * 0.08 }}
//                             viewport={{ once: true }}
//                         >
//                             <Link
//                                 href={href}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="group bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-yellow-500/30 transition-colors"
//                             >
//                                 <Icon size={26} className={color} />
//                                 <span className="text-white/80 text-sm flex items-center gap-1.5">
//                                     {label}
//                                     <ArrowRight size={12} className="text-white/40 group-hover:translate-x-1 transition-transform" />
//                                 </span>
//                             </Link>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }


"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa"

const socials = [
    {
        icon: FaInstagram,
        label: "Instagram",
        href: "https://instagram.com",
        color: "text-pink-500",
        hoverBg: "hover:bg-gradient-to-br hover:from-yellow-500/20 hover:via-pink-500/20 hover:to-purple-600/20",
        hoverBorder: "hover:border-pink-500/40",
    },
    {
        icon: FaTiktok,
        label: "TikTok",
        href: "https://tiktok.com",
        color: "text-white",
        hoverBg: "hover:bg-gradient-to-br hover:from-cyan-400/20 hover:via-white/10 hover:to-pink-500/20",
        hoverBorder: "hover:border-cyan-400/40",
    },
    {
        icon: FaYoutube,
        label: "YouTube",
        href: "https://youtube.com",
        color: "text-red-500",
        hoverBg: "hover:bg-red-500/10",
        hoverBorder: "hover:border-red-500/40",
    },
    {
        icon: FaFacebook,
        label: "Facebook",
        href: "https://facebook.com",
        color: "text-blue-500",
        hoverBg: "hover:bg-blue-500/10",
        hoverBorder: "hover:border-blue-500/40",
    },
]

export default function SocialPage() {
    return (
        <section className="w-full bg-black px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="w-10 h-px bg-yellow-500/40" />
                    <h2 className="text-white text-xl font-semibold">Social Links</h2>
                    <span className="w-10 h-px bg-yellow-500/40" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {socials.map(({ icon: Icon, label, href, color, hoverBg, hoverBorder }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-500 ${hoverBg} ${hoverBorder}`}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15, rotate: 8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                                >
                                    <Icon size={26} className={`${color} transition-transform duration-500 group-hover:drop-shadow-[0_0_10px_currentColor]`} />
                                </motion.div>
                                <span className="text-white/80 text-sm flex items-center gap-1.5 group-hover:text-white transition-colors">
                                    {label}
                                    <ArrowRight size={12} className="text-white/40 group-hover:translate-x-1 group-hover:text-white/80 transition-all" />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}