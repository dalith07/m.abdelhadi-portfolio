// "use client"

// import { useState, useTransition, useRef } from "react"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import { User, Mail, Phone, MapPin, Camera, Loader2, Check } from "lucide-react"
// import { useCurrentUser } from "@/hooks/use-current-user"
// import { Field } from "./field"

// export function ProfileSection() {
//     const user = useCurrentUser()
//     const [isPending, startTransition] = useTransition()
//     const [success, setSuccess] = useState(false)
//     const fileInputRef = useRef<HTMLInputElement>(null)
//     const [preview, setPreview] = useState<string | null>(null)

//     const [form, setForm] = useState({
//         name: user?.name ?? "",
//         phoneNumber: "",
//         streetAddress: "",
//         city: "",
//         postalCode: "",
//     })

//     const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if (!file) return
//         setPreview(URL.createObjectURL(file))
//         // TODO: upload file to storage then persist url via server action
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         setSuccess(false)
//         startTransition(async () => {
//             // TODO: call your server action here, e.g. await updateProfile(form)
//             await new Promise((r) => setTimeout(r, 700))
//             setSuccess(true)
//             setTimeout(() => setSuccess(false), 2500)
//         })
//     }

//     return (
//         <motion.section
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white/3 border border-white/10 rounded-2xl p-6"
//         >
//             <div className="flex items-center gap-2 mb-6">
//                 <User size={16} className="text-yellow-500" />
//                 <h2 className="text-white text-sm font-semibold">Profile</h2>
//             </div>

//             <div className="flex items-center gap-4 mb-8">
//                 <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-white/5">
//                     <Image
//                         src={preview || user?.image || "/logo_user.png"}
//                         alt="avatar"
//                         fill
//                         sizes="80px"
//                         className="object-cover hover:cursor-pointer"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
//                     >
//                         <Camera size={18} className="text-white" />
//                     </button>
//                     <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         onChange={handleAvatarChange}
//                         className="hidden"
//                     />
//                 </div>
//                 <div>
//                     <p className="text-white text-sm font-medium">{user?.name || "Your name"}</p>
//                     <p className="text-white/40 text-xs">{user?.email}</p>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <Field
//                     label="Full Name"
//                     icon={User}
//                     value={form.name}
//                     onChange={(v) => setForm((f) => ({ ...f, name: v }))}
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="Email Address" icon={Mail} value={user?.email ?? ""} disabled />
//                     <Field
//                         label="Phone Number"
//                         icon={Phone}
//                         value={form.phoneNumber}
//                         onChange={(v) => setForm((f) => ({ ...f, phoneNumber: v }))}
//                         placeholder="+216 00 000 000"
//                     />
//                 </div>

//                 <Field
//                     label="Street Address"
//                     icon={MapPin}
//                     value={form.streetAddress}
//                     onChange={(v) => setForm((f) => ({ ...f, streetAddress: v }))}
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} />
//                     <Field
//                         label="Postal Code"
//                         value={form.postalCode}
//                         onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))}
//                     />
//                 </div>

//                 <div className="flex items-center gap-3 mt-2">
//                     <button
//                         type="submit"
//                         disabled={isPending}
//                         className="flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold tracking-wide px-6 py-3 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50"
//                     >
//                         {isPending ? <Loader2 size={14} className="animate-spin" /> : "SAVE CHANGES"}
//                     </button>
//                     {success && (
//                         <motion.span
//                             initial={{ opacity: 0, x: -6 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="flex items-center gap-1.5 text-green-400 text-xs"
//                         >
//                             <Check size={14} /> Saved
//                         </motion.span>
//                     )}
//                 </div>
//             </form>
//         </motion.section>
//     )
// }


"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Loader2, Check } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Field } from "./field"
import { ImageDropzone } from "./image-dropzone"
import { updateProfile } from "@/action/user/update-profile"
import { Button } from "@/components/ui/button"


export function ProfileSection() {
    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

    const [form, setForm] = useState({
        name: user?.name ?? "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        postalCode: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSuccess(false)
        setError(null)

        startTransition(async () => {
            const result = await updateProfile({
                ...form,
                image: imageUrl,
            })

            if (result?.error) {
                setError(result.error)
                return
            }

            setSuccess(true)
            setTimeout(() => setSuccess(false), 2500)
        })
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/3 border border-white/10 rounded-2xl p-6"
        >
            <div className="flex items-center gap-2 mb-6">
                <User size={16} className="text-yellow-500" />
                <h2 className="text-white text-sm font-semibold">Profile</h2>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <ImageDropzone
                    currentImage={user?.image}
                    onUploaded={(url) => setImageUrl(url)}
                />
                <div>
                    <p className="text-white text-sm font-medium">{user?.name || "Your name"}</p>
                    <p className="text-white/40 text-xs">{user?.email}</p>
                    <p className="text-white/30 text-[10px] mt-1">Drag & drop or click avatar to change</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                <Field
                    label="Full Name"
                    icon={User}
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email Address" icon={Mail} value={user?.email ?? ""} disabled />
                    <Field
                        label="Phone Number"
                        icon={Phone}
                        value={form.phoneNumber}
                        onChange={(v) => setForm((f) => ({ ...f, phoneNumber: v }))}
                        placeholder="+216 00 000 000"
                        autoComplete="new-password"
                    />
                </div>

                <Field
                    label="Street Address"
                    icon={MapPin}
                    value={form.streetAddress}
                    onChange={(v) => setForm((f) => ({ ...f, streetAddress: v }))}
                    autoComplete="new-password"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                        label="City"
                        value={form.city}
                        onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                        autoComplete="new-password"
                    />
                    <Field
                        label="Postal Code"
                        value={form.postalCode}
                        onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))}
                        autoComplete="new-password"
                    />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center hover:cursor-pointer justify-center gap-2 bg-white text-black text-xs font-semibold tracking-wide px-6 py-3 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                        {isPending ? <Loader2 size={14} className="animate-spin" /> : "SAVE CHANGES"}
                    </Button>
                    {success && (
                        <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1.5 text-green-400 text-xs"
                        >
                            <Check size={14} /> Saved
                        </motion.span>
                    )}
                </div>
            </form>
        </motion.section>
    )
}