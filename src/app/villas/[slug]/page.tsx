import VillaDetails from "@/components/villas/VillaDetails";
import { getVillaBySlug, getVillas } from "@/lib/db";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
    const villas = await getVillas();
    return villas.map((villa) => ({
        slug: villa.slug,
    }));
}

export default async function VillaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const villa = await getVillaBySlug(slug);

    if (!villa) {
        notFound();
    }

    const allVillas = await getVillas();
    const similarVillas = allVillas.filter((v) => v.slug !== villa.slug).slice(0, 3);

    return <VillaDetails villa={villa} similarVillas={similarVillas} />;
}
