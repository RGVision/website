import { getVillas, getCategories } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createVilla, deleteVilla } from "@/lib/actions";
import { Plus, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function VillasManager() {
    const [villas, categories] = await Promise.all([getVillas(), getCategories()]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center space-x-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Manage Villas</h1>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle>Add New Villa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            "use server";
                            const data = {
                                slug: formData.get("slug") as string,
                                name: formData.get("name") as string,
                                location: formData.get("location") as string,
                                price: parseInt(formData.get("price") as string),
                                bedrooms: parseInt(formData.get("bedrooms") as string),
                                bathrooms: parseInt(formData.get("bathrooms") as string),
                                max_guests: parseInt(formData.get("max_guests") as string),
                                area: formData.get("area") as string,
                                category: formData.get("category") as string,
                                description: formData.get("description") as string,
                                featured: formData.get("featured") === "on",
                                tag: formData.get("tag") as string,
                                images: (formData.get("images") as string).split(",").map(s => s.trim()),
                                amenities: (formData.get("amenities") as string).split(",").map(s => s.trim()),
                            };
                            await createVilla(data);
                        }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input name="slug" placeholder="Slug (unique-id)" required className="bg-slate-800 border-slate-700" />
                            <Input name="name" placeholder="Name" required className="bg-slate-800 border-slate-700" />
                            <Input name="location" placeholder="Location" required className="bg-slate-800 border-slate-700" />
                            <Input name="price" type="number" placeholder="Price per night" required className="bg-slate-800 border-slate-700" />
                            <Input name="bedrooms" type="number" placeholder="Bedrooms" required className="bg-slate-800 border-slate-700" />
                            <Input name="bathrooms" type="number" placeholder="Bathrooms" required className="bg-slate-800 border-slate-700" />
                            <Input name="max_guests" type="number" placeholder="Max Guests" required className="bg-slate-800 border-slate-700" />
                            <Input name="area" placeholder="Area (e.g. 2500 sq.ft)" required className="bg-slate-800 border-slate-700" />
                            <select name="category" className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm" required>
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.label}</option>
                                ))}
                            </select>
                            <Input name="tag" placeholder="Tag (e.g. Bestseller)" className="bg-slate-800 border-slate-700" />
                            <div className="md:col-span-2">
                                <textarea name="description" placeholder="Description" className="w-full bg-slate-800 border-slate-700 rounded-md p-2 text-sm h-24" required />
                            </div>
                            <div className="md:col-span-2">
                                <Input name="images" placeholder="Image URLs (comma separated)" className="bg-slate-800 border-slate-700" required />
                            </div>
                            <div className="md:col-span-2">
                                <Input name="amenities" placeholder="Amenities (comma separated)" className="bg-slate-800 border-slate-700" required />
                            </div>
                            <label className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" name="featured" className="form-checkbox bg-slate-800 border-slate-700 rounded" />
                                <span>Featured Villa</span>
                            </label>
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                    <Plus className="h-4 w-4 mr-2" /> Add Villa
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {villas.map((villa) => (
                        <Card key={villa.slug} className="bg-slate-900 border-slate-800 flex flex-col">
                            <div className="h-48 bg-slate-800 relative rounded-t-xl overflow-hidden">
                                {villa.images?.[0] ? (
                                    <img src={villa.images[0]} alt={villa.name} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-500">
                                        <ImageIcon className="h-12 w-12" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <form action={async () => {
                                        "use server";
                                        await deleteVilla(villa.slug);
                                    }}>
                                        <Button variant="destructive" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        {/* Trash icon visible always for easier management */}
                                        <Button variant="destructive" size="icon" className="bg-red-500/80 hover:bg-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{villa.name}</CardTitle>
                                        <p className="text-sm text-slate-400">{villa.location}</p>
                                    </div>
                                    <p className="font-bold text-emerald-500">₹{villa.price}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-slate-400 line-clamp-2">{villa.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-slate-800 rounded text-xs">{villa.category}</span>
                                    {villa.featured && <span className="px-2 py-1 bg-gold/10 text-gold rounded text-xs border border-gold/20">Featured</span>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
