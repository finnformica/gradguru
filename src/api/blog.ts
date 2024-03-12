import { endpoints, getFetcher, postFetcher } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

// list of blogs
export function useBlogs() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.blogs.all,
    getFetcher
  );

  return useMemo(
    () => ({
      blogs: data?.documents as any[] | undefined, // return documents field for list of blogs
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function postBlog(id: string | null, data: any) {
  const URL = endpoints.admin.blogs.blog(id);
  console.log(URL);
  return postFetcher([URL, {}, data]);
}
