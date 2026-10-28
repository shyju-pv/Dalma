import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const { response, user } = await updateSession(req);
    if (!user && pathname !== "/admin/login") return NextResponse.redirect(new URL("/admin/login", req.url));
    return response;
  }

  const first = pathname.split("/")[1];
  if (isLocale(first)) {
    const res = NextResponse.next();
    res.cookies.set("NEXT_LOCALE", first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }
  const saved = req.cookies.get("NEXT_LOCALE")?.value;
  const fromHeader = req.headers.get("accept-language")?.toLowerCase().startsWith("ar") ? "ar" : defaultLocale;
  const locale: Locale = saved && isLocale(saved) ? saved : fromHeader;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|api|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)"] };
