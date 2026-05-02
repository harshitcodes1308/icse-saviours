"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Refresh the page to trigger the server layout re-check
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06060a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow effects */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          margin: "0 16px",
          background: "rgba(17,17,24,0.9)",
          border: "1px solid #1a1a2e",
          borderRadius: 20,
          padding: "40px 28px",
          backdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 3,
            borderRadius: "0 0 4px 4px",
            background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
          }}
        />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 900,
              color: "#fff",
              marginBottom: 16,
              boxShadow: "0 8px 32px rgba(139,92,246,0.3)",
            }}
          >
            S
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
              background: "linear-gradient(135deg, #fff 30%, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -0.5,
            }}
          >
            Admin Panel
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: 13,
              margin: "6px 0 0",
              fontWeight: 500,
            }}
          >
            Saviours AI — Restricted Access
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#94a3b8",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #1a1a2e",
                background: "#0c0c14",
                color: "#e2e8f0",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#8b5cf640")}
              onBlur={(e) => (e.target.style.borderColor = "#1a1a2e")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#94a3b8",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid #1a1a2e",
                background: "#0c0c14",
                color: "#e2e8f0",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#8b5cf640")}
              onBlur={(e) => (e.target.style.borderColor = "#1a1a2e")}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444",
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              border: "none",
              background: hovering && !loading
                ? "linear-gradient(135deg, #7c3aed, #db2777)"
                : "linear-gradient(135deg, #8b5cf6, #ec4899)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.2s ease",
              boxShadow: hovering && !loading ? "0 8px 30px rgba(139,92,246,0.4)" : "none",
              letterSpacing: 0.3,
            }}
          >
            {loading ? "Authenticating..." : "Access Admin Panel"}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 11,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          🔒 This panel is restricted to authorized admins only
        </div>
      </div>
    </div>
  );
}
