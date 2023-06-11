import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

const addData = async (
  data: FirestoreDataType,
  id: string | null,
  collection: FirestoreCollectionType
) => {
  let error,
    result = null;
  try {
    result = await setDoc(
      id ? doc(db, collection, id) : doc(db, collection),
      data,
      { merge: true }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export { addData };
