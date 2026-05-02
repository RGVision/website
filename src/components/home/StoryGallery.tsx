"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
export default function StoryGallery({ villas }: { villas: any[] }) {
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [displayImages, setDisplayImages] = useState<any[]>([]);

    useEffect(() => {
        if (!villas || villas.length === 0) return;
        const allImages = Array.from(new Set(villas.flatMap(v => v.images || [])));
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 9);
        const spanPatterns = ["row-span-2", "", "", "row-span-2", "", ""];
        setDisplayImages(selected.map((src, i) => ({ src, span: spanPatterns[i] })));
    }, [villas]);

    return (
        <section className="py-24">
            <div className="text-center mb-20 animate-fadeInUp">
                <h2 className="font-brand text-3xl md:text-5xl lg:text-6xl text-navy-dark mb-6 tracking-wider uppercase text-center">
                    Visual <span className="text-saffron font-brand tracking-widest">Stories</span>
                </h2>
                <p className="text-navy/40 font-black uppercase tracking-[0.4em] text-[10px]">A mosaic of exclusive moments across our estates</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[240px]">
                {displayImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setLightbox(i)}
                        className={`relative rounded-[24px] overflow-hidden group cursor-pointer shadow-soft hover:shadow-deep transition-all duration-700 ${img.span}`}
                    >
                        <img src={img.src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white text-[10px] font-black tracking-widest uppercase transition-opacity duration-500">View Story</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Radix Dialog Lightbox */}
            <Dialog open={lightbox !== null} onOpenChange={() => setLightbox(null)}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] bg-white/95 border-none p-4 flex items-center justify-center shadow-2xl">
                    <DialogTitle className="sr-only">Gallery Image</DialogTitle>
                    {lightbox !== null && (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img src={displayImages[lightbox].src} alt="" className="max-w-full max-h-[85vh] object-contain rounded-[24px]" />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
