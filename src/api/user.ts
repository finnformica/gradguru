import { deleteFetcher, endpoints, getFetcher, postFetcher } from "utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

import { db } from "lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

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

export function userUserMeta(id: string) {
  const docRef = doc(db, "user-meta", id);
  return getDoc(docRef).then((doc) => doc.data());
}
