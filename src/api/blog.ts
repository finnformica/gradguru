import { storage } from "@/firebase/config";
import { endpoints, getFetcher, postFetcher } from "@/utils/axios";
import { ref, uploadBytes } from "firebase/storage";
import { enqueueSnackbar } from "notistack";
import { useMemo } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";

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
  return postFetcher([URL, {}, data]);
}

export function storageBlog(file: File, endpoint?: string) {
  const address = file.name + uuid();
  const _ref = ref(storage, `${endpoints.admin.storage.blogImage + address}`);
  return uploadBytes(_ref, file).then(() => address);
}
