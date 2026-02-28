"use client";
import { FaBriefcase, FaBirthdayCake, FaHeart, FaRing } from "react-icons/fa";
import type { Experience } from "@/data/categories";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    corporate: FaBriefcase,
    birthday: FaBirthdayCake,
    romantic: FaHeart,
    wedding: FaRing,
};

interface Props {
    experiences: Experience[];
}

export default function ExperiencesSection({ experiences }: Props) {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="font-display text-[length:var(--font-size-h2)] font-semibold mb-3">
                    Unforgettable <span className="text-gold">Events</span>, Perfect Venues
                </h2>
                <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
                    From corporate retreats to fairy-tale weddings — find the perfect luxury venue for every occasion.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences.map((exp) => {
                    const Icon = iconMap[exp.icon] || FaHeart;
                    return (
                        <div key={exp.title} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
                            <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="text-[var(--color-bg-primary)] text-lg" />
                                </div>
                                <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                                <p className="text-sm text-[var(--color-text-muted)]">{exp.subtitle}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
