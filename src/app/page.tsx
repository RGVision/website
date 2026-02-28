"use client";
import { useState, useMemo } from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoryTabs from "@/components/home/CategoryTabs";
import FeaturedSection from "@/components/home/FeaturedSection";
import LocationSection from "@/components/home/LocationSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import StoryGallery from "@/components/home/StoryGallery";
import StatsSection from "@/components/home/StatsSection";
import OffersSection from "@/components/home/OffersSection";
import InspirationCarousel from "@/components/home/InspirationCarousel";
import { villas, getFeaturedVillas, getForestVillas, getVillasByCategory } from "@/data/villas";
import { categories, experiences, stats, testimonials } from "@/data/categories";

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredVillas = useMemo(() => {
        if (activeCategory === "all") return getFeaturedVillas();
        return getVillasByCategory(activeCategory);
    }, [activeCategory]);

    const forestVillas = getForestVillas();

    return (
        <div className="overflow-hidden">
            <HeroSection />

            <div className="max-w-7xl mx-auto px-6">
                {/* Discover */}
                <section className="pt-20">
                    <h2 className="font-display text-[length:var(--font-size-h2)] font-semibold">
                        Discover Our <span className="text-gold">Newest Gems</span>
                    </h2>
                    <CategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                    <FeaturedSection title="" villas={filteredVillas.length > 0 ? filteredVillas : villas.slice(0, 4)} />
                </section>

                <LocationSection title="Best Forest & Countryside Villas" villas={forestVillas} />
                <ExperiencesSection experiences={experiences} />
                <StoryGallery />
                <OffersSection />
                <StatsSection stats={stats} />
                <InspirationCarousel testimonials={testimonials} />
            </div>
        </div>
    );
}
