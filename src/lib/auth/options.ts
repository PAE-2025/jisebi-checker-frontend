import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
      }

      // Jika token sudah expired, hapus token dan tambahkan error
      if (Date.now() > token.expireAt * 1000) {
        return {
          ...token,
          accessToken: null,
          refreshToken: null,
          expireAt: null,
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
