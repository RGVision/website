import { getCategories } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CategoriesClient from "./CategoriesClient";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center space-x-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold font-display">Manage Categories</h1>
                </div>

                <CategoriesClient categories={categories} />
            </div>
        </div>
    );
}
