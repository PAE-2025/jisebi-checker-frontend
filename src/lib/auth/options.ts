import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "__session",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      },
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const result = await login(username, password);

          return {
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            expireAt: result.data.expireAt,
            isAdmin: result.data.isAdmin, // pastikan field ini ada di response
          };
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expireAt = user.expireAt;
        token.isAdmin = user.isAdmin;
      }

      // Jika token sudah expired, hapus token dan tambahkan error
      if (Date.now() > token.expireAt * 1000) {
        return {
          ...token,
          accessToken: null,
          refreshToken: null,
          expireAt: null,
          isAdmin: null,
          error: "TokenExpired",
        };
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expireAt: token.expireAt,
        isAdmin: token.isAdmin,
      };
      if (token?.error) {
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/signout",
  },
};
