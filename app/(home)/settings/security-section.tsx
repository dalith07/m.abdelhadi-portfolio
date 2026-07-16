"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Lock, Loader2, Check } from "lucide-react"
import { PasswordField } from "./password-field"

export function SecuritySection() {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        if (form.newPassword.length < 6) {
            setError("New password must be at least 6 characters.")
            return
        }
        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        startTransition(async () => {
            // TODO: call your server action, e.g. await changePassword(form)
            await new Promise((r) => setTimeout(r, 700))
            setSuccess(true)
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setTimeout(() => setSuccess(false), 2500)
        })
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-white/3 border border-white/10 rounded-2xl p-6"
        >
            <div className="flex items-center gap-2 mb-1">
                <Lock size={16} className="text-yellow-500" />
                <h2 className="text-white text-sm font-semibold">Security</h2>
            </div>
            <p className="text-white/40 text-xs mb-6">Use a strong password you don&apos;t use elsewhere.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                <PasswordField
                    label="Current Password"
                    value={form.currentPassword}
                    onChange={(v) => setForm((f) => ({ ...f, currentPassword: v }))}
                    show={showCurrent}
                    onToggle={() => setShowCurrent((s) => !s)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PasswordField
                        label="New Password"
                        value={form.newPassword}
                        onChange={(v) => setForm((f) => ({ ...f, newPassword: v }))}
                        show={showNew}
                        onToggle={() => setShowNew((s) => !s)}
                    />
                    <PasswordField
                        label="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(v) => setForm((f) => ({ ...f, confirmPassword: v }))}
                        show={showNew}
                    />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold tracking-wide px-6 py-3 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                        {isPending ? <Loader2 size={14} className="animate-spin" /> : "UPDATE PASSWORD"}
                    </button>
                    {success && (
                        <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1.5 text-green-400 text-xs"
                        >
                            <Check size={14} /> Updated
                        </motion.span>
                    )}
                </div>
            </form>
        </motion.section>
    )
}