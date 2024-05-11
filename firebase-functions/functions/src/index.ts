import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// set the region to europe-west2
const europeFunctions = functions.region("europe-west2");

// delete the user document in the user-meta collection
exports.deleteUserObject = europeFunctions.auth.user().onDelete((user) => {
  return admin.firestore().collection("user-meta").doc(user.uid).delete();
});
