"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaSearch, FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        handleScroll(); // Check on mount
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = pathname === "/";
    const isScrolled = scrolled || !isHome;

    const links = [
        { href: "/", label: "Home" },
        { href: "/villas", label: "Villas" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-black/5 group-hover:border-saffron transition-all duration-500">
                        <img src="/logo.jpeg" alt="Vora Stays" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-2xl font-semibold tracking-tighter uppercase transition-colors duration-300 ${isScrolled ? "text-navy" : "text-white"}`}>
                        Vora <span className="font-display italic text-saffron font-light">Stays</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative py-2 ${isScrolled ? "text-navy-dark hover:text-saffron" : "text-white hover:text-saffron"}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Button asChild className="hidden md:flex bg-navy text-white hover:bg-saffron rounded-full font-black px-10 h-12 transition-all duration-500 shadow-xl border-0 uppercase text-[10px] tracking-widest">
                        <Link href="/villas">Book Now</Link>
                    </Button>

                    <a href="https://wa.me/916382221757" target="_blank" className={`hidden md:flex items-center gap-2 px-6 h-12 rounded-full font-black text-[10px] tracking-widest transition-all duration-500 border ${isScrolled ? "bg-secondary text-navy-dark border-0" : "bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20"}`}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" className={`w-3.5 h-3.5`} />
                        <span>WHATSAPP</span>
                    </a>

                    {/* Mobile Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className={`md:hidden ${isScrolled ? "text-navy" : "text-white"} hover:bg-transparent px-0`}>
                                <FaBars className="text-2xl" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white border-border w-[300px]">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-saffron/30">
                                        <img src="/logo.jpeg" alt="Vora Stays" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-xl font-semibold tracking-wider uppercase text-navy">Vora <span className="font-display italic text-saffron">Stays</span></span>
                                </SheetTitle>
                            </SheetHeader>
                            <Separator className="bg-border my-4" />
                            <div className="flex flex-col gap-1">
                                {links.map((link) => (
                                    <Button key={link.href} variant="ghost" asChild className="justify-start text-navy/70 hover:text-navy hover:bg-secondary">
                                        <Link href={link.href}>{link.label}</Link>
                                    </Button>
                                ))}
                                <Separator className="bg-border my-3" />
                                <Button asChild className="bg-navy text-white font-semibold border-0 mb-2">
                                    <Link href="/villas">Book Now</Link>
                                </Button>
                                <Button asChild className="bg-[#25D366] text-white font-semibold border-0">
                                    <a href="https://wa.me/916382221757" target="_blank">WhatsApp</a>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
