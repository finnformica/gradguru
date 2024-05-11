import { doc, getDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR from "swr";
import { deleteFetcher, endpoints, getFetcher, postFetcher } from "utils/axios";

import { auth, db } from "lib/firebase/config";
import { IUser } from "types/user";

export function useUsers() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.users.all,
    getFetcher
  );

  return useMemo(
    () => ({
      users: data?.documents as any[] | undefined,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function postUser(id: string, data: any) {
  const URL = endpoints.users.user(id);
  return postFetcher([URL, {}, data]);
}

export function deleteUser(id: string) {
  const URL = endpoints.users.user(id);
  return deleteFetcher(URL);
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
