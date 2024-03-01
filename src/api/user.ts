// import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import {
  // deleteFetcher,
  endpoints,
  getFetcher,
  postFetcher,
  // putFetcher,
  // patchFetcher,
} from "@/utils/axios";

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