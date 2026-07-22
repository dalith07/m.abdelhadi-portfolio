"use client"

import { useState, useRef, useEffect } from "react"
import type { ElementType } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, UserPlus, User, Settings, LogOut, Crown, Star, LayoutDashboard, ChevronRight } from "lucide-react"
import { signOut } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

const roleStyles: Record<string, string> = {
    ADMIN: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    VIP_USER: "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20",
}

function MenuItem({
    href,
    onClick,
    icon: Icon,
    label,
    variant = "default",
}: {
    href?: string
    onClick?: () => void
    icon: ElementType
    label: string
    variant?: "default" | "accent" | "danger"
}) {
    const colorClass =
        variant === "accent"
            ? "text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
            : variant === "danger"
                ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                : "text-white/70 hover:text-white hover:bg-white/5"

    const content = (
        <>
            <span className="flex items-center gap-3">
                <Icon size={16} />
                <span className="text-[13px] sm:text-sm">{label}</span>
            </span>
            <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all sm:block hidden" />
        </>
    )

    const className = `group w-full flex items-center justify-between gap-3 px-3.5 py-3 sm:py-2.5 rounded-xl text-sm transition-colors hover:cursor-pointer ${colorClass}`

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={className}>
                {content}
            </Link>
        )
    }
    return (
        <button onClick={onClick} className={className}>
            {content}
        </button>
    )
}

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

        const isMobile = window.innerWidth < 640
        if (isMobile) document.body.style.overflow = "hidden"

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflow = ""
        }
    }, [isOpen])

    const getBadge = () => {
        if (user?.role === "ADMIN") {
            return (
                <span className="absolute -top-1 -right-1 text-yellow-500 z-10">
                    <Crown size={14} className="animate-pulse drop-shadow-[0_0_4px_rgba(234,179,8,0.8)]" />
                </span>
            )
        }
        if (user?.role === "VIP_USER") {
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

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Mobile backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm sm:hidden"
                        />

                        {/* Panel: bottom sheet on mobile, dropdown on desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="
                                fixed sm:absolute
                                bottom-0 left-0 right-0 sm:bottom-auto sm:left-auto
                                sm:right-0 sm:top-full sm:mt-3
                                z-50
                                w-full sm:w-72
                                bg-background
                                border border-white/10
                                rounded-t-3xl sm:rounded-2xl
                                p-3 sm:p-2
                                pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-2
                                shadow-[0_-10px_40px_rgba(0,0,0,0.5)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                                origin-top-right
                            "
                        >
                            {/* mobile drag handle */}
                            <div className="sm:hidden w-10 h-1 bg-white/15 rounded-full mx-auto mb-3" />

                            {user ? (
                                <>
                                    <div className="px-3.5 py-2 flex items-center gap-2 text-white/40 text-[10px] font-semibold tracking-[0.15em] border-b border-white/5 mb-1">
                                        <User size={12} />
                                        MY ACCOUNT
                                    </div>

                                    <div className="px-3.5 py-3 mb-1 border-b border-white/5 flex items-center gap-3">
                                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                                            <Image
                                                src={user.image || "/logo_user.png"}
                                                alt="avatar"
                                                fill
                                                sizes="44px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                                                {user.role && user.role !== "USER" && (
                                                    <span
                                                        className={`text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full whitespace-nowrap ${roleStyles[user.role] ?? "bg-white/10 text-white/60"
                                                            }`}
                                                    >
                                                        {user.role.replace("_", " ")}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-white/40 text-xs truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        {user.role === "ADMIN" && (
                                            <MenuItem
                                                href="/dashboard"
                                                onClick={() => setIsOpen(false)}
                                                icon={LayoutDashboard}
                                                label="Dashboard"
                                                variant="accent"
                                            />
                                        )}

                                        <MenuItem
                                            href="/settings"
                                            onClick={() => setIsOpen(false)}
                                            icon={Settings}
                                            label="Settings"
                                        />

                                        <MenuItem
                                            onClick={() => {
                                                setIsOpen(false)
                                                signOut()
                                            }}
                                            icon={LogOut}
                                            label="Logout"
                                            variant="danger"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="px-3.5 py-2 flex items-center gap-2 text-white/40 text-[10px] font-semibold tracking-[0.15em] border-b border-white/5 mb-1">
                                        <User size={12} />
                                        MY ACCOUNT
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <MenuItem
                                            href="/auth/login"
                                            onClick={() => setIsOpen(false)}
                                            icon={LogIn}
                                            label="Login"
                                        />
                                        <MenuItem
                                            href="/auth/register"
                                            onClick={() => setIsOpen(false)}
                                            icon={UserPlus}
                                            label="Register"
                                        />
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}