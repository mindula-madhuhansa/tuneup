import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // token exist when user logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // allow the request if the following is true

  // request for next-auth session and provider fetching
  // the token exist
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect to login if dont have token
  if (!token && pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
}

export const config = { matcher: ["/", "/login"] };
