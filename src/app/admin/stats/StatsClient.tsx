"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createStat, deleteStat, updateStat } from "@/lib/actions";
import { Plus, Trash2, ArrowLeft, Hash, Edit2, X, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsClient({ stats: initialStats }: { stats: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    const startEdit = (stat: any) => {
        setEditingId(stat.id);
        setEditForm({ ...stat });
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
                    <h1 className="text-3xl font-bold">Manage Statistics</h1>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle>Add New Stat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            const data = {
                                number: parseInt(formData.get("number") as string),
                                suffix: formData.get("suffix") as string,
                                label: formData.get("label") as string,
                            };
                            await createStat(data);
                        }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input name="number" type="number" placeholder="Number" className="bg-slate-800 border-slate-700" required />
                            <Input name="suffix" placeholder="Suffix" className="bg-slate-800 border-slate-700" />
                            <Input name="label" placeholder="Label" className="bg-slate-800 border-slate-700" required />
                            <div className="md:col-span-3">
                                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                                    <Plus className="h-4 w-4 mr-2" /> Add Stat
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initialStats.map((s) => (
                        <div key={s.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                            {editingId === s.id ? (
                                <div className="space-y-3">
                                    <Input
                                        type="number"
                                        value={editForm.number}
                                        onChange={(e) => setEditForm({ ...editForm, number: parseInt(e.target.value) })}
                                        className="bg-slate-800 border-slate-700"
                                    />
                                    <Input
                                        value={editForm.suffix}
                                        onChange={(e) => setEditForm({ ...editForm, suffix: e.target.value })}
                                        className="bg-slate-800 border-slate-700"
                                    />
                                    <Input
                                        value={editForm.label}
                                        onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                                        className="bg-slate-800 border-slate-700"
                                    />
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={async () => {
                                                await updateStat(s.id, editForm);
                                                setEditingId(null);
                                            }}
                                            className="flex-1 bg-emerald-600"
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" onClick={() => setEditingId(null)} className="flex-1">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                            <Hash className="h-5 w-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold">{s.number}{s.suffix}</p>
                                            <p className="text-sm text-slate-400">{s.label}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Button variant="ghost" size="icon" onClick={() => startEdit(s)} className="h-7 w-7">
                                            <Edit2 className="h-3 w-3 text-blue-400" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={async () => await deleteStat(s.id)} className="h-7 w-7">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
