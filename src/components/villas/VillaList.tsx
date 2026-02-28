"use client";

import { useState, useMemo } from "react";
import VillaCard from "@/components/shared/VillaCard";
import { Villa } from "@/data/villas";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface VillaListProps {
    villas: Villa[];
    locations: string[];
}

export default function VillaList({ villas, locations }: VillaListProps) {
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const [sortBy, setSortBy] = useState("featured");
    const [showFilters, setShowFilters] = useState(false);

    const filteredVillas = useMemo(() => {
        let result = [...villas];
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((v) => v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q));
        }
        if (selectedLocation !== "all") result = result.filter((v) => v.location === selectedLocation);
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
    }, [villas, search, selectedLocation, priceRange, sortBy]);

    return (
        <div>
            {/* Search + Filter */}
            <div className="flex gap-3 mb-8">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                    <Input
                        type="text"
                        placeholder="Search by name or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-11 h-12 bg-white/[0.04] border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 focus-visible:border-primary rounded-xl"
                    />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6 border-border text-muted-foreground hover:border-primary hover:text-primary rounded-xl">
                    <FaFilter /> Filters
                </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <Card className="bg-card border-border mb-10">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">Location</label>
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="h-11 bg-white/[0.04] border-border text-foreground focus:ring-primary/50">
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--color-bg-secondary)] border-border">
                                    <SelectItem value="all">All Locations</SelectItem>
                                    {locations.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">Price Range</label>
                            <Select value={priceRange} onValueChange={setPriceRange}>
                                <SelectTrigger className="h-11 bg-white/[0.04] border-border text-foreground focus:ring-primary/50">
                                    <SelectValue placeholder="Any Price" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--color-bg-secondary)] border-border">
                                    <SelectItem value="all">Any Price</SelectItem>
                                    <SelectItem value="0-8000">Under ₹8,000</SelectItem>
                                    <SelectItem value="8000-15000">₹8,000 - ₹15,000</SelectItem>
                                    <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                                    <SelectItem value="25000-1000000">₹25,000+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">Sort By</label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-11 bg-white/[0.04] border-border text-foreground focus:ring-primary/50">
                                    <SelectValue placeholder="Featured" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--color-bg-secondary)] border-border">
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredVillas.length > 0 ? (
                    filteredVillas.map((villa) => <VillaCard key={villa.slug} villa={villa} />)
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        <p className="text-xl mb-6">No villas found matching your criteria.</p>
                        <Button onClick={() => { setSearch(""); setSelectedLocation("all"); setPriceRange("all"); }} className="bg-gold-gradient text-primary-foreground rounded-full border-0 font-semibold">
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
