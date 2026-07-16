import { Lock, Eye, EyeOff } from "lucide-react"

type PasswordFieldProps = {
    label: string
    value: string
    onChange: (v: string) => void
    show: boolean
    onToggle?: () => void
}

export function PasswordField({ label, value, onChange, show, onToggle }: PasswordFieldProps) {
    return (
        <div>
            <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                {label.toUpperCase()}
            </label>
            <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-md pl-10 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors"
                />
                {onToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
        </div>
    )
}