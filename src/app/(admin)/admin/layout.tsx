import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "auth/config";
import AdminLayout from "layouts/admin";

export default async function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);

  // if user is not authenticated,
  // or does not have update, delete, or create permissions
  const notAdmin = !data || data.user.role < 2 || data.user.role === undefined;
  if (notAdmin) {
    notFound(); // TODO: nice not found page
  }
  return <AdminLayout>{children}</AdminLayout>;
}
