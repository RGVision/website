"use client";
import { useRef, useState, useEffect } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import type { Testimonial } from "@/data/categories";

interface Props {
    testimonials: Testimonial[];
}

export default function InspirationCarousel({ testimonials }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [testimonials]);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current && scrollRef.current.children.length > 0) {
            const container = scrollRef.current;
            const cardWidth = container.children[0].clientWidth;
            const gap = 24; // gap-6 is 24px
            const itemWidth = cardWidth + gap;
            
            const currentScroll = container.scrollLeft;
            let nextIndex = 0;
            
            if (dir === "left") {
                // Math.floor to ensure we go to the previous fully visible card
                nextIndex = Math.floor((currentScroll - 1) / itemWidth);
            } else {
                // Math.ceil to ensure we go to the next card
                nextIndex = Math.ceil((currentScroll + 1) / itemWidth);
            }
            
            // Clamp index
            nextIndex = Math.max(0, Math.min(nextIndex, container.children.length - 1));
            
            container.scrollTo({
                left: nextIndex * itemWidth,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-20 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-xs font-semibold tracking-widest uppercase mb-4">
                        Guest Inspiration
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy leading-tight">
                        Stories from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-amber-500">Guests</span>
                    </h2>
                    <p className="mt-4 text-navy/70 text-base md:text-lg">
                        Discover the unforgettable experiences and cherished memories captured by our guests during their luxurious stays with ORA.
                    </p>
                </div>
                
                <div className="flex gap-3 shrink-0">
                    <button 
                        onClick={() => scroll("left")} 
                        disabled={!canScrollLeft}
                        className={`w-12 h-12 rounded-full border border-navy/10 shadow-sm flex items-center justify-center transition-all duration-300 group ${
                            canScrollLeft 
                                ? "bg-white text-navy hover:bg-navy hover:text-white hover:border-navy focus:outline-none active:scale-95" 
                                : "bg-navy/5 text-navy/30 cursor-not-allowed"
                        }`}
                        aria-label="Previous review"
                    >
                        <FaChevronLeft className={`text-sm ${canScrollLeft ? "group-hover:-translate-x-0.5" : ""} transition-transform`} />
                    </button>
                    <button 
                        onClick={() => scroll("right")} 
                        disabled={!canScrollRight}
                        className={`w-12 h-12 rounded-full border border-navy/10 shadow-sm flex items-center justify-center transition-all duration-300 group ${
                            canScrollRight 
                                ? "bg-white text-navy hover:bg-navy hover:text-white hover:border-navy focus:outline-none active:scale-95" 
                                : "bg-navy/5 text-navy/30 cursor-not-allowed"
                        }`}
                        aria-label="Next review"
                    >
                        <FaChevronRight className={`text-sm ${canScrollRight ? "group-hover:translate-x-0.5" : ""} transition-transform`} />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef} 
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.map((t, i) => (
                    <div key={i} className="w-[85vw] md:w-[400px] shrink-0 snap-start bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 border border-navy/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 group">
                        <div className="flex justify-between items-start mb-6">
                            <FaQuoteLeft className="text-4xl text-saffron/20 group-hover:text-saffron/40 transition-colors" />
                            <div className="flex gap-1 bg-navy/5 px-3 py-1.5 rounded-full">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <FaStar key={j} className="text-saffron text-sm" />
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-base text-navy/80 leading-relaxed flex-1 mb-8 italic">
                            "{t.text}"
                        </p>
                        
                        <div className="flex items-center gap-4 pt-6 border-t border-navy/5 mt-auto">
                            <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-sm font-bold text-white shadow-md">
                                {t.avatar}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-navy">{t.name}</div>
                                <div className="text-xs text-saffron font-semibold tracking-wide mt-0.5 uppercase">Stayed at {t.location}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
