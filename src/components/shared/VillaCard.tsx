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
            <Card className="overflow-hidden border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30 hover:border-primary/20">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={villa.images[0]}
                        alt={villa.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {villa.tag && (
                        <Badge className="absolute top-4 left-4 bg-gold-gradient text-primary-foreground border-0 uppercase tracking-wide text-xs font-bold px-3 py-1.5 hover:bg-gold-gradient">
                            {villa.tag}
                        </Badge>
                    )}
                    <div className="absolute bottom-4 left-4">
                        <span className="text-2xl font-bold font-display">₹{villa.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground"> / night</span>
                    </div>
                </div>

                {/* Content */}
                <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300 font-display">
                        {villa.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                        <FaMapMarkerAlt className="text-primary text-xs" />
                        {villa.location}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><FaBed className="text-primary" /> {villa.bedrooms}</span>
                            <span className="flex items-center gap-1"><FaBath className="text-primary" /> {villa.bathrooms}</span>
                            <span className="flex items-center gap-1"><FaUsers className="text-primary" /> {villa.maxGuests}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <FaStar className="text-primary text-xs" />
                            <span className="font-semibold">{villa.rating}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
