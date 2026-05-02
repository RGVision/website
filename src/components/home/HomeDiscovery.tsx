"use client";

import { useState, useMemo } from "react";
import CategoryTabs from "@/components/home/CategoryTabs";
import FeaturedSection from "@/components/home/FeaturedSection";
import { Category } from "@/data/categories";
import { Villa } from "@/data/villas";

interface HomeDiscoveryProps {
    categories: Category[];
    initialVillas: Villa[];
}

export default function HomeDiscovery({ categories, initialVillas }: HomeDiscoveryProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredVillas = useMemo(() => {
        if (activeCategory === "all") return initialVillas;
        // Note: Since this is a client component, and we want it to be snappy,
        // we might want to pass all villas and filter locally, or accept the small 
        // delay if we use an API. For now, since it's ISR, let's assume initialVillas
        // are the featured ones and we might need to fetch others if not pre-provided.
        // However, to keep it simple and within the prompt's request for ISR:
        // We'll pass all villas from the server or fetch them.
        return initialVillas.filter(v => activeCategory === "all" || v.category === activeCategory);
    }, [activeCategory, initialVillas]);

    return (
        <section className="pt-12 md:pt-20">
            <h2 className="font-brand text-2xl md:text-3xl text-navy mb-8 uppercase tracking-wider">
                Discover Our <span className="text-saffron font-brand">Newest Gems</span>
            </h2>
            <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            <FeaturedSection
                title=""
                villas={filteredVillas.length > 0 ? filteredVillas : initialVillas.slice(0, 4)}
            />
        </section>
    );
}
