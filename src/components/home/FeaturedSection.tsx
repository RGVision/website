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
        <section className="py-8">
            {title && (
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-[length:var(--font-size-h3)] font-semibold">{title}</h2>
                    <div className="flex gap-2">
                        <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[var(--color-glass-hover)] hover:text-gold transition-all">
                            <FaChevronLeft className="text-sm" />
                        </button>
                        <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[var(--color-glass-hover)] hover:text-gold transition-all">
                            <FaChevronRight className="text-sm" />
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
