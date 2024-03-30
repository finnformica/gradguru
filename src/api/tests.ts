import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase/config";

// ----  Legacy ----

export async function getNRQuestions(type: string) {
  const nrRef = collection(db, "nr-consulting"); // incorrect collection ref
  const q = query(nrRef, where("type", "==", type));

  return getDocs(q).then((questions) =>
    questions.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
}

// ---- Tests ----

export const getTests = async (testType: string) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "tests",
    testType
  );

  return getDocs(ref).then((tests) =>
    tests.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
};

export const createTest = async (testType: string, data: any) => {
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

export const deleteTest = async (testType: string, testId: string) => {
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

export const getQuestions = async (testType: string) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType
  );

  return getDocs(ref).then((questions) =>
    questions.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
};

export const getQuestionsById = async (
  testType: string,
  questionIds: string[]
) => {
  const ref = collection(
    db,
    "courses",
    "consulting",
    "tests",
    "questions",
    testType
  );

  return getDocs(query(ref, where("id", "in", questionIds))).then((questions) =>
    questions.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
};

export const createQuestion = async (testType: string, data: any) => {
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
  questionId: string,
  testType: string,
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

  // TODO: add updated timestamps
  return setDoc(ref, data, { merge: true });
};

export const deleteQuestion = async (testType: string, questionId: string) => {
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

export const createTestRecord = (data: any, userId: string) => {
  const docRef = doc(db, "user-meta", userId);

  // setDoc automatically creates the document if it doesn't exists
  return setDoc(docRef, { testRecords: arrayUnion(data) }, { merge: true });
};
