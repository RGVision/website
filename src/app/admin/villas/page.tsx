import { getVillas, getCategories } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import VillasClient from "./VillasClient";

export default async function VillasManager() {
    const [villas, categories] = await Promise.all([getVillas(), getCategories()]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 pt-24">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin">
                            <Button variant="ghost" size="icon" className="hover:bg-slate-800 text-slate-400 hover:text-white">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-display font-bold tracking-tight">Manage <span className="text-gold">Villas</span></h1>
                            <p className="text-slate-500 text-sm mt-1">Add, update or remove luxury listings from the platform.</p>
                        </div>
                    </div>
                </div>

                <VillasClient villas={villas} categories={categories} />
            </div>
        </div>
    );
}
