import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-slate-900 text-slate-200">
                <SidebarInset className="flex flex-col flex-1 bg-slate-900 text-slate-200">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
