"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ArrowLeft, Edit2, X, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createExperience, deleteExperience, updateExperience } from "@/lib/actions";

export default function ExperiencesManager({ experiences: initialExperiences }: { experiences: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    const startEdit = (exp: any) => {
        setEditingId(exp.id);
        setEditForm({ ...exp });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm(null);
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
                    <h1 className="text-3xl font-bold">Manage Experiences</h1>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle>Add New Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            const data = {
                                title: formData.get("title") as string,
                                subtitle: formData.get("subtitle") as string,
                                image: formData.get("image") as string,
                                icon: formData.get("icon") as string,
                            };
                            await createExperience(data);
                        }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input name="title" placeholder="Title" className="bg-slate-800 border-slate-700" required />
                            <Input name="subtitle" placeholder="Subtitle" className="bg-slate-800 border-slate-700" required />
                            <Input name="image" placeholder="Image URL" className="bg-slate-800 border-slate-700" required />
                            <Input name="icon" placeholder="Icon ID" className="bg-slate-800 border-slate-700" required />
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Plus className="h-4 w-4 mr-2" /> Add Experience
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {initialExperiences.map((exp) => (
                        <div key={exp.id} className="flex flex-col bg-slate-900 border border-slate-800 rounded-lg overflow-hidden relative">
                            {editingId === exp.id ? (
                                <div className="p-4 space-y-3 bg-slate-800">
                                    <Input
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="bg-slate-900 border-slate-700"
                                    />
                                    <Input
                                        value={editForm.subtitle}
                                        onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                                        className="bg-slate-900 border-slate-700"
                                    />
                                    <Input
                                        value={editForm.image}
                                        onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                        className="bg-slate-900 border-slate-700"
                                    />
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={async () => {
                                                await updateExperience(exp.id, editForm);
                                                setEditingId(null);
                                            }}
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                        >
                                            <Check className="h-4 w-4 mr-2" /> Save
                                        </Button>
                                        <Button variant="ghost" onClick={cancelEdit} className="flex-1">
                                            <X className="h-4 w-4 mr-2" /> Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <img src={exp.image} alt={exp.title} className="h-32 w-full object-cover opacity-50" />
                                    <div className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{exp.title}</p>
                                            <p className="text-sm text-slate-400">{exp.subtitle}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => startEdit(exp)}>
                                                <Edit2 className="h-4 w-4 text-blue-400" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={async () => await deleteExperience(exp.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
