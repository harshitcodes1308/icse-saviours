"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import "./admin.css";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/revenue", label: "Revenue", icon: "💰" },
  { href: "/admin/features", label: "Features", icon: "⚡" },
];

const C = {
  bg: "#06060a",
  sidebar: "#0c0c14",
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
  text: "#e2e8f0",
  textMid: "#94a3b8",
  textDim: "#64748b",
};

export function AdminShell({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: C.text }}>
      {/* Mobile hamburger */}
      <button
        className="admin-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Mobile overlay */}
      <div
        className={`admin-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${C.accent}, ${C.pink})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              S
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  letterSpacing: -0.3,
                  background: `linear-gradient(135deg, #fff, ${C.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Saviours Admin
              </div>
              <div style={{ fontSize: 10, color: C.textDim, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
                Control Panel
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const isHovered = hoveredItem === item.href;
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "11px 14px",
                  marginBottom: 4,
                  borderRadius: 10,
                  border: isActive ? `1px solid ${C.accent}30` : "1px solid transparent",
                  background: isActive
                    ? `${C.accent}12`
                    : isHovered
                    ? "rgba(255,255,255,0.03)"
                    : "transparent",
                  color: isActive ? C.accent : isHovered ? C.text : C.textMid,
                  cursor: "pointer",
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      right: 12,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: C.accent,
                      boxShadow: `0 0 8px ${C.accentGlow}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Info */}
        <div style={{ padding: "16px 16px 20px", borderTop: `1px solid ${C.cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${C.accent}, ${C.blue})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 800,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {userName?.[0]?.toUpperCase() || "A"}
            </div>
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {userName}
              </div>
              <div style={{ fontSize: 10, color: C.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {userEmail}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              marginTop: 12,
              width: "100%",
              padding: "8px",
              borderRadius: 8,
              border: `1px solid ${C.cardBorder}`,
              background: "transparent",
              color: C.textDim,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
