export interface Villa {
    slug: string;
    name: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    area: string;
    images: string[];
    amenities: string[];
    description: string;
    category: string;
    featured: boolean;
    tag: string;
}

export const villas: Villa[] = [];

export const getVillaBySlug = (slug: string): Villa | undefined => villas.find((v) => v.slug === slug);
export const getVillasByCategory = (category: string): Villa[] => category === "all" ? villas : villas.filter((v) => v.category === category);
export const getFeaturedVillas = (): Villa[] => villas.filter((v) => v.featured);
export const getForestVillas = (): Villa[] => villas.filter((v) => v.category === "forest" || v.category === "countryside");
