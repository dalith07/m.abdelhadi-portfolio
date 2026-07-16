"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.12),transparent_60%)]"
      />

      {/* Logo / initials mark */}
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border border-yellow-500/20 border-t-yellow-500/80"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-white/5 border-b-white/20"
          />
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-white text-lg font-bold tracking-tight">MA</span>
          </div>
        </motion.div>

        {/* Loading text with animated dots */}
        <div className="flex items-center gap-1.5">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-xs font-semibold tracking-[0.3em]"
          >
            LOADING
          </motion.span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 rounded-full bg-yellow-500"
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/2 h-full bg-linear-to-r from-transparent via-yellow-500 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}