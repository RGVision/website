"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/storage"; // This will be used in a server action or client-side if allowed

interface ImageUploadProps {
    onImagesChange: (urls: string[]) => void;
    initialImages?: string[];
}

export default function ImageUpload({ onImagesChange, initialImages = [] }: ImageUploadProps) {
    const [images, setImages] = useState<string[]>(initialImages);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);
                const url = await uploadImage(formData);
                newUrls.push(url);
            }
            const updatedImages = [...images, ...newUrls];
            setImages(updatedImages);
            onImagesChange(updatedImages);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please check your connection and try again.");
        } finally {
            setUploading(false);
            e.target.value = ""; // Reset input
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesChange(updatedImages);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
                
                <label className={`w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors bg-slate-900 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploading ? (
                        <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
                    ) : (
                        <>
                            <Upload className="h-6 w-6 text-slate-400" />
                            <span className="text-[10px] mt-1 text-slate-400 font-medium">Add Photos</span>
                        </>
                    )}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
            </div>
            
            {images.length === 0 && !uploading && (
                <p className="text-xs text-slate-500 italic">No images uploaded yet. Multiple selection supported.</p>
            )}
        </div>
    );
}
