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
        <section ref={ref} className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] rounded-3xl" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = iconMap[i];
                    return (
                        <div key={stat.label} className="glass rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                            <Icon className="text-3xl text-gold mx-auto mb-4" />
                            <div className="text-3xl md:text-4xl font-bold font-display text-gold mb-2">
                                {counts[i]}{stat.suffix}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)]">{stat.label}</div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
