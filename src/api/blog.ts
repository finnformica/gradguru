import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "lib/firebase/config";
import { fileStorage } from "lib/firebase/utils";
import _ from "lodash";
import { IAddBlogPost } from "types/blog";
import { endpoints } from "utils/axios";

export function addBlog(slug: string, data: IAddBlogPost) {
  const ref = doc(db, "blogs", slug);
  const payload = { ...data, created: Date.now() };
  return setDoc(ref, payload, { merge: true });
}

export function blogStorage(file: File, blogName: string) {
  const blogSlug = _.kebabCase(blogName);
  return fileStorage(file, `${endpoints.storage.blog}/${blogSlug}`).then(
    (imageId) => ({ imageId, blogSlug })
  );
}

export function deleteblogStorage(fileName: string, folderName: string) {
  const objRef = ref(storage, `blog/${folderName}/${fileName}`);
  return deleteObject(objRef);
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
