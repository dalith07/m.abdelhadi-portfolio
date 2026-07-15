// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { usePathname } from "next/navigation"
// import clsx from "clsx"

// export default function Header() {
//     const pathname = usePathname()

//     const navLinks = [
//         { href: "/", label: "HOME" },
//         { href: "/wisdom", label: "WISDOM" },
//         { href: "/fitness", label: "FITNESS" },
//         { href: "/connect", label: "CONNECT" },
//     ]

//     return (
//         <header className="fixed top-0 left-0 right-0 z-40 bg-black">
//             <nav className="container mx-auto flex items-center justify-between px-6 py-5">
//                 {/* Logo / Wordmark */}
//                 <Link href="/" className="text-white font-semibold tracking-[0.2em] text-sm">
//                     M. ABDELHADI
//                 </Link>

//                 {/* Nav links */}
//                 <div className="hidden md:flex items-center gap-10">
//                     {navLinks.map(({ href, label }) => {
//                         const active = pathname === href
//                         return (
//                             <Link
//                                 key={href}
//                                 href={href}
//                                 className={clsx(
//                                     "relative text-xs font-medium tracking-[0.15em] pb-1 transition-colors",
//                                     active ? "text-white" : "text-white/50 hover:text-white"
//                                 )}
//                             >
//                                 {label}
//                                 {active && (
//                                     <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white" />
//                                 )}
//                             </Link>
//                         )
//                     })}
//                 </div>

//                 {/* Avatar */}
//                 <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-primary/80">
//                     <Image
//                         src="/logo_user.png"
//                         alt="profile"
//                         width={36}
//                         height={36}
//                         className="object-cover w-full h-full hover:cursor-pointer"
//                     />
//                 </div>
//             </nav>
//         </header>
//     )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import clsx from "clsx"

export default function Header() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: "/", label: "HOME" },
        { href: "/wisdom", label: "WISDOM" },
        { href: "/fitness", label: "FITNESS" },
        { href: "/connect", label: "CONNECT" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black">
            <nav className="container mx-auto flex items-center justify-between px-6 py-5">
                {/* Logo / Wordmark */}
                <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white font-semibold tracking-[0.2em] text-sm"
                >
                    M. ABDELHADI
                </Link>

                {/* Nav links - desktop */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map(({ href, label }) => {
                        const active = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={clsx(
                                    "relative text-xs font-medium tracking-[0.15em] pb-1 transition-colors",
                                    active ? "text-white" : "text-white/50 hover:text-white"
                                )}
                            >
                                {label}
                                {active && (
                                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white" />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Right cluster */}
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-1 ring-primary/80 shrink-0">
                        <Image
                            src="/logo_user.png"
                            alt="profile"
                            width={36}
                            height={36}
                            className="object-cover w-full h-full hover:cursor-pointer"
                        />
                    </div>

                    {/* Hamburger - mobile only */}
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="md:hidden text-white z-50"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={22} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={22} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-black border-t border-white/10"
                    >
                        <div className="flex flex-col px-6 py-6 gap-1">
                            {navLinks.map(({ href, label }, i) => {
                                const active = pathname === href
                                return (
                                    <motion.div
                                        key={href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={clsx(
                                                "block text-sm font-medium tracking-[0.15em] py-3 border-b border-white/5 transition-colors",
                                                active ? "text-yellow-500" : "text-white/60 hover:text-white"
                                            )}
                                        >
                                            {label}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}