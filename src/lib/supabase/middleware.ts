import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    return response;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const isAuthPage = pathname === "/login";
    const isUnauthorizedPage = pathname === "/unauthorized";
    const isDashboardRoute =
      pathname === "/" ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/users") ||
      pathname.startsWith("/vehicles") ||
      pathname.startsWith("/maintenance") ||
      pathname.startsWith("/subscriptions") ||
      pathname.startsWith("/payments") ||
      pathname.startsWith("/notifications") ||
      pathname.startsWith("/reports") ||
      pathname.startsWith("/content") ||
      pathname.startsWith("/admins") ||
      pathname.startsWith("/audit-logs") ||
      pathname.startsWith("/settings");

    // Allow static assets and auth callback routes
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".") ||
      isUnauthorizedPage
    ) {
      return response;
    }

    // 1. Unauthenticated users trying to access dashboard -> Redirect to /login
    if (!user && isDashboardRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // 2. Authenticated user visiting /login -> Check role & redirect appropriately
    if (user && isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("Middleware Supabase auth error:", error);
  }

  return response;
}

