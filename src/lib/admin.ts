import { prisma } from "@/lib/prisma";

// ═══════════════════════════════════════════
// ADMIN DATA FETCHERS (auth handled by layout)
// ═══════════════════════════════════════════

export async function getOverviewStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(todayStart);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(todayStart);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const [
    totalUsers,
    paidUsers,
    usersToday,
    usersWeek,
    usersMonth,
    activeSessions,
    authProviders,
    signupTrend,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isPaid: true } }),
    prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.session.count({ where: { expiresAt: { gt: now } } }),
    prisma.user.groupBy({ by: ["authProvider"], _count: { id: true } }),
    prisma.$queryRaw<{ date: Date; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*)::bigint as count
      FROM users
      WHERE "createdAt" >= ${monthAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
  ]);

  const freeUsers = totalUsers - paidUsers;
  const conversionRate = totalUsers > 0 ? ((paidUsers / totalUsers) * 100).toFixed(1) : "0";
  const estimatedRevenue = paidUsers * 99;

  return {
    totalUsers,
    paidUsers,
    freeUsers,
    conversionRate,
    estimatedRevenue,
    usersToday,
    usersWeek,
    usersMonth,
    activeSessions,
    authProviders: authProviders.map((a) => ({
      provider: a.authProvider || "credentials",
      count: a._count.id,
    })),
    signupTrend: signupTrend.map((s) => ({
      date: new Date(s.date).toISOString().slice(0, 10),
      count: Number(s.count),
    })),
  };
}

export async function getUsersList(search?: string, filter?: string) {
  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }
  if (filter === "paid") where.isPaid = true;
  if (filter === "free") where.isPaid = false;
  if (filter === "phone") where.phone = { not: null };

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isPaid: true,
      authProvider: true,
      createdAt: true,
      flipBestStreak: true,
      _count: {
        select: {
          testAttempts: true,
          aiUsageLogs: true,
          focusSessions: true,
          notes: true,
        },
      },
    },
  });

  return users;
}

export async function getRevenueData() {
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [paidUsers, paidTimeline] = await Promise.all([
    prisma.user.count({ where: { isPaid: true } }),
    prisma.$queryRaw<{ date: Date; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*)::bigint as count
      FROM users
      WHERE "isPaid" = true AND "createdAt" >= ${sixMonthsAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
  ]);

  const totalRevenue = paidUsers * 99;

  // Cumulative revenue over time
  let cumulative = 0;
  const revenueTimeline = paidTimeline.map((p) => {
    cumulative += Number(p.count) * 99;
    return {
      date: new Date(p.date).toISOString().slice(0, 10),
      daily: Number(p.count) * 99,
      cumulative,
      users: Number(p.count),
    };
  });

  return { totalRevenue, paidUsers, revenueTimeline };
}

export async function getFeatureUsageData() {
  const [
    aiUsageByFeature,
    totalTestAttempts,
    totalFocusSessions,
    totalFocusMinutes,
    totalNotes,
    totalDoubts,
    avgFlipStreak,
    aiUsageTrend,
  ] = await Promise.all([
    prisma.aiUsageLog.groupBy({
      by: ["feature"],
      _count: { id: true },
      _sum: { tokens: true },
    }),
    prisma.testAttempt.count(),
    prisma.focusSession.count(),
    prisma.focusSession.aggregate({ _sum: { actualDuration: true } }),
    prisma.note.count(),
    prisma.doubtConversation.count(),
    prisma.user.aggregate({ _avg: { flipBestStreak: true } }),
    prisma.$queryRaw<{ date: Date; count: bigint; tokens: bigint }[]>`
      SELECT DATE("timestamp") as date, COUNT(*)::bigint as count, COALESCE(SUM("tokens"), 0)::bigint as tokens
      FROM ai_usage_logs
      WHERE "timestamp" >= NOW() - INTERVAL '30 days'
      GROUP BY DATE("timestamp")
      ORDER BY date ASC
    `,
  ]);

  return {
    aiUsageByFeature: aiUsageByFeature.map((a) => ({
      feature: a.feature,
      count: a._count.id,
      tokens: a._sum.tokens || 0,
    })),
    totalTestAttempts,
    totalFocusSessions,
    totalFocusHours: Math.round((totalFocusMinutes._sum.actualDuration || 0) / 60),
    totalNotes,
    totalDoubts,
    avgFlipStreak: Math.round((avgFlipStreak._avg.flipBestStreak || 0) * 10) / 10,
    aiUsageTrend: aiUsageTrend.map((a) => ({
      date: new Date(a.date).toISOString().slice(0, 10),
      calls: Number(a.count),
      tokens: Number(a.tokens),
    })),
  };
}
