"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export default function Header() {
    const pathname = usePathname()

    const navLinks = [
        { href: "/", label: "HOME" },
        { href: "/wisdom", label: "WISDOM" },
        { href: "/fitness", label: "FITNESS" },
        { href: "/connect", label: "CONNECT" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-black">
            <nav className="container mx-auto flex items-center justify-between px-6 py-5">
                {/* Logo / Wordmark */}
                <Link href="/" className="text-white font-semibold tracking-[0.2em] text-sm">
                    M. ABDELHADI
                </Link>

                {/* Nav links */}
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

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-primary/80">
                    <Image
                        src="/logo_user.png"
                        alt="profile"
                        width={36}
                        height={36}
                        className="object-cover w-full h-full hover:cursor-pointer"
                    />
                </div>
            </nav>
        </header>
    )
}