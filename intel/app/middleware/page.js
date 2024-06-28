import { NextResponse } from "next/server";

export function middleware(request) {
    if (request.nextUrl.pathname !== "/Health") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
