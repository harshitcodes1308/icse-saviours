import { getOverviewStats } from "@/lib/admin";
import { OverviewDashboard } from "./OverviewDashboard";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const stats = await getOverviewStats();
  return <OverviewDashboard stats={stats} />;
}
