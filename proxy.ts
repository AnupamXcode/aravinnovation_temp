import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for APIs, Next.js internals, static files, videos, images
  matcher: ["/((?!api|_next|_vercel|videos|images|.*\\..*).*)"],
};
