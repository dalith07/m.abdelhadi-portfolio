// // "use client"

// import { getUsers, getUserStats } from "@/action/user/getUsers"
// import UsersTable from "./UsersTable"

// // const users = [
// //     { name: "Sara K.", handle: "@sara.k", joined: "Jun 02, 2026", status: "Active" },
// //     { name: "Ahmed B.", handle: "@ahmed.b", joined: "May 28, 2026", status: "Active" },
// //     { name: "Anonymous", handle: "guest_2214", joined: "Jul 10, 2026", status: "Guest" },
// //     { name: "Yassmine T.", handle: "@yassmine.t", joined: "Apr 15, 2026", status: "Inactive" },
// //     { name: "Karim H.", handle: "@karim.h", joined: "Jul 01, 2026", status: "Active" },
// // ]

// // const statusStyle: Record<string, string> = {
// //     Active: "bg-teal-500/15 text-teal-400",
// //     Guest: "bg-slate-500/15 text-slate-400",
// //     Inactive: "bg-red-500/15 text-red-400",
// // }

// // export default function Users() {
// //     return (
// //         <div>
// //             <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
// //                 Community
// //             </p>
// //             <h1 id="main-title" className="text-2xl font-semibold text-white mb-6">
// //                 Users
// //             </h1>

// //             <div className="grid grid-cols-3 gap-3 mb-4">
// //                 <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
// //                     <p className="text-xs text-slate-500 mb-2">Total users</p>
// //                     <p className="text-xl font-semibold text-white" data-target="1284" data-decimal="0" data-suffix="">
// //                         0
// //                     </p>
// //                 </div>
// //                 <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
// //                     <p className="text-xs text-slate-500 mb-2">Active this week</p>
// //                     <p className="text-xl font-semibold text-white" data-target="412" data-decimal="0" data-suffix="">
// //                         0
// //                     </p>
// //                 </div>
// //                 <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
// //                     <p className="text-xs text-slate-500 mb-2">New signups</p>
// //                     <p className="text-xl font-semibold text-white" data-target="37" data-decimal="0" data-suffix="">
// //                         0
// //                     </p>
// //                 </div>
// //             </div>

// //             <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
// //                 <p className="text-sm font-medium text-slate-200 mb-3">All users</p>
// //                 <table className="w-full text-xs">
// //                     <thead>
// //                         <tr className="text-slate-500 border-b border-slate-800">
// //                             <th className="text-left font-normal py-2">Name</th>
// //                             <th className="text-left font-normal py-2">Handle</th>
// //                             <th className="text-left font-normal py-2">Joined</th>
// //                             <th className="text-left font-normal py-2">Status</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {users.map((u) => (
// //                             <tr key={u.handle} className="border-b border-slate-800/60 text-slate-300">
// //                                 <td className="py-2 pr-2">{u.name}</td>
// //                                 <td className="py-2 text-slate-400">{u.handle}</td>
// //                                 <td className="py-2">{u.joined}</td>
// //                                 <td className="py-2">
// //                                     <span className={`px-2 py-0.5 rounded-full text-[11px] ${statusStyle[u.status]}`}>
// //                                         {u.status}
// //                                     </span>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     )
// // }


// export default async function Users() {
//     const [users, stats] = await Promise.all([getUsers(), getUserStats()])

//     return (
//         <div>
//             <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
//                 Community
//             </p>
//             <h1 id="main-title" className="text-2xl font-semibold text-white mb-6">
//                 Users
//             </h1>

//             <div className="grid grid-cols-3 gap-3 mb-4">
//                 <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
//                     <p className="text-xs text-slate-500 mb-2">Total users</p>
//                     <p className="text-xl font-semibold text-white" data-target={stats.total} data-decimal="0" data-suffix="">
//                         0
//                     </p>
//                 </div>
//                 <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
//                     <p className="text-xs text-slate-500 mb-2">Active this week</p>
//                     <p className="text-xl font-semibold text-white" data-target={stats.activeThisWeek} data-decimal="0" data-suffix="">
//                         0
//                     </p>
//                 </div>
//                 <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
//                     <p className="text-xs text-slate-500 mb-2">New signups</p>
//                     <p className="text-xl font-semibold text-white" data-target={stats.newSignups} data-decimal="0" data-suffix="">
//                         0
//                     </p>
//                 </div>
//             </div>

//             <UsersTable users={users} />
//         </div>
//     )
// }

"use client"

import { useEffect, useState } from "react"
import { getUsers, getUserStats } from "@/action/user/getUserProfile"
import UsersTable from "./UsersTable"

type User = { id: string; name: string; handle: string; joined: string; status: string }
type Stats = { total: number; activeThisWeek: number; newSignups: number }

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [stats, setStats] = useState<Stats>({ total: 0, activeThisWeek: 0, newSignups: 0 })
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     Promise.all([getUsers(), getUserStats()]).then(([u, s]) => {
    //         setUsers(u)
    //         setStats(s)
    //         setLoading(false)
    //     })
    // }, [])

    useEffect(() => {
        Promise.all([getUsers(), getUserStats()])
            .then(([u, s]) => {
                setUsers(u)
                setStats(s)
            })
            .catch((err) => {
                console.error("Failed to load users:", err)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">Community</p>
            <h1 id="main-title" className="mb-6 text-xl font-semibold text-white sm:text-2xl">Users</h1>

            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-2">Total users</p>
                    <p className="text-xl font-semibold text-white" data-target={stats.total} data-decimal="0" data-suffix="">{stats.total}</p>
                </div>
                <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-2">Active this week</p>
                    <p className="text-xl font-semibold text-white" data-target={stats.activeThisWeek} data-decimal="0" data-suffix="">{stats.activeThisWeek}</p>
                </div>
                <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-2">New signups</p>
                    <p className="text-xl font-semibold text-white" data-target={stats.newSignups} data-decimal="0" data-suffix="">{stats.newSignups}</p>
                </div>
            </div>

            {loading ? <p className="text-xs text-slate-500">Loading...</p> : <UsersTable users={users} />}
        </div>
    )
}


// "use client"

// import { useMemo } from "react"

// type UserRole = "USER" | "ADMIN" | "VIP_USER"
// type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED"

// type User = {
//     id: string
//     name: string
//     handle: string
//     joined: string
//     status: UserStatus
//     role: UserRole
// }

// function StatCard({
//     label,
//     value,
//     accent,
//     detail,
// }: {
//     label: string
//     value: number
//     accent: string
//     detail: string
// }) {
//     return (
//         <div className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-4 transition-all duration-300 hover:border-slate-700 hover:-translate-y-0.5">
//             <p className="text-xs text-slate-500 mb-2">{label}</p>
//             <p className={`text-xl font-semibold ${accent}`}>{value}</p>

//             <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr]">
//                 <div className="overflow-hidden">
//                     <p className="mt-3 border-t border-slate-800 pt-2 text-[11px] leading-relaxed text-slate-500">
//                         {detail}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default function UserStatCards({ users = [] }: { users?: User[] }) {
//     const { admins, active, blocked } = useMemo(() => {
//         const list = users ?? []
//         return {
//             admins: list.filter((u) => u.role === "ADMIN" || u.role === "VIP_USER").length,
//             active: list.filter((u) => u.status === "ACTIVE").length,
//             blocked: list.filter((u) => u.status === "BANNED" || u.status === "SUSPENDED").length,
//         }
//     }, [users])

//     return (
//         <div className="grid grid-cols-3 gap-3 mb-4">
//             <StatCard
//                 label="Admins"
//                 value={admins}
//                 accent="text-amber-400"
//                 detail="Includes ADMIN and VIP_USER roles — accounts with elevated permissions."
//             />
//             <StatCard
//                 label="Active users"
//                 value={active}
//                 accent="text-teal-400"
//                 detail="Accounts currently marked ACTIVE, free to use the platform normally."
//             />
//             <StatCard
//                 label="Blocked"
//                 value={blocked}
//                 accent="text-red-400"
//                 detail="Accounts that are SUSPENDED or BANNED and can't sign in."
//             />
//         </div>
//     )
// }