"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaPaperPlane, FaCheck, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    villaName: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    specialRequests: string;
}

export default function BookingForm({ villaName }: Props) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormData>({
        name: "", email: "", phone: "", checkIn: "", checkOut: "", guests: "2", specialRequests: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, villaName }),
            });
            const data = await res.json();
            if (data.success) setSuccess(true);
            else setError(data.message || "Something went wrong.");
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Card className="bg-card border-border">
                <CardContent className="pt-10 pb-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-success)] to-green-600 flex items-center justify-center mx-auto mb-6 animate-scaleIn">
                        <FaCheck className="text-white text-2xl" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">Booking Request Sent!</h3>
                    <p className="text-muted-foreground text-sm">We&apos;ll confirm your stay at <strong className="text-foreground">{villaName}</strong> within 24 hours.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-card border-border w-full">
            <CardHeader className="pb-4">
                <CardTitle className="font-display text-xl text-center">Book Your Stay</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {/* Step Dots */}
                    <div className="flex items-center justify-center gap-8 mb-8 relative">
                        <div className="absolute top-1/2 left-[25%] right-[25%] h-0.5 bg-border -translate-y-1/2 z-0" />
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold relative z-10 transition-all duration-300 border-2 ${step >= s ? "bg-gold-gradient border-primary text-primary-foreground" : "bg-secondary border-border text-muted-foreground"}`}>
                                {s}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="flex flex-col gap-4 w-full animate-fadeInUp">
                            <div className="relative w-full">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10" />
                                <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="pl-10 h-12 bg-white/[0.04] border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary" />
                            </div>
                            <div className="relative w-full">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10" />
                                <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="pl-10 h-12 bg-white/[0.04] border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary" />
                            </div>
                            <div className="relative w-full">
                                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10" />
                                <Input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="pl-10 h-12 bg-white/[0.04] border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary" />
                            </div>
                            <Button type="button" onClick={() => setStep(2)} className="w-full h-12 bg-gold-gradient text-primary-foreground font-semibold hover:-translate-y-0.5 hover:shadow-gold transition-all duration-300 border-0">
                                Next Step
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Dates & Guests */}
                    {step === 2 && (
                        <div className="flex flex-col gap-4 w-full animate-fadeInUp">
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <div className="w-full">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">Check-in</label>
                                    <div className="relative w-full">
                                        <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10 pointer-events-none" />
                                        <Input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required className="pl-10 h-12 bg-white/[0.04] border-border text-foreground focus-visible:ring-primary/50 focus-visible:border-primary cursor-pointer [color-scheme:dark]" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5 block">Check-out</label>
                                    <div className="relative w-full">
                                        <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm z-10 pointer-events-none" />
                                        <Input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required className="pl-10 h-12 bg-white/[0.04] border-border text-foreground focus-visible:ring-primary/50 focus-visible:border-primary cursor-pointer [color-scheme:dark]" />
                                    </div>
                                </div>
                            </div>
                            <Select value={formData.guests} onValueChange={(v) => setFormData({ ...formData, guests: v })}>
                                <SelectTrigger className="h-12 bg-white/[0.04] border-border text-foreground focus:ring-primary/50">
                                    <FaUsers className="text-muted-foreground text-sm mr-2" />
                                    <SelectValue placeholder="Select guests" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--color-bg-secondary)] border-border">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map((n) => (
                                        <SelectItem key={n} value={String(n)} className="text-foreground focus:bg-accent focus:text-accent-foreground">{n} Guest{n > 1 ? "s" : ""}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex gap-3 w-full">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="min-w-[100px] h-12 border-border text-muted-foreground hover:text-foreground hover:border-foreground/30">
                                    Back
                                </Button>
                                <Button type="button" onClick={() => setStep(3)} className="flex-1 h-12 bg-gold-gradient text-primary-foreground font-semibold hover:-translate-y-0.5 hover:shadow-gold transition-all duration-300 border-0">
                                    Next Step
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Submit */}
                    {step === 3 && (
                        <div className="flex flex-col gap-4 w-full animate-fadeInUp">
                            <Textarea
                                name="specialRequests"
                                placeholder="Any special requests? (Optional)"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                rows={4}
                                className="bg-white/[0.04] border-border text-foreground placeholder:text-muted-foreground resize-y min-h-[100px] focus-visible:ring-primary/50 focus-visible:border-primary"
                            />
                            {error && <p className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-xl">{error}</p>}
                            <div className="flex gap-3 w-full">
                                <Button type="button" variant="outline" onClick={() => setStep(2)} className="min-w-[100px] h-12 border-border text-muted-foreground hover:text-foreground">
                                    Back
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1 h-12 bg-gold-gradient text-primary-foreground font-semibold hover:-translate-y-0.5 hover:shadow-gold transition-all duration-300 disabled:opacity-70 border-0">
                                    {loading ? <><FaSpinner className="animate-spin-slow" /> Sending...</> : <><FaPaperPlane /> Send Booking</>}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
