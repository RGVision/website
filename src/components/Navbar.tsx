"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaSearch, FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { href: "/", label: "Home" },
        { href: "/villas", label: "Villas" },
        { href: "/villas?category=farmhouse", label: "Farmhouses" },
        { href: "/villas?category=apartment", label: "Apartments" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center group-hover:shadow-gold transition-shadow duration-300">
                        <FaHome className="text-primary-foreground text-sm" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-primary">Posh</span>{" "}
                        <span className="font-display italic">Stays</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold-gradient after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2.5 glass rounded-full">
                        <FaSearch className="text-xs text-muted-foreground" />
                        <Input
                            placeholder="Search destinations..."
                            className="border-0 bg-transparent text-sm h-auto p-0 focus-visible:ring-0 placeholder:text-muted-foreground w-40"
                        />
                    </div>
                    <Button asChild className="hidden md:flex bg-gold-gradient hover:shadow-gold rounded-full text-primary-foreground font-semibold hover:-translate-y-0.5 transition-all duration-300 border-0">
                        <Link href="/villas">Book Now</Link>
                    </Button>

                    {/* Mobile Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                                <FaBars className="text-lg" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background border-border w-[300px]">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                                        <FaHome className="text-primary-foreground text-sm" />
                                    </div>
                                    <span><span className="text-primary">Posh</span> <span className="font-display italic">Stays</span></span>
                                </SheetTitle>
                            </SheetHeader>
                            <Separator className="bg-border my-4" />
                            <div className="flex flex-col gap-1">
                                {links.map((link) => (
                                    <Button key={link.href} variant="ghost" asChild className="justify-start text-muted-foreground hover:text-foreground">
                                        <Link href={link.href}>{link.label}</Link>
                                    </Button>
                                ))}
                                <Separator className="bg-border my-3" />
                                <Button asChild className="bg-gold-gradient text-primary-foreground font-semibold border-0">
                                    <Link href="/villas">Book Now</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
