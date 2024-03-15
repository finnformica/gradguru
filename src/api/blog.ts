import { storage } from "@/firebase/config";
import { endpoints, getFetcher, postFetcher } from "@/utils/axios";
import { ref, uploadBytes } from "firebase/storage";
import { enqueueSnackbar } from "notistack";
import { useMemo } from "react";
import useSWR from "swr";
import { v4 } from "uuid";

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

export function storageBlog(imageName: File | null, loc: string) {
  if (imageName == null) {
    return enqueueSnackbar("Image upload unsuccessful");
  }
  const imageAddress = imageName.name + v4();
  const imageRef = ref(storage, `blog/${imageAddress}`);
  uploadBytes(imageRef, imageName).then(() => {
    enqueueSnackbar("Image has been added");
  });
  return imageAddress;
}
