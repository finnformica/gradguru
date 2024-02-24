import { DefaultUser } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    userName: string;
  }

  interface User extends DefaultUser {
    id: string;
    userName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
  }
}
