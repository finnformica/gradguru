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

const welcomeEmailConfig = {
  subject: "Welcome to Gradguru",
  text: `
      Welcome! 

      Thank you for signing up to Gradguru - we are excited to have you on board. Gradguru is a platform that helps you find the right graduate program for you. We do this by providing you with the tools to find the right program, the right school, and the right funding. Our goal is to help you find the right program for you, and to help you get into that program.
      Gradguru is currently in beta, and we are working hard to make it the best platform for you. Thank you for joining us on this journey.

      Best,
      The Gradguru Team
  `,
  html: `
    <h1>Welcome!</h1>

    <p>Thank you for signing up to Gradguru - we are excited to have you on board. Gradguru is a platform that helps you find the right graduate program for you. We do this by providing you with the tools to find the right program, the right school, and the right funding. Our goal is to help you find the right program for you, and to help you get into that program.</p>
    <p>Gradguru is currently in beta, and we are working hard to make it the best platform for you. Thank you for joining us on this journey.</p>
    
    <p>Best,</p>
    <p>The Gradguru Team</p>
  `,
};

export { addData, welcomeEmailConfig };
