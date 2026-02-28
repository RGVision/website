import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, List, Home, LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/admin/login" });
                    }}>
                        <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                    <Link href="/">
                        <Card className="bg-slate-900 border-slate-800 hover:border-purple-500 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <LayoutDashboard className="h-6 w-6 text-purple-500" />
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
