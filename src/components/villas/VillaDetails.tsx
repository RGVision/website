"use client";

import { useState } from "react";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import VillaCard from "@/components/shared/VillaCard";
import { Villa } from "@/data/villas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
    FaMapMarkerAlt, FaStar, FaBed, FaBath, FaUsers, FaRulerCombined,
    FaWifi, FaSwimmingPool, FaParking, FaSnowflake, FaFire, FaTree,
    FaUmbrellaBeach, FaMountain, FaSpa, FaUtensils,
    FaChevronLeft, FaChevronRight, FaExpand,
} from "react-icons/fa";
import type { IconType } from "react-icons";

const amenityIcons: Record<string, IconType> = {
    "WiFi": FaWifi, "Private Pool": FaSwimmingPool, "Pool": FaSwimmingPool,
    "Infinity Pool": FaSwimmingPool, "Rooftop Pool": FaSwimmingPool,
    "Parking": FaParking, "AC": FaSnowflake, "Heating": FaSnowflake,
    "Fireplace": FaFire, "Garden": FaTree, "Organic Garden": FaTree,
    "Beach Access": FaUmbrellaBeach, "Beachfront": FaUmbrellaBeach,
    "Ocean View": FaMountain, "Mountain View": FaMountain, "Lake View": FaMountain,
    "City View": FaMountain, "Forest View": FaTree, "Cliff View": FaMountain,
    "Tea Garden View": FaTree, "Farm View": FaTree,
    "Spa": FaSpa, "Ayurvedic Spa": FaSpa,
    "Chef": FaUtensils, "Local Cuisine": FaUtensils, "Royal Dining": FaUtensils,
};

interface VillaDetailsProps {
    villa: Villa;
    similarVillas: Villa[];
}

export default function VillaDetails({ villa, similarVillas }: VillaDetailsProps) {
    const [activeImage, setActiveImage] = useState(0);
    const [lightbox, setLightbox] = useState(false);

    const nextImage = () => setActiveImage((p) => (p + 1) % villa.images.length);
    const prevImage = () => setActiveImage((p) => (p - 1 + villa.images.length) % villa.images.length);

    return (
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest font-bold text-navy/40">
                <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
                <span>/</span>
                <Link href="/villas" className="hover:text-saffron transition-colors">Villas</Link>
                <span>/</span>
                <span className="text-navy/80">{villa.name}</span>
            </nav>

            {/* Gallery */}
            <div className="mb-12">
                <div className="relative rounded-[32px] overflow-hidden aspect-[16/8] mb-4 shadow-deep">
                    <img src={villa.images[activeImage]} alt={`${villa.name} - Image ${activeImage + 1}`} className="w-full h-full object-cover" />
                    <Button variant="outline" size="icon" onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-navy transition-all duration-300">
                        <FaChevronLeft />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-navy transition-all duration-300">
                        <FaChevronRight />
                    </Button>
                    <Button variant="outline" onClick={() => setLightbox(true)} className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-navy/60 text-white backdrop-blur-md border-0 hover:bg-navy transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <FaExpand className="text-xs" /> View Gallery
                    </Button>
                    {villa.tag && (
                        <Badge className="absolute top-6 left-6 bg-saffron text-navy border-0 uppercase tracking-[0.2em] text-[10px] font-bold px-5 py-2 hover:bg-saffron shadow-lg">
                            {villa.tag}
                        </Badge>
                    )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {villa.images.map((img, i) => (
                        <button key={i} onClick={() => setActiveImage(i)} className={`w-28 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 active:scale-95 ${activeImage === i ? "border-saffron shadow-lg scale-105" : "border-transparent opacity-50 hover:opacity-100"}`}>
                            <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
                {/* Details */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                        <div>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy font-semibold italic mb-4 tracking-tight">{villa.name}</h1>
                            <p className="flex items-center gap-2 text-navy/60 font-medium">
                                <FaMapMarkerAlt className="text-saffron" /> {villa.location}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 bg-saffron/10 px-6 py-3 rounded-full border border-saffron/20">
                                <FaStar className="text-saffron text-lg" />
                                <span className="font-bold text-navy text-lg">{villa.rating}</span>
                                <span className="text-navy/40 text-sm font-medium">/ {villa.reviews} experiences</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { icon: FaBed, value: villa.bedrooms, label: "Bedrooms" },
                            { icon: FaBath, value: villa.bathrooms, label: "Bathrooms" },
                            { icon: FaUsers, value: villa.maxGuests, label: "Max Guests" },
                            { icon: FaRulerCombined, value: villa.area, label: "Area" },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-soft hover:shadow-deep transition-all group">
                                <stat.icon className="text-saffron text-2xl mb-3 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-navy text-xl">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest text-navy/40 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <Separator className="bg-border/50 mb-12" />

                    {/* Description */}
                    <div className="mb-16">
                        <div className="flex items-center gap-6 mb-8">
                            <h2 className="font-display text-3xl font-semibold text-navy italic">About this property</h2>
                            <div className="flex-1 h-[1px] bg-border"></div>
                        </div>
                        <div className="p-8 md:p-10 rounded-[32px] bg-secondary/20 border border-border/50 relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-saffron/80"></div>
                            <p className="text-navy/70 leading-[2.2] text-lg font-medium">
                                {villa.description}
                            </p>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-12">
                        <h2 className="font-display text-2xl font-semibold mb-6 text-navy">Amenities</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {villa.amenities.map((amenity) => {
                                const Icon = amenityIcons[amenity] || FaStar;
                                return (
                                    <div key={amenity} className="flex items-center gap-4 px-6 py-4 bg-secondary/20 rounded-2xl border border-transparent hover:border-saffron/30 hover:bg-white transition-all text-navy font-semibold text-sm shadow-soft">
                                        <Icon className="text-saffron text-lg" />
                                        {amenity}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:sticky lg:top-[calc(72px+2rem)]">
                    <Card className="bg-navy border-0 mb-6 rounded-[32px] overflow-hidden shadow-deep">
                        <CardContent className="p-8 text-center bg-navy/90 backdrop-blur-md">
                            <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-3">Starting From</div>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="font-display text-5xl font-bold text-saffron">₹{villa.price.toLocaleString()}</span>
                                <span className="text-white/60 text-sm font-medium">/ night</span>
                            </div>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4 font-bold border-t border-white/10 pt-4">Inclusive of all luxury services & taxes</p>
                        </CardContent>
                    </Card>
                    <BookingForm villaName={villa.name} />
                </div>
            </div>

            {/* Similar Villas */}
            <Separator className="bg-border/50 mt-20 mb-16" />
            <section>
                <h2 className="font-display text-3xl md:text-4xl text-navy font-semibold mb-12 text-center md:text-left">
                    You might also <span className="text-saffron">love</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similarVillas.map((v) => <VillaCard key={v.slug} villa={v} />)}
                </div>
            </section>

            {/* Lightbox Dialog */}
            <Dialog open={lightbox} onOpenChange={setLightbox}>
                <DialogContent className="max-w-[95vw] max-h-[95vh] bg-navy/95 border-none p-4 flex items-center justify-center outline-none">
                    <DialogTitle className="sr-only">{villa.name} Gallery</DialogTitle>
                    <Button variant="outline" size="icon" onClick={prevImage} className="absolute z-10 left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-navy focus:ring-0">
                        <FaChevronLeft className="text-lg" />
                    </Button>
                    <div className="relative group overflow-hidden rounded-2xl shadow-deep">
                        <img src={villa.images[activeImage]} alt={villa.name} className="max-w-full max-h-[90vh] object-contain" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white tracking-widest">
                            {activeImage + 1} / {villa.images.length}
                        </div>
                    </div>
                    <Button variant="outline" size="icon" onClick={nextImage} className="absolute z-10 right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-navy focus:ring-0">
                        <FaChevronRight className="text-lg" />
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
