"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, X, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCategory, deleteCategory, updateCategory } from "@/lib/actions";

export default function CategoriesClient({ categories: initialCategories }: { categories: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    const startEdit = (cat: any) => {
        setEditingId(cat.id);
        setEditForm({ ...cat });
    };

    return (
        <div className="space-y-8">
            <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={async (formData) => {
                        const data = {
                            id: formData.get("id") as string,
                            label: formData.get("label") as string,
                            icon: formData.get("icon") as string,
                        };
                        await createCategory(data);
                    }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input name="id" placeholder="ID (e.g. beachfront)" className="bg-slate-800 border-slate-700" required />
                        <Input name="label" placeholder="Label (e.g. Beachfront)" className="bg-slate-800 border-slate-700" required />
                        <Input name="icon" placeholder="Icon ID (e.g. FaWater)" className="bg-slate-800 border-slate-700" required />
                        <div className="md:col-span-3">
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" /> Add Category
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {initialCategories.map((cat) => (
                    <div key={cat.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                        {editingId === cat.id ? (
                            <div className="flex gap-4 items-center">
                                <Input disabled value={editForm.id} className="bg-slate-800 border-slate-700 flex-1 opacity-50" />
                                <Input value={editForm.label} onChange={(e) => setEditForm({...editForm, label: e.target.value})} className="bg-slate-800 border-slate-700 flex-1" />
                                <Input value={editForm.icon} onChange={(e) => setEditForm({...editForm, icon: e.target.value})} className="bg-slate-800 border-slate-700 flex-1" />
                                <div className="flex space-x-2">
                                    <Button onClick={async () => { await updateCategory(cat.id, editForm); setEditingId(null); }} className="bg-emerald-600">
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" onClick={() => setEditingId(null)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{cat.label}</p>
                                    <p className="text-xs text-slate-500">ID: {cat.id} | Icon: {cat.icon}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => startEdit(cat)}>
                                        <Edit2 className="h-4 w-4 text-blue-400" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={async () => await deleteCategory(cat.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
