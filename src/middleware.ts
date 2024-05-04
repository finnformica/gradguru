import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  if (req.nextUrl.pathname.startsWith("/sign-in") && isProduction) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && isProduction) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin") && isProduction) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// match to all routes under /dashboard
export const config = {
  matcher: ["/:path*"],
};
