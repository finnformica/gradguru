import NextAuth from "next-auth";

import { authOptions } from "@/auth/config";

const handler = (req: any, res: any) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
