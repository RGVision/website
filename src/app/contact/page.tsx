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
        <div className="min-h-screen pt-32 pb-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-24 animate-fadeInUp">
                    <div className="inline-flex items-center gap-3 px-8 py-3 bg-secondary/50 rounded-full mb-8 border border-border">
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-navy font-bold">Get in Touch</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-navy font-semibold mb-8">
                        Contact <span className="text-saffron italic">Us</span>
                    </h1>
                    <p className="text-navy/60 text-xl leading-relaxed font-medium">
                        Have questions about our villas or need assistance with your booking? Our dedicated team is here to help you plan your perfect stay.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Info */}
                    <div className="space-y-8 animate-fadeInLeft" style={{ animationDelay: "0.2s" }}>
                        <div className="bg-navy p-10 rounded-[40px] shadow-deep space-y-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 blur-[80px] -mr-32 -mt-32" />

                            <div className="relative z-10">
                                <h3 className="text-[10px] font-bold text-saffron uppercase tracking-[0.4em] mb-10">Contact Details</h3>
                                <div className="space-y-10">
                                    <div className="flex items-start gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-saffron transition-all duration-500 shadow-lg">
                                            <FaPhoneAlt className="text-saffron group-hover:text-navy transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40 mb-2 uppercase tracking-widest font-bold">Phone & WhatsApp</p>
                                            <div className="flex flex-col gap-2">
                                                <a href="tel:+919384870117" className="text-2xl font-semibold text-white hover:text-saffron transition-colors tracking-wide">+91 93848 70117</a>
                                                <a href="tel:+919384870119" className="text-2xl font-semibold text-white hover:text-saffron transition-colors tracking-wide">+91 93848 70119</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-saffron transition-all duration-500 shadow-lg">
                                            <FaEnvelope className="text-saffron group-hover:text-navy transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40 mb-2 uppercase tracking-widest font-bold">Email Address</p>
                                            <a href="mailto:vorastays@gmail.com" className="text-2xl font-semibold text-white hover:text-saffron transition-colors tracking-wide">vorastays@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 pt-10 border-t border-white/10">
                                <h3 className="text-[10px] font-bold text-saffron uppercase tracking-[0.4em] mb-4">Trust & Reliability</h3>
                                <p className="text-white/60 leading-relaxed font-medium italic text-sm">
                                    As your trusted partner for premium accommodation, we ensure verified properties and round-the-clock support for a worry-free experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="animate-fadeInRight" style={{ animationDelay: "0.4s" }}>
                        <div className="bg-white p-10 md:p-12 rounded-[40px] border border-border shadow-deep">
                            {status === "success" ? (
                                <div className="text-center py-16 space-y-8">
                                    <div className="w-24 h-24 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                        <FaPaperPlane className="text-4xl text-saffron" />
                                    </div>
                                    <h2 className="text-4xl font-display text-navy font-semibold italic">Message Sent</h2>
                                    <p className="text-navy/60 font-medium">Thank you for reaching out. Our luxury consultants will get back to you within 24 hours.</p>
                                    <Button onClick={() => setStatus("idle")} className="rounded-full bg-navy text-white px-8 h-12 font-bold uppercase tracking-widest text-xs">
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-bold ml-1">Full Name</label>
                                            <Input name="name" required placeholder="Your Name" className="h-14 bg-secondary/30 border-border rounded-xl focus:border-saffron/50 transition-all text-navy placeholder:text-navy/40" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-bold ml-1">Email Address</label>
                                            <Input name="email" required type="email" placeholder="Your Email" className="h-14 bg-secondary/30 border-border rounded-xl focus:border-saffron/50 transition-all text-navy placeholder:text-navy/40" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-bold ml-1">Phone Number</label>
                                        <Input name="phone" required placeholder="+91 Your Number" className="h-14 bg-secondary/30 border-border rounded-xl focus:border-saffron/50 transition-all text-navy placeholder:text-navy/40" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-bold ml-1">Subject</label>
                                        <Input name="subject" required placeholder="How can we help?" className="h-14 bg-secondary/30 border-border rounded-xl focus:border-saffron/50 transition-all text-navy placeholder:text-navy/40" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-navy font-bold ml-1">Your Message</label>
                                        <Textarea name="message" required placeholder="Tell us about your requirements..." className="min-h-[150px] bg-secondary/30 border-border rounded-xl focus:border-saffron/50 transition-all p-4 resize-none text-navy placeholder:text-navy/40" />
                                    </div>
                                    {status === "error" && (
                                        <p className="text-red-500 text-sm font-bold italic ml-1 mb-2">Something went wrong. Please try again or call us directly.</p>
                                    )}
                                    <Button type="submit" disabled={status === "loading"} className="w-full h-14 bg-navy hover:bg-navy/90 text-white font-black rounded-xl transition-all duration-300 shadow-xl uppercase tracking-[0.3em] text-[10px] border-0">
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
