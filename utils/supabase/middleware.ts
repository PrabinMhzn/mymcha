import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.user_metadata.role !== "admin") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";
        redirectUrl.searchParams.set(
          `redirectedFrom`,
          request.nextUrl.pathname
        );
        return NextResponse.redirect(redirectUrl);
      }
      return response;
    });
  }

  // Check if the route is an artist route
  if (request.nextUrl.pathname.startsWith("/artist")) {
    return supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.user_metadata.role !== "artist") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";
        redirectUrl.searchParams.set(
          `redirectedFrom`,
          request.nextUrl.pathname
        );
        return NextResponse.redirect(redirectUrl);
      }
      return response;
    });
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/artist/:path*"],
};

export const createClient = (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  return { supabase, response };
};
