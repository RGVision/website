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
        <section className="py-24">
            <div className="text-center mb-20 animate-fadeInUp">
                <h2 className="font-display text-5xl md:text-7xl text-navy-dark font-medium mb-6 tracking-tight">
                    Unforgettable <span className="text-saffron italic font-light font-display">Events</span>
                </h2>
                <p className="text-navy/40 max-w-xl mx-auto font-black uppercase tracking-[0.4em] text-[10px]">
                    Curated venues for India's most prestigious celebrations
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {experiences.map((exp) => {
                    const Icon = iconMap[exp.icon] || FaHeart;
                    return (
                        <div key={exp.title} className="group relative rounded-[24px] overflow-hidden aspect-[3/4] cursor-pointer shadow-soft hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
                            <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-saffron group-hover:scale-110 transition-all duration-500 shadow-xl border border-white/20">
                                    <Icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-2xl font-medium mb-2 text-white font-display tracking-tight">{exp.title}</h3>
                                <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">{exp.subtitle}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
