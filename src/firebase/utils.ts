import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
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

export { addData };
