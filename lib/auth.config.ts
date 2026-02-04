import type { NextAuthConfig } from "next-auth";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup"];

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Check if current path is a public route
      const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
      );

      // Allow API routes for auth and registration
      const isAuthApi = pathname.startsWith("/api/auth");
      const isRegisterApi = pathname === "/api/register";

      // Public routes and auth/register APIs are always accessible
      if (isPublicRoute || isAuthApi || isRegisterApi) {
        // Redirect logged-in users away from login/signup to dashboard
        if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      // All other routes require authentication
      if (!isLoggedIn) {
        return false; // Redirect to login
      }

      return true;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
