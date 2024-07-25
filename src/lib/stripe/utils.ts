import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { db } from "lib/firebase/config";
import getStripe from "./init";

export async function createCheckoutSession(uid: string) {
  const checkoutSessionRef = doc(
    db,
    "user-meta",
    uid,
    "checkout_sessions",
    uuid()
  );

  await setDoc(checkoutSessionRef, {
    price: "price_1PgUfn033RgSU2652C4DjDlo",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(checkoutSessionRef, async (snap) => {
    const data = snap.data();
    const sessionId = data?.sessionId;

    console.log("Snap data:", data);
    console.log("Stripe session ID:", sessionId);

    if (sessionId) {
      // session created, initialise stripe
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error("Stripe.js not loaded");
      }

      stripe.redirectToCheckout({ sessionId, mode: "payment" });
    }
  });
}
