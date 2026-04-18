"use client";

import { useState, useMemo, useEffect } from "react";
import VillaCard from "@/components/shared/VillaCard";
import { Villa } from "@/data/villas";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

interface VillaListProps {
    villas: Villa[];
    locations: string[];
}

export default function VillaList({ villas, locations }: VillaListProps) {
    const searchParams = useSearchParams();
    
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(() => {
        const loc = searchParams.get("location");
        if (loc) {
            const match = locations.find(l => l.toLowerCase().includes(loc.toLowerCase()));
            return match || loc;
        }
        return "all";
    });
    const [priceRange, setPriceRange] = useState("all");
    const [sortBy, setSortBy] = useState("featured");
    const [showFilters, setShowFilters] = useState(!!searchParams.get("location"));
    const [guestCount, setGuestCount] = useState(searchParams.get("guests") || "1");

    useEffect(() => {
        const loc = searchParams.get("location");
        if (loc) {
            const match = locations.find(l => l.toLowerCase().includes(loc.toLowerCase()));
            setSelectedLocation(match || loc);
            setShowFilters(true);
        }
        const g = searchParams.get("guests");
        if (g) setGuestCount(g);
    }, [searchParams, locations]);

    const filteredVillas = useMemo(() => {
        let result = [...villas];
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((v) => v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q));
        }
        
        if (selectedLocation !== "all") {
            result = result.filter((v) => v.location.toLowerCase().includes(selectedLocation.toLowerCase()));
        }

        if (guestCount !== "any") {
            result = result.filter((v) => v.maxGuests >= parseInt(guestCount));
        }

        if (priceRange !== "all") {
            const [min, max] = priceRange.split("-").map(Number);
            result = result.filter((v) => v.price >= min && v.price <= (max || Infinity));
        }
        
        switch (sortBy) {
            case "price-low": result.sort((a, b) => a.price - b.price); break;
            case "price-high": result.sort((a, b) => b.price - a.price); break;
            case "rating": result.sort((a, b) => b.rating - a.rating); break;
            default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }
        return result;
    }, [villas, search, selectedLocation, priceRange, sortBy, guestCount]);

    return (
        <div>
            <div className="flex gap-4 mb-10">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30 z-10" />
                    <Input
                        type="text"
                        placeholder="Search by name or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-12 h-14 bg-white shadow-soft border-border text-navy placeholder:text-navy/30 focus-visible:ring-saffron/50 focus-visible:border-saffron rounded-2xl"
                    />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className={`h-14 px-8 border-border rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all ${showFilters ? "bg-navy text-white border-navy" : "bg-white text-navy hover:bg-secondary/50"}`}>
                    <FaFilter className="mr-2" /> Filters
                </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <Card className="bg-white border-border mb-12 shadow-deep rounded-[24px] overflow-hidden">
                    <CardContent className="p-8 flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-bold mb-3 block ml-1">Location</label>
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="h-12 bg-secondary/30 border-border text-navy rounded-xl focus:ring-saffron/50 font-medium">
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border shadow-xl">
                                    <SelectItem value="all">All Locations</SelectItem>
                                    {locations.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-bold mb-3 block ml-1">Price Range</label>
                            <Select value={priceRange} onValueChange={setPriceRange}>
                                <SelectTrigger className="h-12 bg-secondary/30 border-border text-navy rounded-xl focus:ring-saffron/50 font-medium">
                                    <SelectValue placeholder="Any Price" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border shadow-xl">
                                    <SelectItem value="all">Any Price</SelectItem>
                                    <SelectItem value="0-8000">Under ₹8,000</SelectItem>
                                    <SelectItem value="8000-15000">₹8,000 - ₹15,000</SelectItem>
                                    <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                                    <SelectItem value="25000-1000000">₹25,000+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-bold mb-3 block ml-1">Guests</label>
                            <Select value={guestCount} onValueChange={setGuestCount}>
                                <SelectTrigger className="h-12 bg-secondary/30 border-border text-navy rounded-xl focus:ring-saffron/50 font-medium">
                                    <SelectValue placeholder="Any Guests" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border shadow-xl">
                                    <SelectItem value="any">Any Guests</SelectItem>
                                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                                        <SelectItem key={num} value={num.toString()}>{num}{num === 12 ? '+' : ''} Guests</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-bold mb-3 block ml-1">Sort By</label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-12 bg-secondary/30 border-border text-navy rounded-xl focus:ring-saffron/50 font-medium">
                                    <SelectValue placeholder="Featured" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border shadow-xl">
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Top Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVillas.length > 0 ? (
                    filteredVillas.map((villa) => <VillaCard key={villa.slug} villa={villa} />)
                ) : (
                    <div className="col-span-full text-center py-24 text-navy/40 border-2 border-dashed border-border rounded-[32px] bg-secondary/10">
                        <p className="text-2xl font-display mb-8">No villas found matching your criteria.</p>
                        <Button onClick={() => { setSearch(""); setSelectedLocation("all"); setPriceRange("all"); }} className="bg-navy text-white rounded-full border-0 font-bold uppercase tracking-widest text-xs px-8 h-12">
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
