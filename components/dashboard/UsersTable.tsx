"use client"

type User = {
    id: string
    name: string
    handle: string
    joined: string
    status: string
}

const statusStyle: Record<string, string> = {
    Active: "bg-teal-500/15 text-teal-400",
    Guest: "bg-slate-500/15 text-slate-400",
    Inactive: "bg-red-500/15 text-red-400",
}

export default function UsersTable({ users }: { users: User[] }) {
    return (
        <div id="contentcard" className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-3 sm:p-4">
            <p className="mb-3 text-sm font-medium text-slate-200">All users</p>
            <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-xs">
                <thead>
                    <tr className="text-slate-500 border-b border-slate-800">
                        <th className="text-left font-normal py-2">Name</th>
                        <th className="text-left font-normal py-2">Handle</th>
                        <th className="text-left font-normal py-2">Joined</th>
                        <th className="text-left font-normal py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b border-slate-800/60 text-slate-300">
                            <td className="py-2 pr-2">{u.name}</td>
                            <td className="py-2 text-slate-400">{u.handle}</td>
                            <td className="py-2">{u.joined}</td>
                            <td className="py-2">
                                <span className={`px-2 py-0.5 rounded-full text-[11px] ${statusStyle[u.status] ?? statusStyle.Guest}`}>
                                    {u.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}


// "use client"

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

// const statusStyle: Record<UserStatus, string> = {
//     ACTIVE: "bg-teal-500/15 text-teal-400",
//     INACTIVE: "bg-slate-500/15 text-slate-400",
//     SUSPENDED: "bg-orange-500/15 text-orange-400",
//     BANNED: "bg-red-500/15 text-red-400",
// }

// const roleStyle: Record<UserRole, string> = {
//     ADMIN: "bg-amber-500/15 text-amber-400",
//     VIP_USER: "bg-violet-500/15 text-violet-400",
//     USER: "bg-slate-500/15 text-slate-400",
// }

// export default function UsersTable({ users }: { users: User[] }) {
//     return (
//         <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
//             <p className="text-sm font-medium text-slate-200 mb-3">All users</p>
//             <table className="w-full text-xs">
//                 <thead>
//                     <tr className="text-slate-500 border-b border-slate-800">
//                         <th className="text-left font-normal py-2">Name</th>
//                         <th className="text-left font-normal py-2">Handle</th>
//                         <th className="text-left font-normal py-2">Role</th>
//                         <th className="text-left font-normal py-2">Joined</th>
//                         <th className="text-left font-normal py-2">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((u) => (
//                         <tr key={u.id} className="border-b border-slate-800/60 text-slate-300">
//                             <td className="py-2 pr-2">{u.name}</td>
//                             <td className="py-2 text-slate-400">{u.handle}</td>
//                             <td className="py-2">
//                                 <span className={`px-2 py-0.5 rounded-full text-[11px] ${roleStyle[u.role] ?? roleStyle.USER}`}>
//                                     {u.role.replace("_", " ")}
//                                 </span>
//                             </td>
//                             <td className="py-2">{u.joined}</td>
//                             <td className="py-2">
//                                 <span className={`px-2 py-0.5 rounded-full text-[11px] ${statusStyle[u.status] ?? statusStyle.INACTIVE}`}>
//                                     {u.status}
//                                 </span>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }