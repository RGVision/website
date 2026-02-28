import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials?.password === process.env.ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin" };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");

            if (isAdminRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }
            return true;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
});
