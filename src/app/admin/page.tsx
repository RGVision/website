import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, List, Home, LogOut } from "lucide-react";
import { signOut } from "@/auth";
import RefreshButton from "./RefreshButton";

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8 pt-24">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <div>
                        <h1 className="text-3xl font-bold font-display tracking-tight">Admin <span className="text-gold">Dashboard</span></h1>
                        <p className="text-sm text-slate-500 mt-1">Logged in as {session?.user?.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RefreshButton />
                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/admin/login" });
                        }}>
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-400">
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/categories">
                        <Card className="bg-slate-900 border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <List className="h-6 w-6 text-blue-500" />
                                </div>
                                <CardTitle>Manage Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">Add, edit or delete villa categories</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/villas">
                        <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Home className="h-6 w-6 text-emerald-500" />
                                </div>
                                <CardTitle>Manage Villas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">Add, edit or delete villa listings</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/stats">
                        <Card className="bg-slate-900 border-slate-800 hover:border-amber-500 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <LayoutDashboard className="h-6 w-6 text-amber-500" />
                                </div>
                                <CardTitle>Manage Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">Update property and guest statistics</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/testimonials">
                        <Card className="bg-slate-900 border-slate-800 hover:border-rose-500 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-rose-500/10 rounded-lg">
                                    <LayoutDashboard className="h-6 w-6 text-rose-500" />
                                </div>
                                <CardTitle>Testimonials</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">Manage guest reviews and feedback</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/experiences">
                        <Card className="bg-slate-900 border-slate-800 hover:border-indigo-500 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <LayoutDashboard className="h-6 w-6 text-indigo-500" />
                                </div>
                                <CardTitle>Experiences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">Manage luxury experience offerings</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/">
                        <Card className="bg-slate-950 border-slate-800 hover:border-slate-500 transition-colors cursor-pointer border-dashed">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-slate-500/10 rounded-lg">
                                    <LayoutDashboard className="h-6 w-6 text-slate-500" />
                                </div>
                                <CardTitle>View Website</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">Go to public homepage</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
