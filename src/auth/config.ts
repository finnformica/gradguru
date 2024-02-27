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
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 1,
          courses: [],
        };
      },
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     return null;
    //   },
    // }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }) as Adapter,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.courses = user.courses;
      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
};
