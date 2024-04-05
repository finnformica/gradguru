import { fileStorage } from "lib/firebase/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { endpoints, getFetcher, postFetcher } from "utils/axios";
import _ from "lodash";

// list of blogs
function useBlogs() {
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

function useBlog() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.blogs.all
  );
}

function postBlog(id: string | null, data: any) {
  const URL = endpoints.admin.blogs.blog(id);
  return postFetcher([URL, {}, data]);
}

function blogStorage(file: File, blogName: string) {
  const blogSlug = _.kebabCase(blogName);
  return fileStorage(file, endpoints.admin.storage.blog, blogSlug).then(
    (imageId) => ({ imageId, blogSlug })
  );
}

export { postBlog, useBlogs, blogStorage };
