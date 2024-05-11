"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";

import { useUserMeta } from "api/user";
import { useSession } from "context/user";
import AdminLayout from "layouts/admin";
import { LoadingScreen } from "components/global";

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserMeta();
  const { setUser } = useSession();

  useEffect(() => setUser(user), [user, setUser]);

  if (!user) return <LoadingScreen />;

  // if user is not authenticated,
  // or does not have update, delete, or create permissions
  const notAdmin = user.role < 2 || user.role === undefined;
  if (notAdmin) {
    notFound(); // TODO: nice not found page
  }
  return <AdminLayout>{children}</AdminLayout>;
}
