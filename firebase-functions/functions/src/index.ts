import { firestore } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import * as functions from "firebase-functions";

// initialize the app
initializeApp();

// set the region to europe-west2
const europeFunctions = functions.region("europe-west2");

// delete the user document in the user-meta collection
exports.deleteUserObject = europeFunctions.auth.user().onDelete((user) => {
  console.log("Deleting user object", user.uid);
  return firestore().collection("user-meta").doc(user.uid).delete();
});

// create the user document in the user-meta collection
exports.createUserObject = europeFunctions.auth.user().onCreate((user) => {
  console.log("Creating user object", user.uid);
  return firestore().collection("user-meta").doc(user.uid).set({
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: 1,
    courses: [],
  });
});
