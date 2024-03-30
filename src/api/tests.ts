import { useMemo } from "react";
import useSWR from "swr";
import { deleteFetcher, endpoints, getFetcher, postFetcher } from "utils/axios";

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

export function useSJTTests() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.tests.sjt.all,
    getFetcher
  );

  return useMemo(
    () => ({
      questions: data?.documents as any[] | undefined,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export function postSJTTest(id: string | null, data: any) {
  const URL = endpoints.admin.tests.sjt.test(id);
  return postFetcher([URL, {}, data]);
}

export function deleteSJTTest(id: string) {
  const URL = endpoints.admin.tests.sjt.test(id);
  return deleteFetcher(URL);
}

export function useNRTests() {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    endpoints.admin.tests.nr.all,
    getFetcher
  );

  return useMemo(
    () => ({
      questions: data?.documents as any[] | undefined,
      loading: isLoading,
      error,
      isValidating,
      refresh: () => mutate(),
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export async function getNRTests(type: string) {
  const nrRef = collection(db, "nr-consulting");
  const q = query(nrRef, where("type", "==", type));

  return getDocs(q).then((questions) =>
    questions.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
}

export function postNRTest(id: string | null, data: any) {
  const URL = endpoints.admin.tests.nr.test(id);
  return postFetcher([URL, {}, data]);
}

export function deleteNRTest(id: string) {
  const URL = endpoints.admin.tests.nr.test(id);
  return deleteFetcher(URL);
}

export const createTestRecord = (data: any, userId: string) => {
  const docRef = doc(db, "user-meta", userId);

  // setDoc automatically creates the document if it doesn't exists
  return setDoc(docRef, { testRecords: arrayUnion(data) }, { merge: true });
};

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
