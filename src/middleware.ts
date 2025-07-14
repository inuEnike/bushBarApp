import { updateSession } from "@/app/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Don't protect auth routes
  const publicPaths = ["/auth/login", "/auth/signup", "/items/details/[id]", "/"];
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
