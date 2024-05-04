import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

import { db } from "lib/firebase/config";

export const getHirevueQuestionTypes = async (course: string) => {
  const ref = doc(db, "courses", course, "hirevue", "types");
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const createHirevueQuestionType = async (
  course: string,
  data: string[]
) => {
  const ref = doc(db, "courses", course, "hirevue", "types");

  await setDoc(ref, { types: data }, { merge: true });
};

export const getHirevueQuestions = (
  course: string,
  setState: (state: any[]) => void
) => {
  const ref = collection(db, "courses", course, "hirevue");
  const q = query(ref);

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs
      .filter((doc) => doc.id !== "types")
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
};

export const createHirevueQuestion = async (course: string, data: any) => {
  const payload = { ...data, created: Date.now() };
  const ref = collection(db, "courses", course, "hirevue");

  await addDoc(ref, payload);
};

export const deleteHirevueQuestion = async (course: string, id: string) => {
  const ref = doc(db, "courses", course, "hirevue", id);

  return deleteDoc(ref);
};

export const patchHirevueQuestion = async (
  course: string,
  id: string,
  data: any
) => {
  const ref = doc(db, "courses", course, "hirevue", id);

  await setDoc(ref, data, { merge: true });
};
