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
            <Card className="bg-white border-border shadow-soft">
                <CardContent className="pt-10 pb-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-saffron flex items-center justify-center mx-auto mb-6 animate-scaleIn shadow-lg">
                        <FaCheck className="text-navy text-2xl" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3 text-navy">Booking Request Sent!</h3>
                    <p className="text-navy/60 text-sm">We&apos;ll confirm your stay at <strong className="text-navy font-bold">{villaName}</strong> within 24 hours.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white border-border w-full shadow-deep rounded-[32px] overflow-hidden">
            <CardHeader className="pb-4 pt-8">
                <CardTitle className="font-display text-2xl text-center text-navy font-semibold">Book Your Stay</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-10">
                <form onSubmit={handleSubmit}>
                    {/* Step Dots */}
                    <div className="flex items-center justify-center gap-8 mb-8 relative">
                        <div className="absolute top-1/2 left-[25%] right-[25%] h-0.5 bg-border -translate-y-1/2 z-0" />
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative z-10 transition-all duration-300 border-2 ${step >= s ? "bg-navy border-navy text-white shadow-lg" : "bg-white border-border text-navy/30"}`}>
                                {s}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="flex flex-col gap-4 w-full animate-fadeInUp">
                            <div className="relative w-full">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-sm z-10" />
                                <Input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="pl-12 h-14 bg-secondary/30 border-border text-navy placeholder:text-navy/30 rounded-xl focus-visible:ring-saffron/50 focus-visible:border-saffron" />
                            </div>
                            <div className="relative w-full">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-sm z-10" />
                                <Input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="pl-12 h-14 bg-secondary/30 border-border text-navy placeholder:text-navy/30 rounded-xl focus-visible:ring-saffron/50 focus-visible:border-saffron" />
                            </div>
                            <div className="relative w-full">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-sm z-10" />
                                <Input name="phone" type="tel" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required className="pl-12 h-14 bg-secondary/30 border-border text-navy placeholder:text-navy/30 rounded-xl focus-visible:ring-saffron/50 focus-visible:border-saffron" />
                            </div>
                            <Button type="button" onClick={() => setStep(2)} className="w-full h-14 bg-navy text-white font-bold rounded-xl hover:bg-navy-dark transition-all duration-300 border-0 uppercase tracking-widest text-xs mt-2">
                                Next Step
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Dates & Guests */}
                    {step === 2 && (
                        <div className="flex flex-col gap-4 w-full animate-fadeInUp">
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <div className="w-full">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy/40 mb-2 block ml-1">Check-in *</label>
                                    <div className="relative w-full">
                                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-sm z-10 pointer-events-none" />
                                        <Input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required className="pl-12 h-14 bg-secondary/30 border-border text-navy rounded-xl focus-visible:ring-saffron/50 focus-visible:border-saffron cursor-pointer [color-scheme:light]" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy/40 mb-2 block ml-1">Check-out *</label>
                                    <div className="relative w-full">
                                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-sm z-10 pointer-events-none" />
                                        <Input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required className="pl-12 h-14 bg-secondary/30 border-border text-navy rounded-xl focus-visible:ring-saffron/50 focus-visible:border-saffron cursor-pointer [color-scheme:light]" />
                                    </div>
                                </div>
                            </div>
                            <Select value={formData.guests} onValueChange={(v) => setFormData({ ...formData, guests: v })}>
                                <SelectTrigger className="h-14 bg-secondary/30 border-border text-navy rounded-xl focus:ring-saffron/50">
                                    <div className="flex items-center">
                                        <FaUsers className="text-navy/40 text-sm mr-4 ml-1" />
                                        <SelectValue placeholder="Select guests" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border shadow-xl">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map((n) => (
                                        <SelectItem key={n} value={String(n)} className="text-navy focus:bg-secondary focus:text-navy cursor-pointer">{n} Guest{n > 1 ? "s" : ""}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex gap-3 w-full mt-2">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="min-w-[100px] h-14 border-border text-navy/60 hover:text-navy hover:bg-secondary/50 rounded-xl font-bold uppercase tracking-widest text-xs">
                                    Back
                                </Button>
                                <Button type="button" onClick={() => setStep(3)} className="flex-1 h-14 bg-navy text-white font-bold rounded-xl hover:bg-navy-dark transition-all duration-300 border-0 uppercase tracking-widest text-xs">
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
                                className="bg-secondary/30 border-border text-navy placeholder:text-navy/30 resize-none min-h-[120px] rounded-xl focus-visible:ring-saffron/50 focus-visible:border-saffron p-4"
                            />
                            {error && <p className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-xl">{error}</p>}
                            <div className="flex gap-3 w-full mt-2">
                                <Button type="button" variant="outline" onClick={() => setStep(2)} className="min-w-[100px] h-14 border-border text-navy/60 hover:text-navy hover:bg-secondary/50 rounded-xl font-bold uppercase tracking-widest text-xs">
                                    Back
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1 h-14 bg-saffron text-navy font-bold rounded-xl hover:bg-saffron/90 transition-all duration-300 disabled:opacity-70 border-0 uppercase tracking-[0.2em] text-xs shadow-lg">
                                    {loading ? <><FaSpinner className="animate-spin-slow mr-2" /> Sending...</> : <><FaPaperPlane className="mr-2" /> Send Booking</>}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
