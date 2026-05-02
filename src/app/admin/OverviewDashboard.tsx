"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const C = {
  card: "#111118",
  cardBorder: "#1a1a2e",
  surface: "#16161f",
  accent: "#8b5cf6",
  accentGlow: "rgba(139,92,246,0.2)",
  green: "#10b981",
  red: "#ef4444",
  yellow: "#f59e0b",
  blue: "#3b82f6",
  pink: "#ec4899",
  cyan: "#06b6d4",
  text: "#e2e8f0",
  textMid: "#94a3b8",
  textDim: "#64748b",
};

const PIE_COLORS = [C.accent, C.blue, C.green, C.yellow, C.pink];

interface OverviewStats {
  totalUsers: number;
  paidUsers: number;
  freeUsers: number;
  conversionRate: string;
  estimatedRevenue: number;
  usersToday: number;
  usersWeek: number;
  usersMonth: number;
  activeSessions: number;
  authProviders: { provider: string; count: number }[];
  signupTrend: { date: string; count: number }[];
}

function StatCard({
  label,
  value,
  subtext,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  subtext?: string;
  color: string;
  icon: string;
}) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.cardBorder}`,
        borderRadius: 16,
        padding: "22px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}15, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.textMid, textTransform: "uppercase", letterSpacing: 0.8 }}>
          {label}
        </span>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: -1, lineHeight: 1 }}>{value}</div>
      {subtext && <div style={{ fontSize: 12, color: C.textDim, marginTop: 8, fontWeight: 500 }}>{subtext}</div>}
    </div>
  );
}

export function OverviewDashboard({ stats }: { stats: OverviewStats }) {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            background: `linear-gradient(135deg, #fff 30%, ${C.accent})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          Dashboard Overview
        </h1>
        <p style={{ color: C.textDim, margin: "4px 0 0", fontSize: 13 }}>
          Live analytics for Saviours AI
        </p>
      </div>

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard icon="👥" label="Total Users" value={stats.totalUsers} color={C.accent} subtext={`+${stats.usersToday} today`} />
        <StatCard icon="💎" label="Paid Users" value={stats.paidUsers} color={C.green} subtext={`${stats.conversionRate}% conversion`} />
        <StatCard icon="💰" label="Revenue" value={`₹${stats.estimatedRevenue.toLocaleString("en-IN")}`} color={C.yellow} subtext="@ ₹99/user" />
        <StatCard icon="🟢" label="Active Now" value={stats.activeSessions} color={C.cyan} subtext="Live sessions" />
      </div>

      {/* Secondary Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard icon="📅" label="Today" value={stats.usersToday} color={C.blue} subtext="New signups" />
        <StatCard icon="📈" label="This Week" value={stats.usersWeek} color={C.accent} subtext="New signups" />
        <StatCard icon="📊" label="This Month" value={stats.usersMonth} color={C.pink} subtext="New signups" />
        <StatCard icon="🆓" label="Free Users" value={stats.freeUsers} color={C.textMid} subtext={`${(100 - parseFloat(stats.conversionRate)).toFixed(1)}% of total`} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Signup Trend */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 24px",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: C.text }}>
            📈 User Growth (30 Days)
          </h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.signupTrend}>
                <defs>
                  <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis
                  dataKey="date"
                  stroke={C.textDim}
                  fontSize={10}
                  tickFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                />
                <YAxis stroke={C.textDim} fontSize={10} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: C.surface,
                    border: `1px solid ${C.cardBorder}`,
                    borderRadius: 10,
                    fontSize: 12,
                    color: C.text,
                  }}
                  labelFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                />
                <Area type="monotone" dataKey="count" stroke={C.accent} fill="url(#signupGrad)" strokeWidth={2} name="Signups" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Auth Provider Pie */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 24px",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: C.text }}>
            🔑 Auth Providers
          </h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.authProviders}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="count"
                  nameKey="provider"
                  strokeWidth={0}
                >
                  {stats.authProviders.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: C.surface,
                    border: `1px solid ${C.cardBorder}`,
                    borderRadius: 10,
                    fontSize: 12,
                    color: C.text,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {stats.authProviders.map((p, i) => (
              <div key={p.provider} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span style={{ fontSize: 12, color: C.textMid, flex: 1, textTransform: "capitalize" }}>
                  {p.provider}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{p.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
