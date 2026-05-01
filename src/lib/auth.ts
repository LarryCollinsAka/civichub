import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const role = cookieStore.get("civihub_role")?.value;
  const user = cookieStore.get("civihub_user")?.value;

  if (!user || !role) return null;

  return { user, role };
}