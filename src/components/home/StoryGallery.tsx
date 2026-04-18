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
        <section className="py-24">
            <div className="text-center mb-20 animate-fadeInUp">
                <h2 className="font-display text-5xl md:text-7xl text-navy-dark font-medium mb-6 tracking-tight">
                    Visual <span className="text-saffron italic font-light font-display">Stories</span>
                </h2>
                <p className="text-navy/40 font-black uppercase tracking-[0.4em] text-[10px]">A mosaic of exclusive moments across our estates</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[240px]">
                {images.map((img, i) => (
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
                            <img src={images[lightbox].src} alt="" className="max-w-full max-h-[85vh] object-contain rounded-[24px]" />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
