"use client";

import { redirect } from "next/navigation";
import { useSnackbar } from "notistack";

import { LoadingScreen } from "components/global";
import DashboardLayout from "layouts/dashboard";
import { auth, db } from "lib/firebase/config";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSession } from "context/user";
import { doc, onSnapshot } from "firebase/firestore";
import { IUser } from "types/user";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [user, loading, error] = useAuthState(auth);
  const { setUser } = useSession();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, "user-meta", user?.uid), (doc) => {
      setUser(doc.data() as IUser);
    });

    return () => unsubscribe();
  }, [user, setUser]);

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
