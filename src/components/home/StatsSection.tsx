"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaGlobe, FaMapMarkerAlt, FaHeadset, FaSmile } from "react-icons/fa";
import type { Stat } from "@/data/categories";

const iconMap = [FaGlobe, FaMapMarkerAlt, FaHeadset, FaSmile];

interface Props {
    stats: Stat[];
}

export default function StatsSection({ stats }: Props) {
    const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
    const [triggered, setTriggered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const animateCount = useCallback(() => {
        const targets = stats.map((s) => s.number);
        const duration = 2000;
        const start = performance.now();

        const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(targets.map((t) => Math.round(t * eased)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [stats]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered) {
                    setTriggered(true);
                    animateCount();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [triggered, animateCount]);

    return (
        <section ref={ref} className="py-20 relative px-4 md:px-6">
            <div className="absolute inset-0 bg-linen rounded-[24px] md:rounded-[32px] border border-black/5" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 p-8 md:p-24">
                {stats.map((stat, i) => {
                    const Icon = iconMap[i];
                    return (
                        <div key={stat.label} className="text-center group">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 md:mb-10 group-hover:bg-saffron group-hover:scale-110 transition-all duration-700 shadow-soft border border-black/5">
                                <Icon className="text-xl md:text-2xl text-saffron group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-4xl md:text-7xl font-medium font-display text-navy-dark mb-2 md:mb-4 tracking-tighter">
                                {counts[i]}{stat.suffix}
                            </div>
                            <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-navy/60 group-hover:text-saffron transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
