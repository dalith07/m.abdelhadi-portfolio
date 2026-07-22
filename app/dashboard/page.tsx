"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { gsap } from "gsap"
import Sidebar, { NavId } from "@/components/dashboard/sideBar"
import Analytics from "@/components/dashboard/Analytics"
import Users from "@/components/dashboard/Users"
import Messages from "@/components/dashboard/Messages"
import SettingsSection from "@/components/dashboard/SettingsSection"
import Topbar from "@/components/dashboard/topBar"

const sections: Record<NavId, React.ComponentType> = {
    analytics: Analytics,
    users: Users,
    messages: Messages,
    settings: SettingsSection,
}

const validTabs: NavId[] = ["analytics", "users", "messages", "settings"]

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const containerRef = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)

    const tabFromUrl = searchParams.get("tab") as NavId | null
    const active: NavId = tabFromUrl && validTabs.includes(tabFromUrl) ? tabFromUrl : "analytics"

    const handleChange = (id: NavId) => {
        router.push(`?tab=${id}`, { scroll: false })
    }

    // Sidebar entrance — runs once
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".side-item", { opacity: 0, x: -12 })
            gsap.to(".side-item", { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" })

            document.querySelectorAll<HTMLElement>(".nav-item").forEach((n) => {
                n.addEventListener("mouseenter", () => {
                    if (!n.classList.contains("active")) gsap.to(n, { backgroundColor: "rgba(148,163,184,0.08)", duration: 0.2 })
                })
                n.addEventListener("mouseleave", () => {
                    if (!n.classList.contains("active")) gsap.to(n, { backgroundColor: "transparent", duration: 0.2 })
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // Content entrance — reruns every time the active section changes
    useEffect(() => {
        let ctx: gsap.Context | undefined

        const raf = requestAnimationFrame(() => {
            ctx = gsap.context(() => {
                gsap.set("#eyebrow, #main-title", { opacity: 0, y: 8 })
                gsap.set(".stat-card", { opacity: 0, y: 14 })
                gsap.set("#chartcard, #distcard, #contentcard", { opacity: 0, y: 14 })
                gsap.set("#growthline", { strokeDasharray: 600, strokeDashoffset: 600 })

                const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
                tl.to("#eyebrow, #main-title", { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 })
                    .to(".stat-card", { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.15")
                    .to("#chartcard, #distcard, #contentcard", { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, "-=0.2")
                    .to("#growthline", { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, "-=0.3")

                document.querySelectorAll<HTMLElement>("[data-target]").forEach((el) => {
                    const target = parseFloat(el.getAttribute("data-target") || "0")
                    const suffix = el.getAttribute("data-suffix") || ""
                    const dec = parseInt(el.getAttribute("data-decimal") || "0")
                    const obj = { val: 0 }
                    gsap.to(obj, {
                        val: target,
                        duration: 1.2,
                        delay: 0.4,
                        ease: "power2.out",
                        onUpdate: () => {
                            el.textContent = obj.val.toFixed(dec) + suffix
                        },
                    })
                })

                document.querySelectorAll<HTMLElement>(".stat-card").forEach((c) => {
                    c.addEventListener("mouseenter", () => gsap.to(c, { y: -3, duration: 0.2, borderColor: "rgb(100 116 139)" }))
                    c.addEventListener("mouseleave", () => gsap.to(c, { y: 0, duration: 0.2, borderColor: "rgb(51 65 85)" }))
                })
            }, mainRef)
        })

        return () => {
            cancelAnimationFrame(raf)
            ctx?.revert()
        }
    }, [active])

    const ActiveSection = sections[active]

    return (
        <div ref={containerRef} className="flex min-h-screen w-full bg-slate-950 text-slate-200">
            <Sidebar active={active} onChange={handleChange} />

            <main ref={mainRef} className="flex-1 p-6 overflow-y-auto">
                <Topbar />
                <ActiveSection />
            </main>
        </div>
    )
}

export default Page

