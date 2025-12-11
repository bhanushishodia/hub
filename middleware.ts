// import { NextResponse } from "next/server";

// export function middleware(request: any) {

//   const localAuth = request.cookies.get("localAuth")?.value;

//   const role = request.cookies.get("role")?.value;

//   const protectedRoutes = ["/dashboard"];

//   if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
 
//     if (!localAuth) {
//       const loginUrl = new URL("/", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const localAuth = request.cookies.get("localAuth")?.value;

  // ✔ NextAuth session cookies
  const nextAuthSession =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {

    if (!localAuth && !nextAuthSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
