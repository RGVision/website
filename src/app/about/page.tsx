"use client";

import { FaGem, FaShieldAlt, FaHeart } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" 
                        alt="Luxury Landscape" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[var(--color-bg-primary)]" />
                </div>
                
                <div className="relative z-10 text-center max-w-4xl px-6 animate-fadeInUp">
                    <div className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full mb-8 border border-gold/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium text-shadow-sm">The Vora Story</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6">
                        Exclusivity Meets <br />
                        <span className="text-gradient-gold italic">Timeless Elegance</span>
                    </h1>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8 animate-fadeInLeft">
                            <h2 className="font-display text-4xl md:text-5xl font-light">
                                About <span className="text-gold italic">Vora Stays</span>
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                                <p>
                                    At Vora Stays, we redefine the art of exclusive travel. Every property in our curated collection is chosen for its timeless elegance, unparalleled privacy, and unique character.
                                </p>
                                <p>
                                    We believe true luxury is rare, personal, and unforgettable. It’s not about grandeur alone — it’s about spaces that inspire, destinations that captivate, and moments that linger long after you leave.
                                </p>
                                <p>
                                    Our portfolio spans India’s most coveted destinations, from secluded beaches to serene hill retreats, each offering a distinctive experience that speaks to those who seek more than ordinary.
                                </p>
                                <p className="text-gold font-display text-2xl italic pt-4">
                                    Every journey is bespoke, every stay exceptional, and every memory enduring.
                                </p>
                            </div>
                        </div>
                        
                        <div className="relative animate-fadeInRight" style={{ animationDelay: "0.2s" }}>
                            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 aspect-[4/5]">
                                <img 
                                    src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80" 
                                    alt="Luxury Villa Interior" 
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                />
                            </div>
                            {/* Accent Card */}
                            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl border border-gold/20 hidden md:block max-w-xs shadow-xl">
                                <p className="text-sm italic text-gold leading-relaxed">
                                    "This is luxury, refined and reserved only for those who value the extraordinary."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-[var(--color-bg-secondary)]/50 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeInUp">
                        <h2 className="font-display text-4xl md:text-5xl font-light mb-8">
                            Our <span className="text-gold italic">Mission</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            To redefine luxury travel — making it personal, distinctive, and unforgettable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FaGem,
                                title: "The Rare & Refined",
                                desc: "Every property and detail is chosen to reflect our belief that luxury is not just seen, but felt."
                            },
                            {
                                icon: FaShieldAlt,
                                title: "True Exclusivity",
                                desc: "Ensuring privacy, elegance, and authenticity converge in every curated escape."
                            },
                            {
                                icon: FaHeart,
                                title: "Enduring Memories",
                                desc: "Crafting journeys that linger in memory, offering spaces that inspire wonder and comfort."
                            }
                        ].map((item, i) => (
                            <div 
                                key={i} 
                                className="glass p-10 rounded-3xl border border-white/5 hover:border-gold/20 transition-all duration-300 group animate-fadeInUp"
                                style={{ animationDelay: `${0.2 * i}s` }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 border border-gold/20 group-hover:bg-gold-gradient group-hover:text-black transition-all">
                                    <item.icon className="text-2xl text-gold group-hover:text-inherit" />
                                </div>
                                <h3 className="text-xl font-display text-gold uppercase tracking-widest mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed italic">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-20 text-center animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
                        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed italic">
                            At Vora Stays, our mission is to curate extraordinary escapes for those who seek the rare, the refined, and the exceptional. We exist to transform every stay into a timeless experience.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
