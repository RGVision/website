"use client";
import { useState } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaBell } from "react-icons/fa";

export default function StayTuned() {
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/subscribers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setMessage("Thank you for subscribing! We will keep you updated.");
                setFormData({ name: "", email: "", mobile: "" });
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to connect to the server. Please try again later.");
        }
    };

    return (
        <section className="py-16 relative w-full my-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            </div>

            <div className="relative z-10 px-8 py-12 md:py-16 md:px-16 flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-semibold tracking-wide">
                        <FaBell className="animate-pulse" />
                        <span>NEVER MISS OUT</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                        Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-amber-300">Travels</span>
                    </h2>
                    
                    <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto lg:mx-0">
                        Join our exclusive community of discerning travelers. Be the first to discover new premium stays, curated experiences, and private offers tailored just for you.
                    </p>
                </div>

                {/* Right Form */}
                <div className="w-full lg:w-[450px]">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="text-white/40 group-focus-within:text-saffron transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Full Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-saffron focus:bg-white/10 transition-all"
                                />
                            </div>
                            
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-white/40 group-focus-within:text-saffron transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Email Address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-saffron focus:bg-white/10 transition-all"
                                />
                            </div>
                            
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaPhone className="text-white/40 group-focus-within:text-saffron transition-colors" />
                                </div>
                                <input
                                    type="tel"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    placeholder="Mobile Number"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-saffron focus:bg-white/10 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="mt-2 w-full bg-gradient-to-r from-saffron to-amber-500 text-navy py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none"
                            >
                                {status === "loading" ? "Subscribing..." : "Join the Community"}
                                {status !== "loading" && <FaPaperPlane className="text-lg" />}
                            </button>
                        </form>

                        {message && (
                            <div className={`mt-5 p-3 rounded-lg flex items-center justify-center text-sm font-medium border ${status === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
