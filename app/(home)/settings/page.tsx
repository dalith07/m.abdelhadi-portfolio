"use client"

import { useState } from "react"
import { User, Lock, Trash2 } from "lucide-react"
import { ProfileSection } from "./profile-section"
import { SecuritySection } from "./security-section"
import { DangerSection } from "./danger-section"


type Tab = "profile" | "security" | "danger"

const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
] as const

export default function SettingsPage() {
    const [tab, setTab] = useState<Tab>("profile")

    return (
        <main className="min-h-screen w-full bg-black px-6 py-22">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-white text-2xl font-bold mb-1">Account Settings</h1>
                    <p className="text-white/40 text-sm">Manage your profile, security and preferences.</p>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar (desktop) */}
                    <div className="w-44 shrink-0 hidden sm:flex flex-col gap-1">
                        {TABS.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setTab(id)}
                                className={`flex items-center hover:cursor-pointer gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${tab === id
                                    ? id === "danger"
                                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                        : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Tabs (mobile) */}
                        <div className="flex sm:hidden gap-2 mb-6 overflow-x-auto">
                            {TABS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setTab(id)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${tab === id
                                        ? id === "danger"
                                            ? "bg-red-500/10 text-red-400 border border-red-500/30"
                                            : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30"
                                        : "text-white/50 border border-white/10"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {tab === "profile" && <ProfileSection />}
                        {tab === "security" && <SecuritySection />}
                        {tab === "danger" && <DangerSection />}
                    </div>
                </div>
            </div>
        </main>
    )
}