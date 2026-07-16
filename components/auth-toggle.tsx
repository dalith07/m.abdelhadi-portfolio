// "use client"

// import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { LogIn, UserPlus, User } from "lucide-react"

// export default function AuthMenu() {
//     const [isOpen, setIsOpen] = useState(false)
//     const menuRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         if (!isOpen) return

//         const handleClickOutside = (event: MouseEvent) => {
//             if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//                 setIsOpen(false)
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside)
//         return () => document.removeEventListener("mousedown", handleClickOutside)
//     }, [isOpen])

//     return (
//         <div className="relative" ref={menuRef}>
//             {/* Avatar */}
//             <button
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-1 ring-primary/80 shrink-0 block"
//             >
//                 <Image
//                     src="/logo_user.png"
//                     alt="profile"
//                     width={36}
//                     height={36}
//                     className="object-cover w-full h-full hover:cursor-pointer"
//                 />
//             </button>

//             {/* Dropdown */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2, ease: "easeOut" }}
//                         className="absolute right-0 mt-5 w-56 bg-black border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] origin-top-right"
//                     >
//                         <div className="px-3 py-2 flex items-center gap-2 text-white/40 text-[10px] font-semibold tracking-[0.15em] border-b border-white/5 mb-1">
//                             <User size={12} />
//                             MY ACCOUNT:
//                         </div>

//                         <Link
//                             href="/auth/login"
//                             onClick={() => setIsOpen(false)}
//                             className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
//                         >
//                             <LogIn size={16} />
//                             Login
//                         </Link>

//                         <Link
//                             href="/auth/register"
//                             onClick={() => setIsOpen(false)}
//                             className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
//                         >
//                             <UserPlus size={16} />
//                             Register
//                         </Link>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }


"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, UserPlus, User, Settings, LogOut, Crown, Star } from "lucide-react"
import { signOut } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function AuthMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const user = useCurrentUser()

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    const getBadge = () => {
        if (user?.role === "ADMIN") {
            return (
                <span className="absolute -top-1 -right-1 text-yellow-500 z-10">
                    <Crown size={14} className="animate-pulse drop-shadow-[0_0_4px_rgba(234,179,8,0.8)]" />
                </span>
            )
        }
        if (user?.role === 'VIP_USER') {
            return (
                <span className="absolute -top-1 -right-1 text-fuchsia-400 z-10">
                    <Star size={13} className="animate-pulse drop-shadow-[0_0_4px_rgba(232,121,249,0.8)]" />
                </span>
            )
        }
        return null
    }

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-1 ring-primary/80 shrink-0 block"
            >
                <Image
                    src={user?.image || "/logo_user.png"}
                    alt="profile"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full hover:cursor-pointer"
                />
                {getBadge()}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-5 w-64 bg-black border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] origin-top-right"
                    >
                        {user ? (
                            <>
                                <div className="px-3 py-2 flex items-center gap-2 text-white/40 text-[10px] font-semibold tracking-[0.15em] border-b border-white/5 mb-1">
                                    <User size={12} />
                                    MY ACCOUNT
                                </div>
                                <div className="px-3 pb-2 mb-1 border-b border-white/5">
                                    <p className="text-white text-sm font-medium truncate">{user.name}</p>
                                    <p className="text-white/40 text-xs truncate">{user.email}</p>
                                    {user.role && user.role !== "USER" && (
                                        <span
                                            className={`inline-block mt-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${user.role === "ADMIN"
                                                ? "bg-yellow-500/10 text-yellow-500"
                                                : "bg-fuchsia-500/10 text-fuchsia-400"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href="/settings"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <Settings size={16} />
                                    Settings
                                </Link>

                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        signOut()
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="px-3 py-2 flex items-center gap-2 text-white/40 text-[10px] font-semibold tracking-[0.15em] border-b border-white/5 mb-1">
                                    <User size={12} />
                                    MY ACCOUNT
                                </div>

                                <Link
                                    href="/auth/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <LogIn size={16} />
                                    Login
                                </Link>

                                <Link
                                    href="/auth/register"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <UserPlus size={16} />
                                    Register
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}