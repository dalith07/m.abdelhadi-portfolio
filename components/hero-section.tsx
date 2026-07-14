"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AiFillTikTok } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { Button } from './ui/button'


const HeroSection = () => {
    return (
        <section className="dark relative isolate min-h-screen w-full overflow-hidden bg-black flex items-center">

            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] animate-pulse [animation-delay:1s]"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-8 py-24 lg:py-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">

                        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Mohammed Abdelhadi
                        </h1>

                        <p className="text-white/60 text-sm sm:text-base max-w-xs sm:max-w-md lg:max-w-lg mb-8 leading-relaxed">
                            Building a life of intentionality through the fusion of Faith, Fitness, and consistent Professional Excellence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button >
                                    WORK WITH ME
                                    <ArrowRight size={14} />
                                </Button>
                            </Link>
                            <Link href="/wisdom" className="w-full sm:w-auto">
                                <Button variant="outline">
                                    DAILY WISDOM
                                </Button>
                            </Link>
                        </div>

                        <div className='flex items-center justify-center gap-4'>
                            <div >
                                <Link href="https://www.linkedin.com/in/mohamed-ali-theiri-274540311" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-blue-500 transition-colors">
                                    <AiFillTikTok size={20} />
                                </Link>
                            </div>

                            <div >
                                <Link href="https://www.linkedin.com/in/mohamed-ali-theiri-274540311" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-blue-500 transition-colors">
                                    <FiInstagram size={20} />
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-yellow-500/60 p-1.5">
                            <Image
                                src="/M.abdelhadi.png"
                                alt="Mohammed Abdelhadi"
                                width={400}
                                height={400}
                                priority
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-500 flex items-center justify-center ring-2 ring-black">
                            <span className="text-black text-sm animate-pulse">★</span>
                        </div>
                    </div>

                </div>
            </div>

        </section >
    )
}

export default HeroSection