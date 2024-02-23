import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";

import { db } from "@/firebase/config";
import GoogleProvider from "next-auth/providers/google";
import * as firestoreFunctions from "firebase/firestore";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "836524878091-rge0o0k865mljuh44kubr6g0dtls1mh2.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  adapter: FirestoreAdapter({
    db: db,
    ...firestoreFunctions,
  }) as Adapter,
};

const handler = (req: any, res: any) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
