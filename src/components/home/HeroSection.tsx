"use client";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export default function HeroSection() {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80"
                    alt="Luxury Villa"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/60 via-[var(--color-bg-primary)]/40 to-[var(--color-bg-primary)]" />
            </div>

            {/* Floating Cards */}
            <div className="absolute top-[20%] right-[8%] w-48 h-32 rounded-xl overflow-hidden shadow-2xl shadow-black/40 rotate-6 animate-float hidden lg:block z-10 border border-white/10">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[25%] left-[5%] w-40 h-28 rounded-xl overflow-hidden shadow-2xl shadow-black/40 -rotate-6 animate-float hidden lg:block z-10 border border-white/10" style={{ animationDelay: "2s" }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" alt="" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center max-w-4xl px-6">
                <div className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full mb-8 animate-fadeInUp">
                    <span className="w-2 h-2 rounded-full bg-gold-gradient animate-pulse" />
                    <span className="text-sm text-[var(--color-text-secondary)]">Premium Luxury Stays</span>
                </div>

                <h1 className="font-display text-[length:var(--font-size-hero)] font-bold leading-[1.05] mb-6 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
                    Experience{" "}
                    <span className="text-gradient-gold italic">Luxury</span>{" "}
                    Living
                </h1>

                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
                    Discover handpicked villas, heritage havelis, and beachfront mansions across India&apos;s most stunning destinations.
                </p>

                <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.45s" }}>
                    <Link href="/villas" className="px-8 py-4 bg-gold-gradient rounded-full font-semibold text-[var(--color-bg-primary)] hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300">
                        Explore Villas
                    </Link>
                    <button className="flex items-center gap-3 px-6 py-4 glass rounded-full hover:bg-[var(--color-glass-hover)] transition-all duration-300 group">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <FaPlay className="text-xs text-gold ml-0.5" />
                        </span>
                        Watch Tour
                    </button>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="max-w-5xl mx-auto px-6 pb-8">
                    <div className="glass rounded-2xl py-6 px-8 flex items-center justify-center gap-12 md:gap-20">
                        {[
                            { num: "5000+", label: "Properties" },
                            { num: "100+", label: "Destinations" },
                            { num: "24K+", label: "Happy Guests" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-bold text-gold font-display">{stat.num}</div>
                                <div className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
