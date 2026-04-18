"use client";
import { FaTag, FaClock, FaArrowRight } from "react-icons/fa";

const offers = [
    { title: "Early Bird Special", desc: "Book 30 days in advance and get 25% off on all premium villas", badge: "25% OFF", icon: FaClock, color: "from-amber-500/20 to-amber-600/10" },
    { title: "Weekend Getaway", desc: "Special rates for Fri-Sun stays. Starting at ₹4,999 per night", badge: "FROM ₹4,999", icon: FaTag, color: "from-emerald-500/20 to-emerald-600/10" },
];

export default function OffersSection() {
    return (
        <section className="py-16">
            <h2 className="font-display text-4xl md:text-5xl text-navy font-semibold mb-10">
                Offers <span className="text-saffron">For You</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {offers.map((offer) => (
                    <div key={offer.title} className={`bg-white shadow-soft border border-border rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-deep transition-all duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-40`} />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                                    <offer.icon className="text-white" />
                                </div>
                                <span className="px-3 py-1 bg-saffron rounded-full text-[10px] font-bold text-navy uppercase tracking-widest">
                                    {offer.badge}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2 text-navy font-display">{offer.title}</h3>
                            <p className="text-sm text-navy/60 mb-6">{offer.desc}</p>
                            <button className="flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                                Explore <FaArrowRight className="text-xs text-saffron" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Banner */}
            <div className="rounded-[32px] overflow-hidden relative shadow-deep">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" alt="" className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-navy/80 flex items-center px-10">
                    <div className="max-w-xl">
                        <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-3">List Your Property</h3>
                        <p className="text-base text-white/70 mb-6 max-w-md">Earn premium returns by listing your luxury property with Vora Stays. We provide standard maintenance and management for your assets.</p>
                        <a 
                            href="https://wa.me/916382221757?text=Hi%20Vora%20Stays%2c%20I%27m%20interested%20in%20listing%20my%20property%20with%20you%20for%20collaboration."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <button className="px-8 py-4 bg-saffron rounded-full text-sm font-bold text-navy hover:scale-105 transition-all duration-300 shadow-xl uppercase tracking-widest">
                                Become a Host
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
