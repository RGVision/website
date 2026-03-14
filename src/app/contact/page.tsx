"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20 animate-fadeInUp">
                    <div className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full mb-6 border border-gold/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium">Get in Touch</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-6xl font-light mb-6">
                        Contact <span className="text-gradient-gold italic">Us</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Have questions about our villas or need assistance with your booking? Our dedicated team is here to help you plan your perfect stay.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8 animate-fadeInLeft" style={{ animationDelay: "0.2s" }}>
                        <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
                            <div>
                                <h3 className="text-lg font-display text-gold uppercase tracking-widest mb-6">Contact Details</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-all">
                                            <FaPhoneAlt className="text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1 italic">Phone & WhatsApp</p>
                                            <a href="tel:+916382221757" className="text-xl font-medium hover:text-gold transition-colors tracking-wide">+91 63822 21757</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-all">
                                            <FaEnvelope className="text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1 italic">Email Address</p>
                                            <a href="mailto:vorastays@gmail.com" className="text-xl font-medium hover:text-gold transition-colors tracking-wide">vorastays@gmail.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group hidden">
                                        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-all">
                                            <FaMapMarkerAlt className="text-gold" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1 italic">Main Office</p>
                                            <p className="text-xl font-medium leading-relaxed">Luxury Chambers, 4th Floor,<br />Bandra West, Mumbai 400050</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            <div>
                                <h3 className="text-lg font-display text-gold uppercase tracking-widest mb-4">Trust & Reliability</h3>
                                <p className="text-muted-foreground leading-relaxed italic">
                                    As your trusted partner for premium accommodation, we ensure verified properties and round-the-clock support for a worry-free experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="animate-fadeInRight" style={{ animationDelay: "0.4s" }}>
                        <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl shadow-black/40">
                            {status === "success" ? (
                                <div className="text-center py-12 space-y-6">
                                    <div className="w-20 h-20 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaPaperPlane className="text-3xl text-gold" />
                                    </div>
                                    <h2 className="text-3xl font-display text-gold italic">Message Sent</h2>
                                    <p className="text-muted-foreground">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                    <Button onClick={() => setStatus("idle")} variant="outline" className="rounded-full border-gold/20 hover:border-gold transition-all">
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-gold/80 font-semibold ml-1">Full Name</label>
                                            <Input name="name" required placeholder="Your Name" className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-gold/30 transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-gold/80 font-semibold ml-1">Email Address</label>
                                            <Input name="email" required type="email" placeholder="Your Email" className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-gold/30 transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-gold/80 font-semibold ml-1">Phone Number</label>
                                        <Input name="phone" required placeholder="+91 Your Number" className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-gold/30 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-gold/80 font-semibold ml-1">Subject</label>
                                        <Input name="subject" required placeholder="How can we help?" className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-gold/30 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-gold/80 font-semibold ml-1">Your Message</label>
                                        <Textarea name="message" required placeholder="Tell us about your requirements..." className="min-h-[150px] bg-white/[0.03] border-white/10 rounded-2xl focus:border-gold/30 transition-all p-4 resize-none" />
                                    </div>
                                    {status === "error" && (
                                        <p className="text-red-500 text-sm italic ml-1 mb-2">Something went wrong. Please try again or call us directly.</p>
                                    )}
                                    <Button type="submit" disabled={status === "loading"} className="w-full h-14 bg-gold-gradient hover:shadow-gold text-primary-foreground font-semibold rounded-2xl transition-all duration-300">
                                        {status === "loading" ? "Sending Enquiry..." : "Send Message"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Separator({ className }: { className?: string }) {
    return <div className={`w-full h-[1px] ${className}`} />;
}
