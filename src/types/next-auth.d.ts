import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: number;
      courses: string[];
    } & DefaultSession["user"];
  }

  export interface User {
    id: string;
    role: number;
    courses: string[];
  }
}
