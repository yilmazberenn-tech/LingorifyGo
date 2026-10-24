import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/lib/database";

const invalidPasswordHash =
  "$2b$12$5VW2zmwcjlH3h02Yul5BIelxmRtJahCscn2fy/ZBhVy6EEufiZ4n.";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (
          !email ||
          email.length > 254 ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          !password ||
          Buffer.byteLength(password, "utf8") > 72
        ) {
          return null;
        }

        const user = await findUserByEmail(email);
        const passwordMatches = await bcrypt.compare(
          password,
          user?.password_hash ?? invalidPasswordHash,
        );

        if (!user || !passwordMatches) {
          return null;
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
