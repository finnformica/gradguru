import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth/config";

import { AlertContextProvider } from "@/context/alert";
import LatexContext from "@/context/latex";

import MiniDrawer from "@/components/AdminLayout/MiniDrawer";

export default async function AdminLayout({
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
  return (
    <LatexContext>
      <AlertContextProvider>
        <MiniDrawer>{children}</MiniDrawer>
      </AlertContextProvider>
    </LatexContext>
  );
}
