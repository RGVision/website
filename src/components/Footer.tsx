import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const socials = [
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

const columns = [
    { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
    { title: "Support", links: ["Help Center", "Safety", "Cancellation", "Terms of Service"] },
    { title: "Hosting", links: ["List Your Property", "Host Resources", "Community Forum", "Partner Programs"] },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-[var(--color-bg-secondary)]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-5 group">
                            <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center">
                                <FaHome className="text-primary-foreground text-sm" />
                            </div>
                            <span className="text-xl font-bold">
                                <span className="text-primary">Posh</span>{" "}
                                <span className="font-display italic">Stays</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                            Discover handpicked luxury villas and premium stays across India&apos;s most stunning destinations.
                        </p>
                        <div className="flex gap-2">
                            {socials.map((s) => (
                                <Button key={s.label} variant="outline" size="icon" asChild className="rounded-full border-border text-muted-foreground hover:text-primary hover:border-primary/30">
                                    <a href={s.href} aria-label={s.label}><s.icon className="text-sm" /></a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">{col.title}</h4>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-border" />

            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">© 2025 PoshStays. All rights reserved.</p>
                <div className="flex gap-6">
                    {["Privacy", "Terms", "Sitemap"].map((l) => (
                        <a key={l} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">{l}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
