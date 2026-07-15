"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" w-full bg-background border-t border-white/10">
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center text-center">

                <h2 className="text-white text-sm font-semibold tracking-[0.15em] mb-4">
                    M. ABDELHADI
                </h2>

                <p className="text-yellow-500/70 text-sm font-medium mb-6">
                    Keep improving. One step every day.
                </p>

                <div className="flex items-center gap-6 mb-8">
                    <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                        Privacy
                    </Link>
                    <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                        Terms
                    </Link>
                    <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                        Contact
                    </Link>
                </div>

                <p className="text-white/30 text-xs">
                    © {new Date().getFullYear()} M.Ali Theiri. ALL RIGHTS RESERVED.
                </p>

            </div>
        </footer>
    );
}