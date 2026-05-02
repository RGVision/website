"use client";
import VillaCard from "@/components/shared/VillaCard";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import type { Villa } from "@/data/villas";

interface Props {
    title: string;
    villas: Villa[];
}

export default function LocationSection({ title, villas }: Props) {
    return (
        <section className="py-16">
            <div className="flex items-center justify-between mb-10">
                <h2 className="font-brand text-xl md:text-2xl text-navy uppercase tracking-wider">{title}</h2>
                <Link href="/villas" className="flex items-center gap-2 text-saffron text-sm font-bold hover:gap-3 transition-all duration-300 uppercase tracking-widest">
                    View All <FaChevronRight className="text-xs" />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {villas.map((villa) => (
                    <VillaCard key={villa.slug} villa={villa} />
                ))}
            </div>
        </section>
    );
}
