import HeroSection from "@/components/home/HeroSection";
import LocationSection from "@/components/home/LocationSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import StoryGallery from "@/components/home/StoryGallery";
import StatsSection from "@/components/home/StatsSection";
import OffersSection from "@/components/home/OffersSection";
import InspirationCarousel from "@/components/home/InspirationCarousel";
import HomeDiscovery from "@/components/home/HomeDiscovery";
import { getVillas, getCategories, getExperiences, getStats, getTestimonials } from "@/lib/db";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "VORA – Where Exclusivity Meets Timeless Elegance",
    description: "Experience the art of exclusive travel with VORA. Curated luxury villas and heritage escapes across India, redefining luxury travel with unparalleled privacy and elegance.",
};

export default async function HomePage() {
    const [categories, allVillas, experiences, stats, testimonials] = await Promise.all([
        getCategories(),
        getVillas(),
        getExperiences(),
        getStats(),
        getTestimonials()
    ]);

    const featuredVillas = allVillas.filter(v => v.featured);
    const beachVillas = allVillas.filter(v => v.category === "beachfront");

    // Dynamic Stats Calculation (Automated)
    const dynamicStats = [
        { number: allVillas.length, suffix: "+", label: "Premium Properties" },
        { number: new Set(allVillas.map(v => v.location)).size, suffix: "+", label: "Destinations" },
        { number: 24, suffix: "x7", label: "Concierge Support" },
        { number: 5000, suffix: "+", label: "Happy Guests" },
    ];

    // Priority: DB Stats -> Automated Dynamic Stats
    const displayStats = stats && stats.length > 0 ? stats : dynamicStats;

    return (
        <div className="overflow-hidden">
            <HeroSection villas={[]} categories={[]} />

            <div className="max-w-7xl mx-auto px-6">
                <HomeDiscovery
                    categories={categories}
                    initialVillas={allVillas}
                />

                <LocationSection title="Best Beach Villas" villas={beachVillas} />
                <ExperiencesSection experiences={experiences} />
                <StoryGallery villas={allVillas} />
                {/* <OffersSection /> */}
                <StatsSection stats={displayStats} />
                <InspirationCarousel testimonials={testimonials} />
            </div>
        </div>
    );
}
