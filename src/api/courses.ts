import { useMemo } from "react";
import useSWR from "swr";
import { endpoints, getFetcher, postFetcher } from "@/utils/axios";
import axios from "axios";

// list of course ids
export async function getCourses() {
  const URL = endpoints.admin.courses.all;
  return axios.get(URL).then((res) => {
    return res.data.documents.map((course: any) => course.id);
  });
}

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
