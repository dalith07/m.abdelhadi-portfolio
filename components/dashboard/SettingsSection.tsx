"use client"

export default function SettingsSection() {
    return (
        <div>
            <p id="eyebrow" className="text-xs tracking-wide text-amber-400/80 mb-1">
                Preferences
            </p>
            <h1 id="main-title" className="text-2xl font-semibold text-white mb-1">
                Settings
            </h1>
            <p className="text-xs text-slate-500 mb-6">Manage your brand identity, configurations, and administrative preferences.</p>

            <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="flex flex-col gap-4">
                    <div id="chartcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-slate-200 mb-4">Profile Settings</p>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-slate-700" />
                            <button className="text-xs text-amber-400 border border-amber-400/40 rounded-md px-3 py-1.5 hover:bg-amber-400/10 transition-colors">
                                Update photo
                            </button>
                        </div>
                        <label className="text-xs text-slate-500 mb-1 block">Full name</label>
                        <input
                            defaultValue="Mohammed Abdelhadi"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-200 px-3 py-2 mb-3 outline-none"
                        />
                        <label className="text-xs text-slate-500 mb-1 block">Bio</label>
                        <textarea
                            defaultValue="Entrepreneur, fitness enthusiast, and seeker of discipline. Building a life of intention."
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-200 px-3 py-2 outline-none resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="text-xs text-slate-400 px-3 py-1.5 hover:text-slate-200">Cancel</button>
                            <button className="text-xs bg-amber-400 text-slate-900 rounded-md px-3 py-1.5 font-medium hover:bg-amber-300 transition-colors">
                                Save changes
                            </button>
                        </div>
                    </div>

                    <div id="distcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-slate-200 mb-4">Social Integration</p>
                        {["Instagram", "Twitter / X", "TikTok"].map((platform) => (
                            <div key={platform} className="flex items-center justify-between mb-3 last:mb-0">
                                <span className="text-xs text-slate-500">{platform}</span>
                                <input
                                    placeholder="username"
                                    className="bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-300 px-3 py-1.5 outline-none w-40"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div id="contentcard" className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-slate-200 mb-4">Site Configuration</p>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs text-slate-300">Anonymous feedback</p>
                                <p className="text-xs text-slate-600">Allow guests to submit messages</p>
                            </div>
                            <div className="w-9 h-5 rounded-full bg-amber-400 relative">
                                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 absolute right-1 top-0.75" />
                            </div>
                        </div>
                        <label className="text-xs text-slate-500 mb-1 block">Quote rotation</label>
                        <select className="w-full bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-300 px-3 py-2 outline-none">
                            <option>Daily</option>
                        </select>
                    </div>

                    <div className="stat-card bg-slate-900 border border-slate-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-slate-200 mb-4">Theme Identity</p>
                        <p className="text-xs text-slate-500 mb-2">Accent color</p>
                        <div className="flex gap-2 mb-4">
                            <div className="w-6 h-6 rounded-full bg-amber-400 ring-2 ring-amber-400/40" />
                            <div className="w-6 h-6 rounded-full bg-teal-500" />
                            <div className="w-6 h-6 rounded-full bg-white" />
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Typography scale</p>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Compact</span>
                            <span>Standard</span>
                            <span>Spacious</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}