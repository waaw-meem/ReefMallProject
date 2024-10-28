export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req: any) => {
  const currentUser: any = await getToken({ req });

  if (
    currentUser &&
    currentUser.user.type !== "customer" &&
    req.nextUrl.pathname.startsWith("/save-search")
  ) {
    return NextResponse.redirect(new URL("/user-profile", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    // "/favorites",
    "/outlet-detail",
    "/save-search",
    "/upcoming-events",
    "/user-profile",
  ],
};
