import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isAuth = !!req.auth;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Hidden Routing: If not authenticated and trying to access /admin, return 404
    if (isAdminRoute && !isAuth && req.nextUrl.pathname !== "/admin/login") {
        return new NextResponse(null, { status: 404 });
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*"],
};
