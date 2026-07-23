"use client"

import { BarChart3, Users as UsersIcon, MessageSquare, Settings, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

export type NavId = "analytics" | "users" | "messages" | "settings"

const navItems: { id: NavId; label: string; icon: typeof BarChart3 }[] = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Users", icon: UsersIcon },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
    active: NavId
    onChange: (id: NavId) => void
    mobileOpen?: boolean
    onMobileOpenChange?: (open: boolean) => void
}

function SidebarNav({
    active,
    onChange,
}: {
    active: NavId
    onChange: (id: NavId) => void
}) {
    return (
        <>
            <div className="side-item flex items-center gap-3 mb-8 px-4 pt-4 md:px-0 md:pt-0">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 shrink-0" />
                <div className="min-w-0">
                    <p className="text-sm font-medium text-amber-400 truncate">M. Abdelhadi</p>
                    <p className="text-xs text-slate-500">Brand Admin</p>
                </div>
            </div>

            <nav className="flex flex-col gap-1 flex-1 px-2 md:px-0">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = active === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => onChange(item.id)}
                            className={`nav-item hover:cursor-pointer side-item flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-left transition-colors ${isActive ? "active bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                        >
                            <Icon size={16} className="shrink-0" />
                            {item.label}
                        </button>
                    )
                })}
            </nav>

            <div className="side-item flex flex-col gap-2 px-2 pb-4 md:px-0 md:pb-0">
                <button className="border border-slate-700 rounded-md py-2 text-xs text-slate-300 hover:bg-slate-800 transition-colors">
                    Support Portal
                </button>
                <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 px-1 transition-colors">
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>
        </>
    )
}

export default function Sidebar({
    active,
    onChange,
    mobileOpen = false,
    onMobileOpenChange,
}: SidebarProps) {
    const handleChange = (id: NavId) => {
        onChange(id)
        onMobileOpenChange?.(false)
    }

    return (
        <>
            <aside className="hidden md:flex w-60 shrink-0 border-r border-slate-800 bg-slate-900 flex-col p-4 sticky top-0 h-screen overflow-y-auto">
                <SidebarNav active={active} onChange={handleChange} />
            </aside>

            <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
                <SheetContent
                    side="left"
                    className="w-[min(100vw-2rem,18rem)] border-slate-800 bg-slate-900 p-0 text-slate-200"
                >
                    <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                    <div className="flex h-full flex-col">
                        <SidebarNav active={active} onChange={handleChange} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
