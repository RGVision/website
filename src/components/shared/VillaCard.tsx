import Link from "next/link";
import { FaMapMarkerAlt, FaStar, FaBed, FaBath, FaUsers } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Villa } from "@/data/villas";

interface VillaCardProps {
    villa: Villa;
}

export default function VillaCard({ villa }: VillaCardProps) {
    return (
        <Link href={`/villas/${villa.slug}`} className="group block">
            <Card className="overflow-hidden border-0 bg-white transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] shadow-soft rounded-[24px]">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={villa.images[0]}
                        alt={villa.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {villa.tag && (
                        <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-navy-dark border-0 uppercase tracking-[0.3em] text-[10px] font-black px-4 py-2 shadow-lg">
                            {villa.tag}
                        </Badge>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-medium group-hover:text-saffron transition-colors duration-300 font-display italic text-navy-dark tracking-tight">
                            {villa.name}
                        </h3>
                        <div className="flex items-center gap-1">
                            <FaStar className="text-saffron text-xs" />
                            <span className="font-black text-navy-dark text-xs">{villa.rating}</span>
                        </div>
                    </div>
                    
                    <p className="flex items-center gap-1.5 text-xs text-navy/70 font-bold uppercase tracking-widest mb-8">
                        <FaMapMarkerAlt className="text-saffron/60" />
                        {villa.location}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-linen">
                        <div className="flex gap-6 text-sm font-black text-navy/70 tracking-widest uppercase">
                            <span className="flex items-center gap-2"><FaBed /> {villa.bedrooms}</span>
                            <span className="flex items-center gap-2"><FaUsers /> {villa.maxGuests}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-black text-navy-dark tracking-tighter">₹{villa.price.toLocaleString()}</span>
                            <span className="text-xs text-saffron font-black uppercase tracking-widest">per night</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
