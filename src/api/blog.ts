import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "lib/firebase/config";
import { fileStorage } from "lib/firebase/utils";
import _ from "lodash";
import { useMemo } from "react";
import useSWR from "swr";
import { IBlogPage } from "types/blog";
import { endpoints, getFetcher, postFetcher } from "utils/axios";

// list of blogs
function useBlogs() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.blogs.all,
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

function postBlog(id: string | null, data: any) {
  const URL = endpoints.blogs.blog(id);
  return postFetcher([URL, {}, data]);
}

function blogStorage(file: File, blogName: string) {
  const blogSlug = _.kebabCase(blogName);
  return fileStorage(file, endpoints.storage.blog, blogSlug).then(
    (imageId) => ({ imageId, blogSlug })
  );
}

export function getBlogs(setState: (state: any[]) => void) {
  const ref = collection(db, "blogs");
  const q = query(ref); // listens on document modifications
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
}

export const getBlog = async (slug: string) => {
  const docRef = doc(db, "blogs", slug);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

// export function  getBlog(slug:string, setState: (state: any[] => void)) => {
//   const docRef = doc(db, "blogs", slug);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     setLoadedDoc(docSnap.data() as IBlogPage);
//   }
//   }
// };

export { blogStorage, postBlog, useBlogs };
