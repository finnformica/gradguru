import { DefaultUser } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      courses: string[];
    } & DefaultSession["user"];
  }

  export interface User {
    id: string;
    role: number;
    courses: string[];
  }
}
