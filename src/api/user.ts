import {
  deleteFetcher,
  endpoints,
  getFetcher,
  postFetcher,
} from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useUsers() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.users.all,
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
  const URL = endpoints.admin.users.user(id);
  return postFetcher([URL, {}, data]);
}

export function deleteUser(id: string) {
  const URL = endpoints.admin.users.user(id);
  return deleteFetcher(URL);
}
