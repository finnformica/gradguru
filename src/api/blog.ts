import _ from "lodash";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { deleteObject, getBytes, ref } from "firebase/storage";

import { db, storage } from "lib/firebase/config";
import { fileStorage } from "lib/firebase/utils";
import { IBlog } from "types/blog";
import { endpoints } from "utils/axios";

export function createBlog(slug: string, data: IBlog) {
  const ref = doc(db, "blogs", slug);
  const payload = { ...data, created: Date.now() };

  return setDoc(ref, payload, { merge: true });
}

export function updateBlog(slug: string, data: IBlog) {
  const ref = doc(db, "blogs", slug);
  return setDoc(ref, data, { merge: true });
}

export function blogStorage(file: File, blogName: string) {
  const blogSlug = _.kebabCase(blogName);
  return fileStorage(file, `${endpoints.storage.blog}/${blogSlug}`).then(
    (imageId) => ({ imageId, blogSlug })
  );
}

export function deleteBlogStorage(fileName: string, folderName: string) {
  const objRef = ref(storage, `blog/${folderName}/${fileName}`);
  return deleteObject(objRef);
}

export function deleteBlogDB(docName: string) {
  const dbRef = doc(db, "blogs", docName);
  return deleteDoc(dbRef);
}

export function getBlogs(setState: (state: any[]) => void) {
  const ref = collection(db, "blogs");
  const q = query(ref); // listens on document modifications
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs
      .filter((doc) => doc.id !== "tags")
      .map((doc) => ({ id: doc.id, ...doc.data() }));

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

export const getBlogTags = async () => {
  const docRef = doc(db, "blogs", "tags");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const createBlogTag = async (data: string[]) => {
  const ref = doc(db, "blogs", "tags");
  await setDoc(ref, { tags: data }, { merge: true });
};

export const getHeroPhotoFile = async (
  slug: string,
  imageId: string
): Promise<File | null> => {
  const heroRef = ref(storage, `blog/${slug}/${imageId}`);
  const fileBytes = await getBytes(heroRef);
  if (!fileBytes) {
    return null;
  } else {
    const heroPhotoFile = new File([fileBytes], imageId);
    return heroPhotoFile;
  }
};
