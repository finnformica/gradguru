import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

const config = {
  apiKey: "AIzaSyAjhjJDVaaMHFK62SijHLwGcpDZOktKufc",
  authDomain: "gradguru.firebaseapp.com",
  projectId: "gradguru",
  storageBucket: "gradguru.appspot.com",
  messagingSenderId: "836524878091",
  appId: "1:836524878091:web:d4c471affb1f07781b5a0e",
  measurementId: "G-GLX81PFR27",
};

const app = initializeApp(config);

const db = getFirestore(app);

export { app, db, config };
