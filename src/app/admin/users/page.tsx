import { getUsersList } from "@/lib/admin";
import { UsersTable } from "./UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const users = await getUsersList(params.search, params.filter);
  return <UsersTable users={users} initialSearch={params.search} initialFilter={params.filter} />;
}
