"use client";
import { useState } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

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
        <section className="py-12 bg-[#0F172A] text-white relative overflow-hidden">
            {/* <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-saffron rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div> */}

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-2xl md:text-4xl font-display font-semibold mb-2">
                    Stay <span className="text-saffron">Tuned</span>
                </h2>
                <p className="text-sm text-white/70 mb-6 max-w-2xl mx-auto">
                    Join our exclusive community. Sign up to receive updates on new premium stays, curated experiences, and exclusive offers.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
                        <div className="relative flex-1">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your Name"
                                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                            />
                        </div>
                        <div className="relative flex-1">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email Address"
                                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                            />
                        </div>
                        <div className="relative flex-1">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                            <input
                                type="tel"
                                required
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                placeholder="Mobile Number"
                                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-saffron text-navy px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {status === "loading" ? "Submitting..." : "Subscribe"}
                            {status !== "loading" && <FaPaperPlane />}
                        </button>
                    </form>

                    {message && (
                        <p className={`mt-6 text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
