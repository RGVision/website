import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://vorastays.in"),
    title: "VORA – Where Exclusivity Meets Timeless Elegance",
    description: "Experience the art of exclusive travel with VORA. Curated luxury villas and heritage escapes across India, redefining luxury travel with unparalleled privacy and elegance.",
    keywords: "VORA, luxury villas, villa booking, premium stays, farmhouse booking, beach villa, India travel, exclusive escapes",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "VORA – Where Exclusivity Meets Timeless Elegance",
        description: "Experience the art of exclusive travel. Curated luxury villas and heritage escapes across India.",
        type: "website",
        url: "https://vorastays.in",
        images: [
            {
                url: "/premium_hero_villa_1_1773935436305.png",
                width: 1200,
                height: 630,
                alt: "VORA - Luxury Villa",
            },
        ],
        locale: "en_IN",
        siteName: "VORA",
    },
    twitter: {
        card: "summary_large_image",
        title: "VORA – Exclusive Luxury Escapes",
        description: "Curated luxury villas and heritage escapes across India.",
        images: ["/premium_hero_villa_1_1773935436305.png"],
    },
    icons: {
        icon: "/square_logo.png",
        apple: "/square_logo.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LodgingBusiness",
                            "name": "VORA",
                            "description": "Exclusivity Meets Timeless Elegance. Curated luxury villas and heritage escapes across India.",
                            "url": "https://vorastays.in",
                            "telephone": "+919384870117",
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "IN"
                            },
                            "priceRange": "$$$",
                            "image": "https://vorastays.in/premium_hero_villa_1_1773935436305.png"
                        })
                    }}
                />
            </head>
            <body>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <WhatsAppButton />
            </body>
        </html>
    );
}
