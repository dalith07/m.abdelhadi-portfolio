/* eslint-disable prefer-const */
"use client"

import { ReactNode, useEffect, useState } from "react"
import Loading from "@/app/loading"

const MIN_LOADING_MS = 900
const MAX_LOADING_MS = 3500

export default function AppLoader({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const startedAt = Date.now()
    let minTimer: ReturnType<typeof setTimeout> | undefined
    let maxTimer: ReturnType<typeof setTimeout> | undefined

    const reveal = () => {
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed)

      minTimer = setTimeout(() => setIsReady(true), remaining)
    }

    maxTimer = setTimeout(() => setIsReady(true), MAX_LOADING_MS)

    if (document.readyState === "complete") {
      reveal()
    } else {
      window.addEventListener("load", reveal, { once: true })
    }

    return () => {
      if (minTimer) clearTimeout(minTimer)
      if (maxTimer) clearTimeout(maxTimer)
      window.removeEventListener("load", reveal)
    }
  }, [])

  if (!isReady) {
    return <Loading />
  }

  return <>{children}</>
}
