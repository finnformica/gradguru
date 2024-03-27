import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  return NextResponse.next();
}

// match to all routes under /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
