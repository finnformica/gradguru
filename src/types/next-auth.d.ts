import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accessToken: string;
      id: string;
      role: number;
      courses: string[];
    } & DefaultSession["user"];
  }

  export interface User extends DefaultUser {
    token: string;
    id: string;
    role: number;
    courses: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
  }
}
