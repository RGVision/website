"use client";

import { FaGem, FaShieldAlt, FaHeart } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" 
                        alt="Luxury Landscape" 
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" />
                </div>
                
                <div className="relative z-10 text-center max-w-4xl px-6 animate-fadeInUp">
                    <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white font-black">The Vora Story</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-6 text-white">
                        Exclusivity Meets <br />
                        <span className="text-saffron italic font-light">Timeless Elegance</span>
                    </h1>
                </div>
            </section>

            {/* About Section */}
            <section className="py-32 relative overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 animate-fadeInLeft">
                            <h2 className="font-display text-5xl md:text-7xl text-navy font-black tracking-tight leading-tight">
                                Shaping Premium <br />
                                <span className="text-saffron italic font-light font-display">Hospitality</span>
                            </h2>
                            <div className="space-y-8 text-lg text-navy/70 leading-relaxed font-medium">
                                <p>
                                    At Vora Stays, we welcome individuals who are passionate about delivering exceptional guest experiences. Our mission is to redefine luxury travel — making it personal, distinctive, and unforgettable.
                                </p>
                                <p>
                                    Discover curated travel stories, destination inspirations, and refined living insights crafted for discerning travelers who seek more than just a place to stay.
                                </p>
                                <div className="p-8 bg-secondary/50 rounded-[32px] border-l-4 border-saffron">
                                    <p className="text-navy font-display text-2xl italic">
                                        &ldquo;Every journey is bespoke, every stay exceptional, and every memory enduring.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-8 animate-fadeInRight">
                            <div className="rounded-[40px] overflow-hidden shadow-deep border border-border aspect-[4/5] relative group">
                                <img 
                                    src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80" 
                                    alt="Luxury Villa Interior" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-all duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support & Values Section */}
            <section className="py-32 bg-secondary/30 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeInUp">
                        <h2 className="font-display text-5xl md:text-6xl text-navy font-black mb-10 tracking-tight">
                            Our <span className="text-saffron italic font-light font-display">Commitment</span>
                        </h2>
                        <p className="text-lg text-navy/60 font-medium leading-relaxed">
                            Ensuring transparency, comfort, and a premium experience for every guest through our thoughtfully designed policies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FaGem,
                                title: "Concierge",
                                desc: "Our dedicated team is available to assist you at every step—from selecting the perfect villa to ensuring a seamless stay."
                            },
                            {
                                icon: FaShieldAlt,
                                title: "Safety & Assurance",
                                desc: "Every Vora Stays property is verified and maintained to uphold the highest standards of safety, comfort, and discretion."
                            },
                            {
                                icon: FaHeart,
                                title: "Cancellations",
                                desc: "Bookings are confirmed with commitment. Modifications are subject to availability and applicable conditions."
                            }
                        ].map((item, i) => (
                            <div 
                                key={i} 
                                className="bg-white p-10 rounded-[32px] border border-border hover:border-saffron/30 hover:shadow-xl transition-all duration-500 group animate-fadeInUp"
                                style={{ animationDelay: `${0.2 * i}s` }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-saffron transition-all shadow-sm">
                                    <item.icon className="text-2xl text-navy group-hover:text-white" />
                                </div>
                                <h3 className="text-sm font-black text-navy uppercase tracking-[0.2em] mb-4">{item.title}</h3>
                                <p className="text-navy/50 leading-relaxed font-medium text-[13px]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
