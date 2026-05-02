"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const C = {
  card: "#111118",
  cardBorder: "#1a1a2e",
  surface: "#16161f",
  accent: "#8b5cf6",
  green: "#10b981",
  yellow: "#f59e0b",
  text: "#e2e8f0",
  textMid: "#94a3b8",
  textDim: "#64748b",
};

interface RevenueData {
  totalRevenue: number;
  paidUsers: number;
  revenueTimeline: { date: string; daily: number; cumulative: number; users: number }[];
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

export function RevenueDashboard({
  revenue,
  totalUsers,
  conversionRate,
}: {
  revenue: RevenueData;
  totalUsers: number;
  conversionRate: string;
}) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            background: `linear-gradient(135deg, #fff 30%, ${C.yellow})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          💰 Revenue Analytics
        </h1>
        <p style={{ color: C.textDim, margin: "4px 0 0", fontSize: 13 }}>
          Financial overview • ₹99/plan
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon="💰" label="Total Revenue" value={`₹${revenue.totalRevenue.toLocaleString("en-IN")}`} color={C.yellow} subtext="Estimated from paid users" />
        <StatCard icon="💎" label="Paid Users" value={revenue.paidUsers} color={C.green} subtext={`Out of ${totalUsers} total`} />
        <StatCard icon="📊" label="Conversion Rate" value={`${conversionRate}%`} color={C.accent} subtext="Free → Paid" />
        <StatCard icon="🧾" label="Avg Rev/User" value={`₹${totalUsers > 0 ? Math.round(revenue.totalRevenue / totalUsers) : 0}`} color="#06b6d4" subtext="Across all users (ARPU)" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Cumulative Revenue */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 24px",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: C.text }}>📈 Cumulative Revenue</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue.revenueTimeline}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.yellow} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.yellow} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis
                  dataKey="date"
                  stroke={C.textDim}
                  fontSize={10}
                  tickFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                />
                <YAxis stroke={C.textDim} fontSize={10} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{ background: C.surface, border: `1px solid ${C.cardBorder}`, borderRadius: 10, fontSize: 12, color: C.text }}
                  formatter={(v: any) => [`₹${Number(v).toLocaleString("en-IN")}`, "Revenue"]}
                  labelFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                />
                <Area type="monotone" dataKey="cumulative" stroke={C.yellow} fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Conversions */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 24px",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: C.text }}>📅 Daily Conversions</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue.revenueTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis
                  dataKey="date"
                  stroke={C.textDim}
                  fontSize={10}
                  tickFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                />
                <YAxis stroke={C.textDim} fontSize={10} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: C.surface, border: `1px solid ${C.cardBorder}`, borderRadius: 10, fontSize: 12, color: C.text }}
                  labelFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                />
                <Bar dataKey="users" fill={C.green} radius={[4, 4, 0, 0]} name="New Paid Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
