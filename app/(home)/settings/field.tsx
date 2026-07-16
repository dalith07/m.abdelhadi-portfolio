type FieldProps = {
    label: string
    icon?: React.ElementType
    value: string
    onChange?: (v: string) => void
    disabled?: boolean
    placeholder?: string
    autoComplete?: string
    name?: string
}

export function Field({
    label,
    icon: Icon,
    value,
    onChange,
    disabled,
    placeholder,
    autoComplete = "off",
    name,
}: FieldProps) {
    return (
        <div>
            <label className="text-white/40 text-[10px] font-semibold tracking-wide block mb-2">
                {label.toUpperCase()}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                )}
                <input
                    type="text"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`w-full bg-white/5 border border-white/10 text-white text-sm rounded-md ${Icon ? "pl-10" : "pl-3"
                        } pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
                />
            </div>
        </div>
    )
}