export interface Category {
    id: string;
    label: string;
    icon: string;
}

export interface Experience {
    title: string;
    subtitle: string;
    image: string;
    icon: string;
}

export interface Stat {
    number: number;
    suffix: string;
    label: string;
}

export interface Testimonial {
    name: string;
    avatar: string;
    rating: number;
    text: string;
    location: string;
}

export const categories: Category[] = [
    { id: "all", label: "Featured", icon: "FaStar" },
    { id: "featured", label: "Trending Destinations", icon: "FaFire" },
    { id: "countryside", label: "Countryside Escapes", icon: "FaMountain" },
    { id: "forest", label: "Forest Retreats", icon: "FaTree" },
    { id: "farmhouse", label: "Farmhouses", icon: "FaHome" },
    { id: "beachfront", label: "Beachfront Collection", icon: "FaUmbrellaBeach" },
    { id: "apartment", label: "Premium Apartments", icon: "FaBuilding" },
];

export const experiences: Experience[] = [
    { title: "Corporate Retreats", subtitle: "Team building in luxury", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", icon: "corporate" },
    { title: "Birthday Celebrations", subtitle: "Unforgettable parties", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", icon: "birthday" },
    { title: "Romantic Getaways", subtitle: "Love in paradise", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", icon: "romantic" },
    { title: "Wedding Venues", subtitle: "Dream celebrations", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", icon: "wedding" },
];

export const stats: Stat[] = [
    { number: 5000, suffix: "+", label: "Premium Properties" },
    { number: 100, suffix: "+", label: "Destinations" },
    { number: 24, suffix: "x7", label: "Concierge Support" },
    { number: 24, suffix: "K+", label: "Happy Guests" },
];

export const testimonials: Testimonial[] = [
    { name: "Priya Sharma", avatar: "PS", rating: 5, text: "Absolutely stunning property! The villa exceeded all our expectations. The private pool, the views, and the impeccable service made our anniversary truly special.", location: "Stayed at Oceanview Paradise Villa" },
    { name: "Rahul Mehta", avatar: "RM", rating: 5, text: "Best corporate retreat ever! Our team of 12 had the most productive and relaxing offsite. The villa was spacious, well-equipped, and the chef prepared amazing meals.", location: "Stayed at Heritage Haveli Palace" },
    { name: "Ananya Das", avatar: "AD", rating: 5, text: "We hosted our daughter's birthday here and it was magical! The staff helped with decorations, the space was perfect for kids, and the bonfire night was unforgettable.", location: "Stayed at Royal Forest Retreat" },
];
