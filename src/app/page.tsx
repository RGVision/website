import HeroSection from "@/components/home/HeroSection";
import LocationSection from "@/components/home/LocationSection";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import StoryGallery from "@/components/home/StoryGallery";
import StatsSection from "@/components/home/StatsSection";
import OffersSection from "@/components/home/OffersSection";
import InspirationCarousel from "@/components/home/InspirationCarousel";
import HomeDiscovery from "@/components/home/HomeDiscovery";
import { getVillas, getCategories, getExperiences, getStats, getTestimonials } from "@/lib/db";

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

    // Dynamic Stats Calculation
    const dynamicStats = [
        { number: allVillas.length, suffix: "+", label: "Premium Properties" },
        { number: new Set(allVillas.map(v => v.location)).size, suffix: "+", label: "Destinations" },
        { number: 24, suffix: "x7", label: "Concierge Support" },
        { number: 5000, suffix: "+", label: "Happy Guests" },
    ];

    return (
        <div className="overflow-hidden">
            <HeroSection />

            <div className="max-w-7xl mx-auto px-6">
                <HomeDiscovery
                    categories={categories}
                    initialVillas={allVillas}
                />

                <LocationSection title="Best Beach Villas" villas={beachVillas} />
                <ExperiencesSection experiences={experiences} />
                <StoryGallery />
                <OffersSection />
                <StatsSection stats={dynamicStats} />
                <InspirationCarousel testimonials={testimonials} />
            </div>
        </div>
    );
}
