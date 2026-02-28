import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PoshStays — Premium Luxury Villa Booking",
    description: "Discover handpicked luxury villas, heritage havelis, farmhouses, and beachfront mansions across India. Book your dream stay with PoshStays.",
    keywords: "luxury villas, villa booking, premium stays, farmhouse booking, beach villa, India travel",
    openGraph: {
        title: "PoshStays — Premium Luxury Villa Booking",
        description: "Discover handpicked luxury villas and premium stays across India.",
        type: "website",
        locale: "en_IN",
        siteName: "PoshStays",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
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
