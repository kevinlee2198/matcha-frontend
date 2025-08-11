export { auth as middleware } from "@/auth";

export const config = {
  //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude API routes and static assets
  matcher: ["/dashboard"],
};
