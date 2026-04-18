"use client";
import { useRef } from "react";
import VillaCard from "@/components/shared/VillaCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Villa } from "@/data/villas";

interface Props {
    title: string;
    villas: Villa[];
}

export default function FeaturedSection({ title, villas }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
        }
    };

    return (
        <section className="py-12">
            {title && (
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-display text-5xl md:text-7xl text-navy-dark font-medium tracking-tight">
                        {title.split(' ')[0]} <span className="text-saffron italic font-light font-display">{title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <div className="flex gap-4">
                        <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full bg-white shadow-soft border border-black/5 flex items-center justify-center hover:bg-saffron hover:text-white transition-all duration-500 group">
                            <FaChevronLeft className="text-xs group-hover:-translate-x-0.5" />
                        </button>
                        <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full bg-navy text-white shadow-xl flex items-center justify-center hover:bg-saffron transition-all duration-500 group">
                            <FaChevronRight className="text-xs group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            )}
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {villas.map((villa) => (
                    <div key={villa.slug} className="min-w-[320px] w-[340px] shrink-0 snap-start">
                        <VillaCard villa={villa} />
                    </div>
                ))}
            </div>
        </section>
    );
}
