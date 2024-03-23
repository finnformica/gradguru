import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { app, storage } from "./config";
import { FirestoreCollectionType, FirestoreDataType } from "./types";
import { v4 as uuid } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { endpoints } from "utils/axios";

const db = getFirestore(app);

export const getDocumentIds = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => doc.id);
};

const addData = async (
  data: FirestoreDataType,
  id: string | null,
  collectionName: FirestoreCollectionType
) => {
  let error,
    result = null;
  try {
    result = id
      ? await setDoc(doc(db, collectionName, id), data, { merge: true })
      : await addDoc(collection(db, collectionName), data);
  } catch (e) {
    console.log("An error occured", e);
  }

  return { result, error };
};

const deleteDocument = async (
  collectionName: FirestoreCollectionType,
  documentId: string
) => {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
};

const retrieveDocumentIds = async (collectionName: FirestoreCollectionType) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => doc.id);
};

const retrieveAllDocuments = async (
  collectionName: FirestoreCollectionType
) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const retrieveDocument = async (
  collectionName: FirestoreCollectionType,
  documentId: string
) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export function fileStorage(file: File, endpoint: string) {
  const address = file.name + "_" + uuid();
  const _ref = ref(storage, `${endpoint} /test/ ${address}`);
  return uploadBytes(_ref, file).then(() => address);
}

export {
  addData,
  retrieveDocumentIds,
  retrieveDocument,
  retrieveAllDocuments,
  deleteDocument,
};
