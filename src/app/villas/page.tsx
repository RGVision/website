"use client";
import { useState, useMemo } from "react";
import VillaCard from "@/components/shared/VillaCard";
import { villas } from "@/data/villas";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const locations = [...new Set(villas.map((v) => v.location))];

export default function VillasPage() {
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
            result = result.filter((v) => v.price >= min && v.price <= max);
        }
        switch (sortBy) {
            case "price-low": result.sort((a, b) => a.price - b.price); break;
            case "price-high": result.sort((a, b) => b.price - a.price); break;
            case "rating": result.sort((a, b) => b.rating - a.rating); break;
            default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }
        return result;
    }, [search, selectedLocation, priceRange, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 min-h-[80vh]">
            {/* Header */}
            <div className="mb-10">
                <h1 className="font-display text-[length:var(--font-size-h1)] font-bold mb-2">
                    Explore <span className="text-primary">Luxury Villas</span>
                </h1>
                <p className="text-muted-foreground">{filteredVillas.length} handpicked properties across India</p>
            </div>

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
                <Card className="bg-card border-border mb-10 animate-fadeInUp">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">Location</label>
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="h-11 bg-white/[0.04] border-border text-foreground focus:ring-primary/50">
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--color-bg-secondary)] border-border">
                                    <SelectItem value="all" className="text-foreground focus:bg-accent">All Locations</SelectItem>
                                    {locations.map((loc) => (
                                        <SelectItem key={loc} value={loc} className="text-foreground focus:bg-accent">{loc}</SelectItem>
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
                                    <SelectItem value="all" className="text-foreground focus:bg-accent">Any Price</SelectItem>
                                    <SelectItem value="0-8000" className="text-foreground focus:bg-accent">Under ₹8,000</SelectItem>
                                    <SelectItem value="8000-15000" className="text-foreground focus:bg-accent">₹8,000 - ₹15,000</SelectItem>
                                    <SelectItem value="15000-25000" className="text-foreground focus:bg-accent">₹15,000 - ₹25,000</SelectItem>
                                    <SelectItem value="25000-100000" className="text-foreground focus:bg-accent">₹25,000+</SelectItem>
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
                                    <SelectItem value="featured" className="text-foreground focus:bg-accent">Featured</SelectItem>
                                    <SelectItem value="price-low" className="text-foreground focus:bg-accent">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high" className="text-foreground focus:bg-accent">Price: High to Low</SelectItem>
                                    <SelectItem value="rating" className="text-foreground focus:bg-accent">Top Rated</SelectItem>
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
