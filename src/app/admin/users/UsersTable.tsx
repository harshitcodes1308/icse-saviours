"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const C = {
  card: "#111118",
  cardBorder: "#1a1a2e",
  surface: "#16161f",
  accent: "#8b5cf6",
  green: "#10b981",
  red: "#ef4444",
  yellow: "#f59e0b",
  blue: "#3b82f6",
  text: "#e2e8f0",
  textMid: "#94a3b8",
  textDim: "#64748b",
};

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  isPaid: boolean;
  authProvider: string;
  createdAt: Date;
  flipBestStreak: number;
  _count: {
    testAttempts: number;
    aiUsageLogs: number;
    focusSessions: number;
    notes: number;
  };
}

export function UsersTable({
  users,
  initialSearch,
  initialFilter,
}: {
  users: UserRow[];
  initialSearch?: string;
  initialFilter?: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch || "");
  const [filter, setFilter] = useState(initialFilter || "all");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filter && filter !== "all") params.set("filter", filter);
    router.push(`/admin/users?${params.toString()}`);
  };

  const handleFilterChange = (f: string) => {
    setFilter(f);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (f !== "all") params.set("filter", f);
    router.push(`/admin/users?${params.toString()}`);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Plan", "Auth", "Joined", "Tests", "AI Calls", "Focus", "Notes", "Flip Streak"];
    const rows = users.map((u) => [
      u.name,
      u.email,
      u.phone || "",
      u.isPaid ? "Paid" : "Free",
      u.authProvider,
      new Date(u.createdAt).toLocaleDateString("en-IN"),
      u._count.testAttempts,
      u._count.aiUsageLogs,
      u._count.focusSessions,
      u._count.notes,
      u.flipBestStreak,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `saviours-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1
            className="admin-page-title"
            style={{
              fontSize: 26,
              fontWeight: 800,
              background: `linear-gradient(135deg, #fff 30%, ${C.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            👥 User Directory
          </h1>
          <p style={{ color: C.textDim, margin: "4px 0 0", fontSize: 13 }}>
            {users.length} users found
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          style={{
            background: `linear-gradient(135deg, ${C.green}, #059669)`,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          📥 Export CSV
        </button>
      </div>

      {/* Search & Filter */}
      <div
        style={{
          marginBottom: 20,
          background: C.card,
          border: `1px solid ${C.cardBorder}`,
          borderRadius: 12,
          padding: "12px 16px",
        }}
      >
        <div className="admin-filter-bar">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{
              background: C.surface,
              border: `1px solid ${C.cardBorder}`,
              borderRadius: 8,
              padding: "8px 14px",
              color: C.text,
              fontSize: 13,
              outline: "none",
            }}
          />
          <div className="admin-filter-buttons" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(["all", "paid", "free", "phone"] as const).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: filter === f ? `1px solid ${C.accent}50` : `1px solid ${C.cardBorder}`,
                  background: filter === f ? `${C.accent}18` : "transparent",
                  color: filter === f ? C.accent : C.textMid,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                }}
              >
                {f === "phone" ? "📱 Phone" : f}
              </button>
            ))}
          </div>
          <button
            onClick={handleSearch}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              background: C.accent,
              border: "none",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.cardBorder}`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div className="admin-table-wrap">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ background: C.surface }}>
                {["Name", "Email", "Phone", "Plan", "Auth", "Joined", "Tests", "AI", "Focus", "Flip"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 14px",
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: `1px solid ${C.cardBorder}`,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>{user.name}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMid, whiteSpace: "nowrap" }}>{user.email}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: user.phone ? C.text : C.textDim, whiteSpace: "nowrap" }}>
                    {user.phone || "—"}
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        background: user.isPaid ? `${C.green}18` : `${C.textDim}15`,
                        color: user.isPaid ? C.green : C.textDim,
                        border: `1px solid ${user.isPaid ? C.green : C.textDim}30`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.isPaid ? "PAID" : "FREE"}
                    </span>
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 11, color: C.textMid, textTransform: "capitalize", whiteSpace: "nowrap" }}>
                    {user.authProvider}
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: C.textMid, whiteSpace: "nowrap" }}>
                    {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: C.blue, textAlign: "center" }}>
                    {user._count.testAttempts}
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: C.yellow, textAlign: "center" }}>
                    {user._count.aiUsageLogs}
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: C.green, textAlign: "center" }}>
                    {user._count.focusSessions}
                  </td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: C.accent, textAlign: "center" }}>
                    {user.flipBestStreak}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={10} style={{ padding: 40, textAlign: "center", color: C.textDim, fontSize: 14 }}>
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
