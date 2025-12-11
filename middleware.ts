import { NextResponse } from "next/server";

export function middleware(request: any) {
  // const user = request.cookies.get("user")?.value;
  const localAuth = request.cookies.get("localAuth")?.value;

  const role = request.cookies.get("role")?.value;

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // if (!user) {
    //   const loginUrl = new URL("/", request.url);
    //   return NextResponse.redirect(loginUrl);
    // }
    if (!localAuth) {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
