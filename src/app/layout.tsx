import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vora Stays — Vision of Relaxed Accommodation",
    description: "Discover handpicked luxury villas, heritage havelis, and premium stays. Vision of Relaxed Accommodation with Vora Stays.",
    keywords: "Vora Stays, luxury villas, villa booking, premium stays, farmhouse booking, beach villa, India travel",
    openGraph: {
        title: "Vora Stays — Vision of Relaxed Accommodation",
        description: "Discover handpicked luxury villas and premium stays across India.",
        type: "website",
        locale: "en_IN",
        siteName: "Vora Stays",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body>
                <Navbar />
                <main className="min-h-screen pt-[72px]">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
