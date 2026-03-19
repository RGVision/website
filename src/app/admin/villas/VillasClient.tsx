"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VillaForm from "./VillaForm";
import { deleteVilla } from "@/lib/actions";

export default function VillasClient({ villas, categories }: { villas: any[], categories: any[] }) {
    const [editingVilla, setEditingVilla] = useState<any | null>(null);

    return (
        <div className="space-y-8">
            <Card className="bg-slate-900 border-slate-800 border-gold/20 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-display text-gold">
                        {editingVilla ? `Editing ${editingVilla.name}` : "Add New Luxury Villa"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <VillaForm 
                        key={editingVilla?.slug || "new"}
                        categories={categories} 
                        initialData={editingVilla} 
                        onCancel={() => setEditingVilla(null)} 
                    />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {villas.map((villa) => (
                    <Card key={villa.slug} className="bg-slate-900 border-slate-800 flex flex-col group relative overflow-hidden h-full">
                        <div className="h-48 bg-slate-800 relative rounded-t-xl overflow-hidden">
                            {villa.images?.[0] ? (
                                <img src={villa.images[0]} alt={villa.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500 font-display italic">
                                    <ImageIcon className="h-12 w-12 opacity-20 mr-2" />
                                    No Image Provided
                                </div>
                            )}
                            
                            {/* Overlay Controls */}
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <Button 
                                    onClick={() => {
                                        setEditingVilla(villa);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }} 
                                    size="icon" 
                                    className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur-sm"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                    onClick={async () => {
                                        if (confirm(`Are you sure you want to delete ${villa.name}?`)) {
                                            await deleteVilla(villa.slug);
                                        }
                                    }} 
                                    variant="destructive" 
                                    size="icon" 
                                    className="bg-red-500/90 hover:bg-red-600 backdrop-blur-sm"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {villa.featured && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-gold/90 text-black text-[10px] font-bold uppercase tracking-widest rounded backdrop-blur-sm">
                                    Featured
                                </div>
                            )}
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-gold opacity-80">{villa.category?.label || villa.category}</p>
                                    <CardTitle className="text-xl font-display line-clamp-1">{villa.name}</CardTitle>
                                    <p className="text-xs text-slate-400 font-medium">{villa.location}</p>
                                </div>
                                <p className="font-bold text-emerald-400 text-lg">₹{villa.price.toLocaleString()}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow pb-6">
                            <p className="text-xs text-slate-400 line-clamp-2 italic opacity-80 mb-4">&ldquo;{villa.description}&rdquo;</p>
                            <div className="flex flex-wrap gap-2">
                                {villa.amenities?.slice(0, 3).map((a: string) => (
                                    <span key={a} className="px-2 py-0.5 bg-slate-800/50 text-slate-300 rounded-full text-[10px] border border-slate-700/50">
                                        {a}
                                    </span>
                                ))}
                                {villa.amenities?.length > 3 && (
                                    <span className="text-[10px] text-slate-500 font-medium self-center">+{villa.amenities.length - 3} more</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
