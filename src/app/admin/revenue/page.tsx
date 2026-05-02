import { getRevenueData, getOverviewStats } from "@/lib/admin";
import { RevenueDashboard } from "./RevenueDashboard";

export const dynamic = "force-dynamic";

export default async function AdminRevenuePage() {
  const [revenue, overview] = await Promise.all([getRevenueData(), getOverviewStats()]);
  return (
    <RevenueDashboard
      revenue={revenue}
      totalUsers={overview.totalUsers}
      conversionRate={overview.conversionRate}
    />
  );
}
