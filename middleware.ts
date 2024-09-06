import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
 
const isSignInPage = createRouteMatcher(["/signin"]);
 
export default convexAuthNextjsMiddleware((request) => {
  if (!isSignInPage(request) && !isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
  if (isSignInPage(request) && isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/documents");
  }
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};