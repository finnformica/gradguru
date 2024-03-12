import { cert } from "firebase-admin/app";

import { NextAuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import type { Adapter } from "next-auth/adapters";

import { db } from "@/firebase/config";
import bcrypt from "bcrypt";
import { collection, getDocs, query, where } from "firebase/firestore";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          token: profile.accessToken,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 1,
          courses: [],
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
      profile(profile) {
        return {
          token: profile.accessToken,
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
          role: 1,
          courses: [],
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("authorizing...");

        if (!credentials) {
          throw new Error("Missing email, or password");
        }

        const { email, password } = credentials;

        // check if user exists
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        // throw error if user does not exist
        if (querySnapshot.empty) {
          throw new Error("No account is associated with the given email");
        }

        const user = querySnapshot.docs[0].data();

        // authorize user
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          console.log("Invalid password");
          throw new Error("Invalid password");
        }

        return user as User;
      },
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
    async session({ session, token, user }) {
      console.log("session", session);
      console.log("session_user", user);
      // session.user.id = user.id;
      // session.user.role = user.role;
      // session.user.courses = user.courses;

      return session;
    },
    async jwt({ token, user, account }) {
      console.log("token", token);
      console.log("jwt_user", user);

      if (account && user && account.provider === "credentials") {
        // Initial login for credentials
        // attach the token to the session
        token.accessToken = user.token;
      }

      return token;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
};
