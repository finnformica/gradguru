import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

const addData = async (
  data: FirestoreDataType,
  id: string | null,
  collectionName: FirestoreCollectionType
) => {
  let error,
    result = null;
  try {
    console.log("writing to db...");

    result = id
      ? await setDoc(doc(db, collectionName, id), data, { merge: true })
      : await addDoc(collection(db, collectionName), data);

    console.log("write successful");
  } catch (e) {
    error = e;
    console.log("error writing to db", e);
  }

  return { result, error };
};

export { addData };
