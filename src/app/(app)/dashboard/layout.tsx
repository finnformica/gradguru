"use client";

import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import { useUserMeta } from "api/user";
import { LoadingScreen } from "components/global";
import { useSession } from "context/user";
import DashboardLayout from "layouts/dashboard";
import { auth } from "lib/firebase/config";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [user, loading, error] = useAuthState(auth);
  const { user: userMeta } = useUserMeta();
  const { setUser } = useSession();

  useEffect(() => setUser(userMeta), [userMeta, setUser]);

  if (loading) return <LoadingScreen />;

  if (error) {
    enqueueSnackbar("An error occurred while signing in", {
      variant: "error",
    });
    redirect("/sign-in");
  }

  if (!user) redirect("/sign-in");

  return <DashboardLayout>{children}</DashboardLayout>;
}
