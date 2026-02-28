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
            <nav className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/villas" className="hover:text-primary transition-colors">Villas</Link>
                <span>/</span>
                <span className="text-foreground/80">{villa.name}</span>
            </nav>

            {/* Gallery */}
            <div className="mb-10">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/8] mb-3">
                    <img src={villa.images[activeImage]} alt={`${villa.name} - Image ${activeImage + 1}`} className="w-full h-full object-cover" />
                    <Button variant="outline" size="icon" onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/70 border-white/15 text-foreground backdrop-blur-md hover:bg-gold-gradient hover:border-primary hover:text-primary-foreground">
                        <FaChevronLeft />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/70 border-white/15 text-foreground backdrop-blur-md hover:bg-gold-gradient hover:border-primary hover:text-primary-foreground">
                        <FaChevronRight />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setLightbox(true)} className="absolute bottom-4 right-4 rounded-lg bg-background/70 border-white/15 text-foreground backdrop-blur-md hover:bg-gold-gradient hover:text-primary-foreground">
                        <FaExpand />
                    </Button>
                    {villa.tag && (
                        <Badge className="absolute top-4 left-4 bg-gold-gradient text-primary-foreground border-0 uppercase tracking-wide text-sm font-bold px-5 py-2 hover:bg-gold-gradient">
                            {villa.tag}
                        </Badge>
                    )}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {villa.images.map((img, i) => (
                        <button key={i} onClick={() => setActiveImage(i)} className={`w-24 h-[68px] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeImage === i ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-90"}`}>
                            <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
                {/* Details */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                        <div>
                            <h1 className="font-display text-[length:var(--font-size-h1)] font-bold mb-2">{villa.name}</h1>
                            <p className="flex items-center gap-2 text-muted-foreground">
                                <FaMapMarkerAlt className="text-primary" /> {villa.location}
                            </p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-2 px-5 py-2.5 rounded-full border-border text-sm">
                            <FaStar className="text-primary" />
                            <span className="font-bold">{villa.rating}</span>
                            <span className="text-muted-foreground">({villa.reviews} reviews)</span>
                        </Badge>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {[
                            { icon: FaBed, value: villa.bedrooms, label: "Bedrooms" },
                            { icon: FaBath, value: villa.bathrooms, label: "Bathrooms" },
                            { icon: FaUsers, value: villa.maxGuests, label: "Max Guests" },
                            { icon: FaRulerCombined, value: villa.area, label: "Area" },
                        ].map((stat) => (
                            <Card key={stat.label} className="bg-card border-border">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <stat.icon className="text-primary text-lg" />
                                    <div>
                                        <div className="font-bold">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Separator className="bg-border mb-10" />

                    {/* Description */}
                    <div className="mb-10">
                        <h2 className="font-display text-xl font-semibold mb-4">About this property</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">{villa.description}</p>
                    </div>

                    {/* Amenities */}
                    <div className="mb-10">
                        <h2 className="font-display text-xl font-semibold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {villa.amenities.map((amenity) => {
                                const Icon = amenityIcons[amenity] || FaStar;
                                return (
                                    <Card key={amenity} className="bg-card border-border hover:border-primary/30 transition-all">
                                        <CardContent className="flex items-center gap-3 px-4 py-3 text-sm">
                                            <Icon className="text-primary" />
                                            {amenity}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:sticky lg:top-[calc(72px+1.5rem)]">
                    <Card className="bg-card border-border mb-4">
                        <CardContent className="p-6 text-center">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="font-display text-[length:var(--font-size-h1)] font-bold text-primary">₹{villa.price.toLocaleString()}</span>
                                <span className="text-muted-foreground">/ night</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
                        </CardContent>
                    </Card>
                    <BookingForm villaName={villa.name} />
                </div>
            </div>

            {/* Similar Villas */}
            <Separator className="bg-border mt-16 mb-12" />
            <section>
                <h2 className="font-display text-[length:var(--font-size-h2)] font-semibold mb-10">
                    You might also <span className="text-primary">love</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similarVillas.map((v) => <VillaCard key={v.slug} villa={v} />)}
                </div>
            </section>

            {/* Lightbox Dialog */}
            <Dialog open={lightbox} onOpenChange={setLightbox}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] bg-black/95 border-white/10 p-4 flex items-center justify-center">
                    <DialogTitle className="sr-only">{villa.name} Gallery</DialogTitle>
                    <Button variant="outline" size="icon" onClick={prevImage} className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 border-white/20 text-white hover:bg-gold-gradient hover:border-primary hover:text-primary-foreground">
                        <FaChevronLeft />
                    </Button>
                    <img src={villa.images[activeImage]} alt={villa.name} className="max-w-[80vw] max-h-[80vh] object-contain rounded-xl" />
                    <Button variant="outline" size="icon" onClick={nextImage} className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 border-white/20 text-white hover:bg-gold-gradient hover:border-primary hover:text-primary-foreground">
                        <FaChevronRight />
                    </Button>
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-white/10 rounded-full text-sm text-white/80">
                        {activeImage + 1} / {villa.images.length}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
