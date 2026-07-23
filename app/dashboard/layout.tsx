import type React from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-200">
            {children}
        </div>
    )
}
