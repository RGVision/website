import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const socials = [
    { icon: FaInstagram, href: "https://www.instagram.com/vorastays", label: "Instagram", desc: "Experience more, stay inspired." },
    { icon: FaFacebook, href: "https://www.facebook.com/share/1CRsmzK7hV", label: "Facebook" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/vora-stays/", label: "LinkedIn" },
];

const columns = [
    { 
        title: "DISCOVERY", 
        links: [
            { label: "Our Collection", href: "/villas" },
            { label: "Experiences", href: "#" },
            { label: "Philosophy", href: "/about" },
            { label: "Careers", href: "#", desc: "Shaping premium hospitality." },
            { label: "Journal", href: "#", desc: "Destination inspirations." }
        ] 
    },
    { 
        title: "SUPPORT", 
        links: [
            { label: "Concierge", href: "#", desc: "Assisting every step." },
            { label: "Safety & Assurance", href: "#", desc: "Verified standards." },
            { label: "Cancellations", href: "#", desc: "Subject to availability." },
            { label: "Terms of Service", href: "/terms", desc: "Ensuring transparency." }
        ] 
    },
    { 
        title: "HOSTING", 
        links: [
            { label: "List Your Villa", href: "#", desc: "Partner with us." },
            { label: "Host Privileges", href: "#", desc: "Gain expert support." },
            { label: "Community", href: "#", desc: "Like-minded hosts." },
            { label: "Partnerships", href: "#", desc: "Collaborate with us." }
        ] 
    },
];

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#0F172A] text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-20">
                    {/* Brand Branding */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 p-0.5">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img src="/logo.jpeg" alt="Vora Stays" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <span className="text-2xl font-semibold tracking-tighter uppercase">
                                Vora <span className="font-display italic text-saffron font-light">Stays</span>
                            </span>
                        </Link>
                        <p className="text-sm text-white/40 leading-[1.8] mb-10 max-w-sm font-medium italic">
                            Vision of Relaxed Accommodation. We curate India's most breathtaking private estates for families to bond in absolute luxury.
                        </p>
                        <div className="flex gap-4">
                            {socials.map((s) => (
                                <a 
                                    key={s.label} 
                                    href={s.href} 
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-saffron hover:border-saffron transition-all duration-500"
                                >
                                    <s.icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    {columns.map((col) => (
                        <div key={col.title} className="lg:col-span-1">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10">{col.title}</h4>
                            <ul className="flex flex-col gap-6">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="group block"
                                        >
                                            <span className="text-[13px] font-medium text-white/50 group-hover:text-white transition-all duration-300">
                                                {link.label}
                                            </span>
                                            {link.desc && (
                                                <span className="block text-[9px] text-white/20 font-medium tracking-tight mt-1 group-hover:text-white/30 transition-all">
                                                    {link.desc}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                ))}

                {/* Contact Section */}
                <div className="lg:col-span-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10">Enquiries</h4>
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-saffron mb-3 opacity-50">Instant Assistance</p>
                            <a href="tel:+919384870117" className="text-xl font-medium tracking-tight hover:text-saffron transition-all duration-500 flex flex-col mb-1">
                                +91 93848 70117
                            </a>
                            <a href="mailto:vorastays@gmail.com" className="text-[11px] font-medium text-white/40 hover:text-white transition-all">
                                vorastays@gmail.com
                            </a>
                            <p className="text-[11px] font-medium text-white/40 mt-1">
                                Chennai, India
                            </p>
                        </div>
                        
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                            <span className="text-[8px] uppercase font-black tracking-[0.3em] text-white/40">Travel Experts Live</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                    © 2026 VORA STAYS. CRAFTED FOR EXCEPTIONAL STAYS.
                </div>
                <div className="flex gap-10">
                    <Link href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">
                        Privacy policy
                    </Link>
                    <Link href="/terms" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">
                        Terms of service
                    </Link>
                    <Link href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">
                        Sitemap
                    </Link>
                </div>
            </div>
        </div>
    </footer>
);
}
