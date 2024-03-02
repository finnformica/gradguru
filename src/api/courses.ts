import { useMemo } from "react";
import useSWR from "swr";
import {
  endpoints,
  getFetcher,
  postFetcher,
  putFetcher,
  patchFetcher,
  deleteFetcher,
} from "@/utils/axios";

// list of courses
export function useCourses() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.courses.all,
    getFetcher
  );

  return useMemo(
    () => ({
      courses: data?.documents as any[] | undefined, // return documents field for list of courses
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

// single course
export function useCourse(id: string) {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.courses.course(id),
    getFetcher
  );

  console.log(data);

  return useMemo(
    () => ({
      course: data?.data as any | undefined, // return data field for single course
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function postCourse(id: string, data: any) {
  const URL = endpoints.admin.courses.course(id);
  return postFetcher([URL, {}, data]);
}
