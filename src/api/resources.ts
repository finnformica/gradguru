import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

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

export const postResourceType = async (course: string, data: string[]) => {
  const ref = doc(db, "courses", course, "resources", "types");

  await setDoc(ref, { types: data }, { merge: true });
};

export const postResource = async (course: string, data: any) => {
  const ref = collection(db, "courses", course, "resources");

  await addDoc(ref, data);
};
