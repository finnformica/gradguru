"use client";

import { useAuthState } from "react-firebase-hooks/auth";

import DashboardLayout from "layouts/dashboard";
import { auth } from "lib/firebase/config";
import { LoadingScreen } from "components/global";
import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  if (loading) return <LoadingScreen />;

  if (error) {
    enqueueSnackbar("An error occurred while signing in", {
      variant: "error",
    });
    redirect("/sign-in");
  }

  if (!user && !loading) redirect("/sign-in");

  return <DashboardLayout>{children}</DashboardLayout>;
}
