"use client";
import { FaTag, FaClock, FaArrowRight } from "react-icons/fa";

const offers = [
    { title: "Early Bird Special", desc: "Book 30 days in advance and get 25% off on all premium villas", badge: "25% OFF", icon: FaClock, color: "from-amber-500/20 to-amber-600/10" },
    { title: "Weekend Getaway", desc: "Special rates for Fri-Sun stays. Starting at ₹4,999 per night", badge: "FROM ₹4,999", icon: FaTag, color: "from-emerald-500/20 to-emerald-600/10" },
];

export default function OffersSection() {
    return (
        <section className="py-16">
            <h2 className="font-display text-[length:var(--font-size-h2)] font-semibold mb-10">
                Offers <span className="text-gold">For You</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {offers.map((offer) => (
                    <div key={offer.title} className={`glass rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-50`} />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center">
                                    <offer.icon className="text-[var(--color-bg-primary)]" />
                                </div>
                                <span className="px-3 py-1 bg-gold-gradient rounded-full text-xs font-bold text-[var(--color-bg-primary)]">
                                    {offer.badge}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                            <p className="text-sm text-[var(--color-text-muted)] mb-6">{offer.desc}</p>
                            <button className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                                Explore <FaArrowRight className="text-xs" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Banner */}
            <div className="rounded-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" alt="" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center px-10">
                    <div>
                        <h3 className="text-2xl font-bold font-display mb-2">List Your Property</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mb-4 max-w-md">Earn premium returns by listing your luxury property with UrbanLuxe Holidays</p>
                        <button className="px-6 py-3 bg-gold-gradient rounded-full text-sm font-semibold text-[var(--color-bg-primary)] hover:shadow-gold transition-all duration-300">
                            Become a Host
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
