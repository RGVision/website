import VillaList from "@/components/villas/VillaList";
import { getVillas } from "@/lib/db";
import { Suspense } from "react";

export default async function VillasPage() {
    const villas = await getVillas();
    const locations = Array.from(new Set(villas.map((v) => v.location)));

    return (
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 min-h-[80vh]">
            {/* Header */}
            <div className="mb-10">
                <h1 className="font-display text-[length:var(--font-size-h1)] font-bold mb-2">
                    Explore <span className="text-primary">Luxury Villas</span>
                </h1>
                <p className="text-muted-foreground">{villas.length} handpicked properties across India</p>
            </div>

            <Suspense fallback={<div className="text-center py-20 text-muted-foreground italic">Loading our collections...</div>}>
                <VillaList villas={villas} locations={locations} />
            </Suspense>
        </div>
    );
}
