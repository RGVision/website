"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const images = [
    { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", span: "row-span-2" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", span: "" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", span: "" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", span: "row-span-2" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", span: "" },
    { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80", span: "" },
];

export default function StoryGallery() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="font-display text-[length:var(--font-size-h2)] font-semibold mb-3">
                    Every stay has a <span className="text-primary">story</span>
                </h2>
                <p className="text-muted-foreground">Moments captured by our guests</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setLightbox(i)}
                        className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
                    >
                        <img src={img.src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    </button>
                ))}
            </div>

            {/* Radix Dialog Lightbox */}
            <Dialog open={lightbox !== null} onOpenChange={() => setLightbox(null)}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] bg-black/95 border-white/10 p-2 flex items-center justify-center">
                    <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                    {lightbox !== null && (
                        <img src={images[lightbox].src} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
