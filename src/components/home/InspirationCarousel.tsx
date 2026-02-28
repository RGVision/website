"use client";
import { useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import type { Testimonial } from "@/data/categories";

interface Props {
    testimonials: Testimonial[];
}

export default function InspirationCarousel({ testimonials }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="font-display text-[length:var(--font-size-h2)] font-semibold mb-2">
                        Guest <span className="text-gold">Inspiration</span>
                    </h2>
                    <p className="text-[var(--color-text-muted)]">What our guests say about their luxury stays</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors">
                        <FaChevronLeft />
                    </button>
                    <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors">
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {testimonials.map((t, i) => (
                    <div key={i} className="min-w-[360px] w-[380px] shrink-0 snap-start glass rounded-2xl p-8 flex flex-col">
                        <FaQuoteLeft className="text-2xl text-gold/30 mb-4" />
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: t.rating }).map((_, j) => (
                                <FaStar key={j} className="text-gold text-sm" />
                            ))}
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1 mb-6">
                            &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-glass-border)]">
                            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)]">
                                {t.avatar}
                            </div>
                            <div>
                                <div className="text-sm font-semibold">{t.name}</div>
                                <div className="text-xs text-[var(--color-text-muted)]">{t.location}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
