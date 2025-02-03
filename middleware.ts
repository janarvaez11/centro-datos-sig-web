
import { authMiddleware } from "@clerk/nextjs/server";



export default authMiddleware({
  publicRoutes: ["/api/uploadthing"],

  clockSkewInMs: 5 * 60 * 1000,
  

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',

  ],
};
