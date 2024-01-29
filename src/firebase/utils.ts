import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { app } from "./config";
import { FirestoreCollectionType, FirestoreDataType } from "./types";

const db = getFirestore(app);

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
    error = e;
    console.log("An error occured", e);
  }

  return { result, error };
};

const retrieveDocumentIds = async (collectionName: FirestoreCollectionType) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => doc.id);
};

const retrieveAllDocuments = async (
  collectionName: FirestoreCollectionType
) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => doc.data());
};

const retrieveDocument = async (
  collectionName: FirestoreCollectionType,
  documentId: string
) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export { addData, retrieveDocumentIds, retrieveDocument, retrieveAllDocuments };
