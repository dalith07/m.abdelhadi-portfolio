"use client"

import { Search, RefreshCw, Bell } from "lucide-react"

export default function Topbar() {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 w-72">
                <Search size={14} className="text-slate-500" />
                <input
                    placeholder="Search analytics..."
                    className="bg-transparent text-xs text-slate-300 placeholder:text-slate-600 outline-none w-full"
                />
            </div>
            <div className="flex items-center gap-3 text-slate-500">
                <RefreshCw size={16} className="cursor-pointer hover:text-slate-300" />
                <Bell size={16} className="cursor-pointer hover:text-slate-300" />
                <div className="w-7 h-7 rounded-full bg-slate-700" />
            </div>
        </div>
    )
}