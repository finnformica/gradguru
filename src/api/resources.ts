import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

import { db } from "lib/firebase/config";

export const getResourceTypes = async (course: string) => {
  const ref = doc(db, "courses", course, "resources", "types");
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const createResourceType = async (course: string, data: string[]) => {
  const ref = doc(db, "courses", course, "resources", "types");

  await setDoc(ref, { types: data }, { merge: true });
};

export const getResource = async (course: string, id: string) => {
  const ref = doc(db, "courses", course, "resources", id);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getResources = (
  course: string,
  setState: (state: any[]) => void
) => {
  const ref = collection(db, "courses", course, "resources");
  const q = query(ref);

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs
      .filter((doc) => doc.id !== "types")
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
};

export const createResource = async (course: string, data: any) => {
  const payload = { ...data, created: Date.now() };
  const ref = collection(db, "courses", course, "resources");

  await addDoc(ref, payload);
};

export const deleteResource = async (course: string, id: string) => {
  const ref = doc(db, "courses", course, "resources", id);

  await setDoc(ref, { deleted: true }, { merge: true });
};
