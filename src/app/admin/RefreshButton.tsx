"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { revalidateAll } from "@/lib/actions";

export default function RefreshButton() {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleRefresh = async () => {
        setLoading(true);
        try {
            await revalidateAll();
            setDone(true);
            setTimeout(() => setDone(false), 3000);
        } catch (error) {
            console.error("Refresh failed:", error);
            alert("Failed to refresh cache. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleRefresh} 
            variant="outline" 
            disabled={loading}
            className={`border-gold/30 hover:bg-gold/10 hover:text-gold transition-all duration-300 ${done ? 'border-emerald-500 text-emerald-500' : 'text-slate-300'}`}
        >
            {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : done ? (
                <CheckCircle2 className="h-4 w-4 mr-2" />
            ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {loading ? "Refreshing..." : done ? "Cache Refreshed!" : "Refresh Website Cache"}
        </Button>
    );
}
