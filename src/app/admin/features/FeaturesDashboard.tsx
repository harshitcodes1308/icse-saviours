"use client";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const C = {
  card: "#111118",
  cardBorder: "#1a1a2e",
  surface: "#16161f",
  accent: "#8b5cf6",
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

const FEATURE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  DOUBT_SOLVING: { label: "AI Assistant", icon: "🤖", color: C.yellow },
  FLIP_THE_QUESTION: { label: "Flip the Question", icon: "🔁", color: C.accent },
  STUDY_PLANNER: { label: "Study Planner", icon: "📅", color: C.green },
  CONTENT_SUMMARY: { label: "Content Summary", icon: "📝", color: C.blue },
  NOTE_SIMPLIFICATION: { label: "Note Simplifier", icon: "✨", color: C.pink },
  FLASHCARD_GENERATION: { label: "Flashcards", icon: "🃏", color: C.cyan },
  REVISION_SHEET: { label: "Revision Sheets", icon: "📄", color: "#f97316" },
  PERFORMANCE_ANALYSIS: { label: "Performance AI", icon: "📊", color: C.red },
  PLAN_ADJUSTMENT: { label: "Plan Adjustment", icon: "🔄", color: C.textMid },
};

interface FeatureData {
  aiUsageByFeature: { feature: string; count: number; tokens: number }[];
  totalTestAttempts: number;
  totalFocusSessions: number;
  totalFocusHours: number;
  totalNotes: number;
  totalDoubts: number;
  avgFlipStreak: number;
  aiUsageTrend: { date: string; calls: number; tokens: number }[];
}

export function FeaturesDashboard({ data }: { data: FeatureData }) {
  const sortedFeatures = [...data.aiUsageByFeature].sort((a, b) => b.count - a.count);
  const chartData = sortedFeatures.map((f) => ({
    name: FEATURE_LABELS[f.feature]?.label || f.feature,
    calls: f.count,
    tokens: f.tokens,
    fill: FEATURE_LABELS[f.feature]?.color || C.textMid,
  }));

  const totalAICalls = data.aiUsageByFeature.reduce((s, f) => s + f.count, 0);
  const totalTokens = data.aiUsageByFeature.reduce((s, f) => s + f.tokens, 0);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1
          className="admin-page-title"
          style={{
            fontSize: 26,
            fontWeight: 800,
            background: `linear-gradient(135deg, #fff 30%, ${C.blue})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          ⚡ Feature Usage
        </h1>
        <p style={{ color: C.textDim, margin: "4px 0 0", fontSize: 13 }}>
          How students engage with each feature
        </p>
      </div>

      {/* Platform Stats */}
      <div className="admin-kpi-grid-6">
        {[
          { label: "AI Calls", value: totalAICalls.toLocaleString(), icon: "🧠", color: C.accent },
          { label: "Tokens Used", value: `${Math.round(totalTokens / 1000)}K`, icon: "🔤", color: C.yellow },
          { label: "Tests Taken", value: data.totalTestAttempts, icon: "📝", color: C.blue },
          { label: "Focus Hours", value: data.totalFocusHours, icon: "🧘", color: C.green },
          { label: "Notes Created", value: data.totalNotes, icon: "📖", color: C.pink },
          { label: "Doubts Asked", value: data.totalDoubts, icon: "❓", color: C.cyan },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: C.card,
              border: `1px solid ${C.cardBorder}`,
              borderRadius: 14,
              padding: "16px 16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${s.color}12, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <div className="admin-stat-label" style={{ fontSize: 10, color: C.textMid, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {s.icon} {s.label}
            </div>
            <div className="admin-stat-value" style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: -0.5 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="admin-charts-row-half" style={{ marginBottom: 24 }}>
        {/* Feature Rankings */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 20px",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: C.text }}>🏆 AI Feature Rankings</h3>
          <div style={{ height: 300, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" horizontal={false} />
                <XAxis type="number" stroke={C.textDim} fontSize={10} />
                <YAxis dataKey="name" type="category" stroke={C.textDim} fontSize={10} width={100} />
                <Tooltip
                  contentStyle={{ background: C.surface, border: `1px solid ${C.cardBorder}`, borderRadius: 10, fontSize: 12, color: C.text }}
                />
                <Bar dataKey="calls" name="API Calls" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Usage Trend */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 16,
            padding: "20px 20px",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: C.text }}>📈 AI Usage (30 Days)</h3>
          <div style={{ height: 300, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.aiUsageTrend}>
                <defs>
                  <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blue} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
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
                  contentStyle={{ background: C.surface, border: `1px solid ${C.cardBorder}`, borderRadius: 10, fontSize: 12, color: C.text }}
                  labelFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                />
                <Area type="monotone" dataKey="calls" stroke={C.blue} fill="url(#aiGrad)" strokeWidth={2} name="AI Calls" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Feature Table */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.cardBorder}`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.cardBorder}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: C.text }}>📋 Detailed Breakdown</h3>
        </div>
        <div className="admin-table-wrap">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
            <thead>
              <tr style={{ background: C.surface }}>
                {["Feature", "API Calls", "Tokens Used", "% of Total"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.accent,
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                      borderBottom: `1px solid ${C.cardBorder}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedFeatures.map((f) => {
                const info = FEATURE_LABELS[f.feature] || { label: f.feature, icon: "🔹", color: C.textMid };
                const pct = totalAICalls > 0 ? ((f.count / totalAICalls) * 100).toFixed(1) : "0";
                return (
                  <tr key={f.feature} style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>
                      <span style={{ marginRight: 8 }}>{info.icon}</span>
                      {info.label}
                    </td>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700, color: info.color }}>
                      {f.count.toLocaleString()}
                    </td>
                    <td style={{ padding: "11px 16px", fontSize: 13, color: C.textMid }}>
                      {f.tokens.toLocaleString()}
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 60,
                            height: 6,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.06)",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              borderRadius: 3,
                              background: info.color,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 12, color: C.textMid, fontWeight: 600 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
