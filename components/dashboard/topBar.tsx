// "use client"

// import { Search, RefreshCw, Bell, Menu } from "lucide-react"

// interface TopbarProps {
//     onMenuClick?: () => void
// }

// export default function Topbar({ onMenuClick }: TopbarProps) {
//     return (
//         <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex min-w-0 items-center gap-2">
//                 <button
//                     type="button"
//                     onClick={onMenuClick}
//                     className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:bg-slate-800 md:hidden"
//                     aria-label="Open navigation menu"
//                 >
//                     <Menu size={18} />
//                 </button>

//                 <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 sm:max-w-xs md:w-72">
//                     <Search size={14} className="shrink-0 text-slate-500" />
//                     <input
//                         placeholder="Search analytics..."
//                         className="w-full min-w-0 bg-transparent text-xs text-slate-300 outline-none placeholder:text-slate-600"
//                     />
//                 </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 text-slate-500">
//                 <RefreshCw size={16} className="cursor-pointer hover:text-slate-300" />
//                 <Bell size={16} className="cursor-pointer hover:text-slate-300" />
//                 <div className="h-7 w-7 shrink-0 rounded-full bg-slate-700" />
//             </div>
//         </div>
//     )
// }


"use client"

import { Search, RefreshCw, Bell, Menu, Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface TopbarProps {
    onMenuClick?: () => void
    onRefresh?: () => void | Promise<void>
}

export default function Topbar({ onMenuClick, onRefresh }: TopbarProps) {
    const [spinning, setSpinning] = useState(false)

    const handleRefresh = async () => {
        if (!onRefresh || spinning) return
        setSpinning(true)
        await onRefresh()
        setSpinning(false)
    }

    return (
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:bg-slate-800 md:hidden"
                    aria-label="Open navigation menu"
                >
                    <Menu size={18} />
                </button>

                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 sm:max-w-xs md:w-72">
                    <Search size={14} className="shrink-0 text-slate-500" />
                    <input
                        placeholder="Search analytics..."
                        className="w-full min-w-0 bg-transparent text-xs text-slate-300 outline-none placeholder:text-slate-600"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 text-slate-500">
                <RefreshCw
                    size={16}
                    onClick={handleRefresh}
                    className={`cursor-pointer hover:text-slate-300 ${spinning ? "animate-spin" : ""}`}
                />
                <Bell size={16} className="cursor-pointer hover:text-slate-300" />
                {/* <div className="h-7 w-7 shrink-0 rounded-full bg-slate-700" /> */}
                <Link href={"/"}>
                    <Home size={16} className="hover:cursor-pointer hover:text-primary duration-500" />
                </Link>
            </div>
        </div>
    )
}