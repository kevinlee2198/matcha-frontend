import "next-auth";
import "next-auth/jwt"; // The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
