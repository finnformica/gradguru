import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase/config";
import { AptitudeTestType } from "types";

// ---- Tests ----

export const getTests = (
  testType: AptitudeTestType,
  setState: (state: any[]) => void
) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "tests",
    testType
  );

  const q = query(ref); // listens on document modifications

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
};

export const getTestById = async (
  testType: AptitudeTestType,
  testId: string
) => {
  const ref = doc(
    db,
    "courses",
    "consulting",
    "tests",
    "tests",
    testType,
    testId
  );

  return getDoc(ref).then(
    (snapshot) =>
      ({
        id: snapshot.id,
        ...snapshot.data(),
      }) as any
  );
};

export const getTestIds = async (testType: AptitudeTestType) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "tests",
    testType
  );

  return getDocs(ref).then((snapshot) => snapshot.docs.map((doc) => doc.id));
};

export const createTest = async (testType: AptitudeTestType, data: any) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "tests",
    testType
  );

  const payload = { ...data, created: Date.now() };

  // TODO: add created and updated timestamps
  return addDoc(ref, payload).then((docRef) => docRef.id);
};

export const deleteTest = async (
  testType: AptitudeTestType,
  testId: string
) => {
  const ref = doc(
    db,
    "courses",
    "consulting",
    "tests",
    "tests",
    testType,
    testId
  );

  return deleteDoc(ref);
};

// ---- Questions ----

export const getQuestions = (
  testType: AptitudeTestType,
  setState: (state: any[]) => void
) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType
  );

  const q = query(ref); // listens on document modifications

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
};

export const getQuestionsById = (
  testType: AptitudeTestType,
  questionIds: string[],
  setState: (state: any[]) => void
) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType
  );

  const q = query(ref, where(documentId(), "in", questionIds));

  return onSnapshot(q, (snapshot): void => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
};

export const createQuestion = async (testType: AptitudeTestType, data: any) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType
  );

  const payload = { ...data, created: Date.now() };

  // TODO: add created and updated timestamps
  return addDoc(ref, payload).then((docRef) => docRef.id);
};

export const patchQuestion = async (
  testType: AptitudeTestType,
  questionId: string,
  data: any
) => {
  const ref = doc(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType,
    questionId
  );

  const payload = { ...data, created: Date.now() };

  // TODO: add updated timestamps
  return setDoc(ref, payload, { merge: true });
};

export const deleteQuestion = async (
  testType: AptitudeTestType,
  questionId: string
) => {
  const ref = doc(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType,
    questionId
  );

  return deleteDoc(ref);
};

// ---- User ----

export const createTestRecord = (
  testType: AptitudeTestType,
  userId: string,
  testId: string,
  data: any
) => {
  const ref = doc(
    db,
    "user-meta",
    userId,
    "consulting",
    "tests",
    testType,
    testId
  );

  // setDoc automatically creates the document if it doesn't exists
  return setDoc(ref, { results: arrayUnion(data) }, { merge: true });
};

export const getTestRecords = (
  testType: AptitudeTestType,
  userId: string,
  setState: (state: any[]) => void
) => {
  const ref = collection(
    db,
    "user-meta",
    userId,
    "consulting",
    "tests",
    testType
  );

  const q = query(ref);

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setState(data);
  });
};
