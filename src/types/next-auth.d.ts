import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      expireAt: string;
      isAdmin: boolean;
    };
    error: string;
  }
}
