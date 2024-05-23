import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR from "swr";

import { auth, db } from "lib/firebase/config";
import { IUser } from "types/user";

export async function getUsers() {
  const docRef = collection(db, "user-meta");
  return getDocs(docRef).then((res) =>
    res.docs.map((doc) => doc.data() as IUser)
  );
}

export function useUsers() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    "users",
    getUsers
  );

  return useMemo(
    () => ({
      users: data as IUser[] | undefined,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function updateUser(id: string, data: any) {
  const docRef = doc(db, "user-meta", id);
  return setDoc(docRef, data);
}

export async function getUserMeta(id: string) {
  const docRef = doc(db, "user-meta", id);
  return getDoc(docRef).then((doc) => doc.data() as IUser);
}

export function useUserMeta() {
  const [user] = useAuthState(auth);

  const id = user?.uid || "";

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    id,
    getUserMeta
  );

  return useMemo(
    () => ({
      user: data as IUser,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}
