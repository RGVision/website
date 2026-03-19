import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const socials = [
    { icon: FaInstagram, href: "https://www.instagram.com/vorastays?igsh=Z21pdXZ5MjdsanN0", label: "Instagram" },
    { icon: FaFacebook, href: "https://www.facebook.com/share/1CRsmzK7hV/?mibextid=wwXIfr", label: "Facebook" },
    { icon: FaTwitter, href: "https://x.com/vorastays?s=21", label: "Twitter" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/vora-stays/", label: "LinkedIn" },
];

const columns = [
    { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
    { title: "Support", links: ["Help Center", "Safety", "Cancellation", "Contact Us", "Terms of Service"] },
    { title: "Hosting", links: ["List Your Property", "Host Resources", "Community Forum", "Partner Programs"] },
];

export default function Footer() {
    return (
        <footer id="contact" className="border-t border-border bg-[var(--color-bg-secondary)]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/30">
                                <img src="/logo.jpeg" alt="Vora Stays" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-light tracking-widest uppercase">
                                Vora <span className="font-display italic lowercase text-gold">Stays</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs italic">
                            Your trusted partner for "Vision of Relaxed Accommodation". We provide verified, premium villa experiences with 24/7 on-ground support.
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
                                        <Link
                                            href={link === "Contact Us" ? "/contact" : (link === "About Us" ? "/about" : "#")}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div id="contact">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">Enquiries</h4>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-muted-foreground italic">
                                For personalized selections and group bookings, speak to our luxury travel experts.
                            </p>
                            <a href="tel:+916382221757" className="text-lg text-gold hover:text-white transition-colors">
                                +91 63822 21757
                            </a>
                            <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Available 24/7 for you</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="bg-border" />

            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">© 2025 Vora Stays. All rights reserved.</p>
                <div className="flex gap-6">
                    {["Privacy", "Terms", "Sitemap"].map((l) => (
                        <a key={l} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">{l}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
