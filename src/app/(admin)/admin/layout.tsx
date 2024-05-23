"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { useSession } from "context/user";
import AdminLayout from "layouts/admin";
import { auth, db } from "lib/firebase/config";
import { IUser } from "types/user";
import { LoadingScreen } from "components/global";

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useAuthState(auth);
  const { setUser, user: session } = useSession();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, "user-meta", user?.uid), (doc) => {
      setUser(doc.data() as IUser);
    });

    return () => unsubscribe();
  }, [user, setUser]);

  if (!session) return <LoadingScreen />;

  // if user is not authenticated,
  // or does not have update, delete, or create permissions

  const notAdmin = (session.role || 0) < 2 || session.role === undefined;
  if (notAdmin) {
    notFound();
  }

  return <AdminLayout>{children}</AdminLayout>;
}
