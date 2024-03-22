import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "auth/config";

import DashboardLayout from "layouts/dashboard";

export default async function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);

  if (!data) {
    redirect("/sign-in");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
