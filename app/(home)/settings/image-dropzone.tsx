"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Camera, Loader2, UploadCloud } from "lucide-react"

type ImageDropzoneProps = {
    currentImage?: string | null
    onUploaded: (url: string) => void
}

export function ImageDropzone({ currentImage, onUploaded }: ImageDropzoneProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (!file) return

        setError(null)
        setPreview(URL.createObjectURL(file))
        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Upload failed")
                return
            }

            onUploaded(data.url)
        } catch {
            setError("Upload failed, please try again.")
        } finally {
            setIsUploading(false)
        }
    }, [onUploaded])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5MB
    })

    const displayImage = preview || currentImage || "/logo_user.png"

    return (
        <div className="flex flex-col gap-2">
            <div
                {...getRootProps()}
                className={`relative w-20 h-20 rounded-full overflow-hidden border cursor-pointer transition-colors ${isDragActive ? "border-yellow-500" : "border-white/10"
                    } bg-white/5`}
            >
                <input {...getInputProps()} />
                <Image
                    src={displayImage}
                    alt="avatar"
                    fill
                    sizes="80px"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    {isUploading ? (
                        <Loader2 size={18} className="text-white animate-spin" />
                    ) : isDragActive ? (
                        <UploadCloud size={18} className="text-yellow-500" />
                    ) : (
                        <Camera size={18} className="text-white" />
                    )}
                </div>
            </div>
            {error && <p className="text-red-400 text-[11px]">{error}</p>}
        </div>
    )
}