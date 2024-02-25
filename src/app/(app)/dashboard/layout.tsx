import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth/config";

import { DashboardHeader } from "@/components/LandingPage/Headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);

  if (!data) {
    redirect("/sign-in");
  }

  return (
    <>
      <DashboardHeader />
      <main>{children}</main>
    </>
  );
}
