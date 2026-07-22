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
        <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-200 mb-3">All users</p>
            <table className="w-full text-xs">
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
    )
}