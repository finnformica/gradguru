import { useMemo } from "react";
import useSWR from "swr";
import {
  endpoints,
  getFetcher,
  postFetcher,
  putFetcher,
  patchFetcher,
  deleteFetcher,
} from "utils/axios";

export function useSJTTests() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.tests.sjt.all,
    getFetcher
  );

  return useMemo(
    () => ({
      questions: data?.documents as any[] | undefined,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function postSJTTest(id: string | null, data: any) {
  const URL = endpoints.admin.tests.sjt.test(id);
  return postFetcher([URL, {}, data]);
}

export function deleteSJTTest(id: string) {
  const URL = endpoints.admin.tests.sjt.test(id);
  return deleteFetcher(URL);
}

export function useNRTests() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.tests.nr.all,
    getFetcher
  );

  return useMemo(
    () => ({
      questions: data?.documents as any[] | undefined,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function postNRTest(id: string | null, data: any) {
  const URL = endpoints.admin.tests.nr.test(id);
  return postFetcher([URL, {}, data]);
}

export function deleteNRTest(id: string) {
  const URL = endpoints.admin.tests.nr.test(id);
  return deleteFetcher(URL);
}
