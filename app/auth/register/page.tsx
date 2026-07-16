"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { register } from "@/action/user/register"

export default function RegisterPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        startTransition(async () => {
            const result = await register({ name, email, password })

            if (result?.error) {
                setError(result.error)
                return
            }

            if (result?.success) {
                setSuccess(result.success)

                // sign in client-side after successful registration
                const signInResult = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                })

                if (signInResult?.ok) {
                    router.push("/") // change to your desired redirect
                } else {
                    setError("Registered, but auto sign-in failed. Please log in.")
                }
            }
        })
    }

    return (
        <main className="min-h-screen w-full bg-black flex items-center justify-center px-6 py-24">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-sm"
            >
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/40 text-xs hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={14} />
                    Back to Home
                </Link>
                <div className="text-center mb-8">
                    <h1 className="text-white text-2xl font-bold mb-2">Create Account</h1>
                    <p className="text-white/50 text-sm">Start your journey with discipline.</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
                >
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-md px-3 py-2">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-md px-3 py-2">
                            {success}
                        </div>
                    )}

                    <div>
                        <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                            FULL NAME
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isPending}
                                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md pl-10 pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                            EMAIL ADDRESS
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isPending}
                                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md pl-10 pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                            PASSWORD
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isPending}
                                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md pl-10 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold tracking-wide px-6 py-3 rounded-full hover:bg-white/90 transition-colors mt-2 disabled:opacity-50"
                    >
                        {isPending ? "CREATING..." : "CREATE ACCOUNT"}
                        <UserPlus size={14} />
                    </button>
                </form>

                <p className="text-center text-white/40 text-xs mt-6">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </main>
    )
}