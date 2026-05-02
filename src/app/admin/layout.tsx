import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return <AdminShell userName={user.name} userEmail={user.email}>{children}</AdminShell>;
}
