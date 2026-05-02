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
        <section className="py-24">
            <div className="text-center mb-20 animate-fadeInUp">
                <h2 className="font-brand text-3xl md:text-5xl lg:text-6xl text-navy-dark mb-6 tracking-wider uppercase text-center">
                    Guest <span className="text-saffron font-brand tracking-widest">Inspiration</span>
                </h2>
                <p className="text-navy/70 font-black uppercase tracking-[0.4em] text-xs">#WhereFamiliesBond captured by our vacationers</p>
            </div>

            <div className="flex items-center justify-between mb-12">
                <div className="flex gap-4">
                    <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full bg-navy text-white shadow-xl flex items-center justify-center hover:bg-saffron transition-all duration-500 group">
                        <FaChevronLeft className="text-xs group-hover:-translate-x-0.5" />
                    </button>
                    <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full bg-navy text-white shadow-xl flex items-center justify-center hover:bg-saffron transition-all duration-500 group">
                        <FaChevronRight className="text-xs group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
                {testimonials.map((t, i) => (
                    <div key={i} className="min-w-[380px] w-[400px] shrink-0 snap-start bg-white shadow-soft rounded-[24px] p-10 flex flex-col hover:shadow-deep transition-all duration-700 border border-black/5">
                        <FaQuoteLeft className="text-3xl text-saffron/20 mb-6" />
                        <div className="flex gap-1.5 mb-6">
                            {Array.from({ length: t.rating }).map((_, j) => (
                                <FaStar key={j} className="text-saffron text-xs" />
                            ))}
                        </div>
                        <p className="text-lg text-navy/70 leading-relaxed flex-1 mb-8 font-sans font-medium">
                            &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-5 pt-8 mt-auto border-t border-linen">
                            <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-xs font-black text-white tracking-widest uppercase shadow-xl">
                                {t.avatar}
                            </div>
                            <div>
                                <div className="text-sm font-black text-navy-dark uppercase tracking-tight">{t.name}</div>
                                <div className="text-xs text-saffron font-black uppercase tracking-widest">{t.location}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
