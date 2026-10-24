import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard-client";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userName = session.user.name?.trim() || session.user.email?.split("@")[0] || "Öğrenci";
  return <Dashboard userName={userName} />;
}
