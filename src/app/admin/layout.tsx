import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { AdminShell } from "./AdminShell";
import { AdminLogin } from "./AdminLogin";

const ADMIN_JWT_SECRET = new TextEncoder().encode(
  (process.env.JWT_SECRET || "your-secret-key") + "-admin-panel"
);

const ADMIN_EMAILS = [
  "me.harshit1308@gmail.com",
  "tripathiayush912@gmail.com",
];

async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, ADMIN_JWT_SECRET);
    const email = (payload as any).email;
    if (!email || !ADMIN_EMAILS.includes(email)) return null;
    return { email };
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <AdminLogin />;
  }

  // Derive name from email
  const name = session.email.split("@")[0].replace(/[._]/g, " ");

  return (
    <AdminShell userName={name} userEmail={session.email}>
      {children}
    </AdminShell>
  );
}
