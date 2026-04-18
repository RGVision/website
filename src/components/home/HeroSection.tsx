"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchFilter from "./SearchFilter";

export default function HeroSection({ villas = [], categories = [] }: { villas: any[], categories: any[] }) {
    const heroVilla = villas[0] || { image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" };

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Background Image with Global Gradient */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={heroVilla.image} 
                    alt="Luxury Villa"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-48">
                <div className="max-w-4xl space-y-12 animate-fadeInUp">
                    {/* Minimalist Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                        <span className="text-[9px] tracking-[0.4em] uppercase text-white font-black">CURATED PRIVATE ESTATES</span>
                    </div>

                    {/* Elegant Headline */}
                    <div className="space-y-8">
                        <h1 className="font-display text-7xl md:text-9xl text-white leading-[1] font-medium tracking-tighter">
                            Nature Meets <br />
                            <span className="text-saffron italic font-light font-display">Elegance.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed tracking-wide">
                            Experience the art of exclusive living in India's most breathtaking private villas.
                        </p>
                    </div>

                    {/* Refined CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-8 pt-8">
                        <Button asChild size="lg" className="h-14 px-12 bg-white text-navy-dark hover:bg-saffron hover:text-white rounded-full font-black transition-all duration-500 shadow-2xl border-0 uppercase text-[10px] tracking-widest">
                            <Link href="/villas">View Collection</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-14 px-12 bg-transparent text-white border-white/40 hover:bg-white/10 rounded-full font-black transition-all duration-500 backdrop-blur-md uppercase text-[10px] tracking-widest">
                            <Link href="/about">Our Philosophy</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Search Filter Overlay */}
            <div className="absolute bottom-10 left-0 right-0 z-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <SearchFilter categories={categories} initialVillas={villas} />
                </div>
            </div>
        </section>
    );
}
