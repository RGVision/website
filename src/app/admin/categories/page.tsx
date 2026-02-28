import { getCategories } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory, deleteCategory } from "@/lib/actions";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CategoriesManager() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center space-x-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Manage Categories</h1>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle>Add New Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            "use server";
                            const data = {
                                id: formData.get("id") as string,
                                label: formData.get("label") as string,
                                icon: formData.get("icon") as string,
                            };
                            await createCategory(data);
                        }} className="flex gap-4">
                            <Input name="id" placeholder="ID (e.g. beach)" className="bg-slate-800 border-slate-700" required />
                            <Input name="label" placeholder="Label (e.g. Beachfront)" className="bg-slate-800 border-slate-700" required />
                            <Input name="icon" placeholder="Icon Name (e.g. FaWater)" className="bg-slate-800 border-slate-700" required />
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" /> Add
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-lg">
                            <div>
                                <p className="font-semibold">{cat.label}</p>
                                <p className="text-sm text-slate-400">ID: {cat.id} | Icon: {cat.icon}</p>
                            </div>
                            <form action={async () => {
                                "use server";
                                await deleteCategory(cat.id);
                            }}>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Re-using Card components for simplicity
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`rounded-xl border shadow ${className}`}>{children}</div>;
}
function CardHeader({ children }: { children: React.ReactNode }) {
    return <div className="p-6 pb-3">{children}</div>;
}
function CardTitle({ children }: { children: React.ReactNode }) {
    return <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>;
}
function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-6 pt-0">{children}</div>;
}
