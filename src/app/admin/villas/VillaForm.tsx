"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { createVilla, updateVilla } from "@/lib/actions";

interface Category {
    id: string;
    label: string;
}

export default function VillaForm({ 
    categories, 
    initialData, 
    onCancel 
}: { 
    categories: Category[]; 
    initialData?: any;
    onCancel?: () => void;
}) {
    const isEditing = !!initialData;
    const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const data = {
                slug: (formData.get("slug") as string) || initialData?.slug,
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
                images: imageUrls,
                amenities: (formData.get("amenities") as string).split(",").map(s => s.trim()).filter(Boolean),
                rating: parseFloat(formData.get("rating") as string) || initialData?.rating || 5.0,
                reviews: parseInt(formData.get("reviews") as string) || initialData?.reviews || 0,
            };
            
            if (isEditing) {
                await updateVilla(initialData.slug, data);
            } else {
                await createVilla(data);
            }
            window.location.reload(); 
        } catch (error) {
            console.error("Error saving villa:", error);
            alert("Failed to save villa. Please check all fields.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Slug (Unique ID)</label>
                <Input name="slug" placeholder="e.g. coconut-grove-villa" required disabled={isEditing} defaultValue={initialData?.slug} className="bg-slate-800 border-slate-700 disabled:opacity-50" />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 ml-1">Villa Name</label>
                <Input name="name" placeholder="e.g. Royal Beach House" required defaultValue={initialData?.name} className="bg-slate-800 border-slate-700" />
            </div>
            <Input name="location" placeholder="Location" required defaultValue={initialData?.location} className="bg-slate-800 border-slate-700" />
            <Input name="price" type="number" placeholder="Price per night" required defaultValue={initialData?.price} className="bg-slate-800 border-slate-700" />
            <Input name="bedrooms" type="number" placeholder="Bedrooms" required defaultValue={initialData?.bedrooms} className="bg-slate-800 border-slate-700" />
            <Input name="bathrooms" type="number" placeholder="Bathrooms" required defaultValue={initialData?.bathrooms} className="bg-slate-800 border-slate-700" />
            <Input name="max_guests" type="number" placeholder="Max Guests" required defaultValue={initialData?.max_guests || initialData?.maxGuests} className="bg-slate-800 border-slate-700" />
            <Input name="area" placeholder="Area (e.g. 2500 sq.ft)" required defaultValue={initialData?.area} className="bg-slate-800 border-slate-700" />
            <Input name="rating" type="number" step="0.1" placeholder="Rating" defaultValue={initialData?.rating} className="bg-slate-800 border-slate-700" />
            <Input name="reviews" type="number" placeholder="Reviews Count" defaultValue={initialData?.reviews} className="bg-slate-800 border-slate-700" />
            
            <select name="category" defaultValue={initialData?.category} className="bg-slate-800 border-slate-700 rounded-md p-2 text-sm text-slate-100" required>
                <option value="">Select Category</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                ))}
            </select>
            <Input name="tag" placeholder="Tag (e.g. Bestseller)" defaultValue={initialData?.tag} className="bg-slate-800 border-slate-700" />
            
            <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-300">Description</label>
                <textarea name="description" placeholder="Describe the villa..." defaultValue={initialData?.description} className="w-full bg-slate-800 border-slate-700 rounded-md p-2 text-sm h-24 text-slate-100" required />
            </div>

            <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-300">Amenities (comma separated)</label>
                <Input name="amenities" placeholder="Private Pool, WiFi, AC..." defaultValue={initialData?.amenities?.join(", ")} className="bg-slate-800 border-slate-700" required />
            </div>

            <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-300">Property Photos</label>
                <ImageUpload onImagesChange={setImageUrls} initialImages={initialData?.images} />
            </div>

            <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" name="featured" defaultChecked={initialData?.featured} className="form-checkbox bg-slate-800 border-slate-700 rounded text-gold focus:ring-gold" />
                <span className="text-slate-300">Feature this property on homepage</span>
            </label>

            <div className="md:col-span-2 pt-4 flex space-x-3">
                <Button type="submit" disabled={loading} className={`flex-[2] h-12 text-lg font-bold tracking-tight shadow-lg transition-all ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                    {loading ? "Processing..." : (
                        <div className="flex items-center justify-center">
                            {isEditing ? <Check className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                            {isEditing ? "SAVE CHANGES" : "ADD PROPERTY"}
                        </div>
                    )}
                </Button>
                {isEditing && (
                    <Button type="button" variant="ghost" onClick={onCancel} className="flex-1 h-12 border border-slate-800 hover:bg-slate-800 text-slate-400">
                        <X className="h-4 w-4 mr-2" /> CANCEL
                    </Button>
                )}
            </div>
        </form>
    );
}
