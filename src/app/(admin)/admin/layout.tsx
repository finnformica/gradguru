"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { useUserMeta } from "api/user";
import { useSession } from "context/user";
import AdminLayout from "layouts/admin";

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserMeta();
  const { setUser } = useSession();

  useEffect(() => setUser(user), [user, setUser]);

  // if user is not authenticated,
  // or does not have update, delete, or create permissions
  const notAdmin = user?.role < 2 || user?.role === undefined;
  if (notAdmin) {
    notFound(); // TODO: nice not found page
  }

  return <AdminLayout>{children}</AdminLayout>;
}
