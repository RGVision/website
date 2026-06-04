"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Users } from "lucide-react";

export default function SubscribersClient({ initialSubscribers }: { initialSubscribers: any[] }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMsg, setResponseMsg] = useState("");

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setResponseMsg("");

        try {
            const res = await fetch("/api/subscribers/bulk-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, message })
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setResponseMsg(data.message || "Emails sent successfully!");
                setSubject("");
                setMessage("");
            } else {
                setStatus("error");
                setResponseMsg(data.error || "Failed to send emails.");
            }
        } catch (error) {
            setStatus("error");
            setResponseMsg("Server connection failed.");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-emerald-500" />
                        Subscribers List ({initialSubscribers.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {initialSubscribers.length === 0 ? (
                            <p className="text-slate-400">No subscribers found.</p>
                        ) : (
                            initialSubscribers.map(sub => (
                                <div key={sub.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-800 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-200">{sub.name}</p>
                                        <p className="text-sm text-slate-400">{sub.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500">{sub.mobile}</p>
                                        <p className="text-xs text-slate-500">{new Date(sub.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                        Send Bulk Update
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSendEmail} className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-slate-400 mb-2 block">Email Subject</label>
                            <Input 
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Exclusive Offer Inside..."
                                className="bg-slate-950 border-slate-800 text-slate-200 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-400 mb-2 block">Message content (HTML / Text)</label>
                            <textarea 
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={8}
                                placeholder="Write your newsletter or update here..."
                                className="w-full rounded-md bg-slate-950 border border-slate-800 text-slate-200 focus:ring-2 focus:ring-blue-500 p-3 text-sm focus:outline-none"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={status === "loading" || initialSubscribers.length === 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {status === "loading" ? "Sending..." : "Send to All Subscribers"}
                        </Button>

                        {responseMsg && (
                            <p className={`text-sm mt-4 p-3 rounded-lg ${status === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                                {responseMsg}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
