import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

// ═══════════════════════════════════════════
// ADMIN CREDENTIALS — Hardcoded
// ═══════════════════════════════════════════
const ADMIN_ACCOUNTS: Record<string, string> = {
  "me.harshit1308@gmail.com": "admin123",
  "tripathiayush912@gmail.com": "admin123",
};

const ADMIN_JWT_SECRET = new TextEncoder().encode(
  (process.env.JWT_SECRET || "your-secret-key") + "-admin-panel"
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const normalizedEmail = email?.toLowerCase()?.trim();

    if (!normalizedEmail || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const expectedPassword = ADMIN_ACCOUNTS[normalizedEmail];

    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    // Create admin-specific JWT
    const token = await new SignJWT({
      email: normalizedEmail,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(ADMIN_JWT_SECRET);

    // Set admin cookie
    const response = NextResponse.json({ success: true, email: normalizedEmail });
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    response.headers.append(
      "Set-Cookie",
      `admin-token=${token}; HttpOnly; Path=/admin; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${secure}`
    );

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
