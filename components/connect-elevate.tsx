import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Instagram, Briefcase } from "lucide-react"

const ConnectElevate = () => {
    return (
        <section className="dark w-full bg-background py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-white text-2xl font-bold text-center mb-10">
                    Connect & Elevate
                </h2>

                {/* Two feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Link
                        href="/coaching"
                        className="group bg-white/3 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-yellow-500/30 transition-colors"
                    >
                        <div className="w-14 h-14 rounded-xl bg-white/5 overflow-hidden shrink-0 relative">
                            <Image src="/coaching.jpg" alt="Performance Coaching" fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white text-sm font-semibold mb-1">Performance Coaching</h3>
                            <p className="text-white/50 text-xs">Tailored fitness and mindset protocols.</p>
                        </div>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-yellow-500 transition-colors" />
                    </Link>

                    <Link
                        href="/newsletter"
                        className="group bg-white/3 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-yellow-500/30 transition-colors"
                    >
                        <div className="w-14 h-14 rounded-xl bg-white/5 overflow-hidden shrink-0 relative">
                            <Image src="/newsletter.jpg" alt="The Weekly Vibe" fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white text-sm font-semibold mb-1">The Weekly Vibe</h3>
                            <p className="text-white/50 text-xs">Insights on faith, habits, and success.</p>
                        </div>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-yellow-500 transition-colors" />
                    </Link>
                </div>

                {/* Two social links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="https://instagram.com/m.abdelhadi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/3 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-yellow-500/30 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <Instagram size={18} className="text-white/70" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white text-sm font-semibold">Instagram</h3>
                            <p className="text-white/50 text-xs">@m.abdelhadi</p>
                        </div>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-yellow-500 transition-colors" />
                    </Link>

                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/3 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-yellow-500/30 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <Briefcase size={18} className="text-white/70" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white text-sm font-semibold">Professional</h3>
                            <p className="text-white/50 text-xs">Connect on LinkedIn</p>
                        </div>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-yellow-500 transition-colors" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ConnectElevate