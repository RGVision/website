import { getStats } from "@/lib/db";
import StatsClient from "./StatsClient";

export default async function StatsPage() {
    const stats = await getStats();
    return <StatsClient stats={stats} />;
}
