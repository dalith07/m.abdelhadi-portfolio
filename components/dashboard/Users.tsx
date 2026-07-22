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

    useEffect(() => {
        Promise.all([getUsers(), getUserStats()]).then(([u, s]) => {
            setUsers(u)
            setStats(s)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">Community</p>
            <h1 id="main-title" className="text-2xl font-semibold text-white mb-6">Users</h1>

            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-2">Total users</p>
                    <p className="text-xl font-semibold text-white" data-target={stats.total} data-decimal="0" data-suffix="">0</p>
                </div>
                <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-2">Active this week</p>
                    <p className="text-xl font-semibold text-white" data-target={stats.activeThisWeek} data-decimal="0" data-suffix="">0</p>
                </div>
                <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-2">New signups</p>
                    <p className="text-xl font-semibold text-white" data-target={stats.newSignups} data-decimal="0" data-suffix="">0</p>
                </div>
            </div>

            {loading ? <p className="text-xs text-slate-500">Loading...</p> : <UsersTable users={users} />}
        </div>
    )
}