"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Trash2, Loader2 } from "lucide-react"

export function DangerSection() {
    const [isPending, startTransition] = useTransition()
    const [confirmText, setConfirmText] = useState("")

    const handleDelete = () => {
        if (confirmText !== "DELETE") return
        startTransition(async () => {
            // TODO: call your server action, e.g. await deleteAccount()
            await new Promise((r) => setTimeout(r, 700))
        })
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6"
        >
            <div className="flex items-center gap-2 mb-1">
                <Trash2 size={16} className="text-red-400" />
                <h2 className="text-red-400 text-sm font-semibold">Danger Zone</h2>
            </div>
            <p className="text-white/40 text-xs mb-6">
                This action is permanent and cannot be undone. All your data will be erased.
            </p>

            <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                TYPE &quot;DELETE&quot; TO CONFIRM
            </label>
            <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 mb-4 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
            />

            <button
                onClick={handleDelete}
                disabled={confirmText !== "DELETE" || isPending}
                className="flex items-center justify-center gap-2 bg-red-500 text-white text-xs font-semibold tracking-wide px-6 py-3 rounded-full hover:bg-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : "DELETE MY ACCOUNT"}
                <Trash2 size={14} />
            </button>
        </motion.section>
    )
}