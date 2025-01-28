import { API_CONSTANTS } from "@/constants/api.constants";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(API_CONSTANTS.LOCAL_TOKEN_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/*"],
};
