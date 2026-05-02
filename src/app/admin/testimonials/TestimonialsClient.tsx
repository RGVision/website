"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/lib/actions";
import { Plus, Trash2, ArrowLeft, Star, Edit2, X, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestimonialsClient({ testimonials: initialTestimonials }: { testimonials: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    const startEdit = (t: any) => {
        setEditingId(t.id);
        setEditForm({ ...t });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center space-x-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon" className="hover:bg-slate-800">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Manage Testimonials</h1>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle>Add New Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            const data = {
                                name: formData.get("name") as string,
                                avatar: formData.get("avatar") as string,
                                rating: parseInt(formData.get("rating") as string),
                                text: formData.get("text") as string,
                                location: formData.get("location") as string,
                            };
                            await createTestimonial(data);
                        }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input name="name" placeholder="Guest Name" className="bg-slate-800 border-slate-700" required />
                            <Input name="avatar" placeholder="Avatar Initials" className="bg-slate-800 border-slate-700" maxLength={2} required />
                            <Input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" className="bg-slate-800 border-slate-700" required />
                            <Input name="location" placeholder="Location" className="bg-slate-800 border-slate-700" required />
                            <div className="md:col-span-2">
                                <textarea name="text" placeholder="Review Text" className="w-full bg-slate-800 border-slate-700 rounded-md p-2 text-sm h-24" required />
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                                    <Plus className="h-4 w-4 mr-2" /> Add Testimonial
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4">
                    {initialTestimonials.map((t) => (
                        <div key={t.id} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4 relative">
                            {editingId === t.id ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="bg-slate-800 border-slate-700" />
                                        <Input value={editForm.avatar} onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })} className="bg-slate-800 border-slate-700" maxLength={2} />
                                        <Input type="number" value={editForm.rating} onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })} className="bg-slate-800 border-slate-700" min="1" max="5" />
                                        <Input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className="bg-slate-800 border-slate-700" />
                                    </div>
                                    <textarea value={editForm.text} onChange={(e) => setEditForm({ ...editForm, text: e.target.value })} className="w-full bg-slate-800 border-slate-700 rounded-md p-2 text-sm h-24" />
                                    <div className="flex space-x-2">
                                        <Button onClick={async () => { await updateTestimonial(t.id, editForm); setEditingId(null); }} className="bg-emerald-600 flex-1">Save</Button>
                                        <Button variant="ghost" onClick={() => setEditingId(null)} className="flex-1">Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center font-bold text-rose-500 uppercase">
                                                {t.avatar}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{t.name}</p>
                                                <div className="flex items-center">
                                                    {[...Array(t.rating)].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => startEdit(t)}>
                                                <Edit2 className="h-4 w-4 text-blue-400" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={async () => await deleteTestimonial(t.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 italic">&ldquo;{t.text}&rdquo;</p>
                                    <p className="text-xs text-slate-500">{t.location}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
