import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// create a new user document in the user-meta collection
exports.createUserObject = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("user-meta").doc(user.uid).set({
    email: user.email,
    id: user.uid,
    name: user.displayName,
    photoURL: user.photoURL,
    role: 1,
    courses: [],
  });
});

// delete the user document in the user-meta collection
exports.deleteUserObject = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection("user-meta").doc(user.uid).delete();
});
