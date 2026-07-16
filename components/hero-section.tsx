"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function HeroSection() {
    return (
        <section className="w-full min-h-screen bg-black px-6 mt-12 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                            <span className="text-yellow-500 text-xs font-semibold tracking-[0.2em]">WELCOME</span>
                            <span className="w-8 h-px bg-yellow-500/50" />
                        </div>

                        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Mohammed
                        </h1>
                        <h1 className="text-yellow-500 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Abdelhadi
                        </h1>

                        <p className="text-white/70 text-sm sm:text-base mb-3">
                            Discipline • Faith • Fitness • Self-Improvement
                        </p>

                        <p className="text-white/50 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Helping people become stronger physically, mentally, and spiritually.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 shrink-0"
                    >
                        <div className="w-full h-full rounded-full ring-2 ring-yellow-500/60 shadow-[0_0_60px_rgba(234,179,8,0.15)]">
                            <Image
                                src="/m.abdelhadi.png"
                                alt="Mohammed Abdelhadi"
                                width={500}
                                height={500}
                                priority
                                className="w-full pb-8 h-full scale-125 object-cover"
                            />
                            <div className="absolute -bottom-4 left-0 right-0 h-16 sm:h-20 bg-linear-to-t from-black via-black/80 to-transparent" />
                        </div>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 shrink-0"
                    >
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 rounded-full ring-2 ring-yellow-500/60 shadow-[0_0_60px_rgba(234,179,8,0.15)] z-20 pointer-events-none" />

                            <div className="absolute -inset-8 sm:-inset-10 lg:-inset-12 overflow-hidden">
                                <Image
                                    src="/m.abdelhadi.png"
                                    alt="Mohammed Abdelhadi"
                                    width={600}
                                    height={600}
                                    priority
                                    className="w-full h-full sc125 object-contain"
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-linear-to-t from-black via-black/80 to-transparent" />
                            </div>
                        </div>
                    </motion.div> */}

                </div>
            </div>
        </section>
    )
}