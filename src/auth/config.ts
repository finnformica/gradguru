import { cert } from "firebase-admin/app";

import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }) as Adapter,
  callbacks: {
    async jwt({ token, user }) {
      // if (user?.id) {
      //   token.id = user.id;
      // }
      // if (user?.userName) {
      //   token.userName = user.userName;
      // }
      return token;
    },
    async session({ session, token }) {
      // session.id = token.id;
      // session.userName = token.userName;
      return session;
    },
  },
};
