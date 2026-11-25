import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { isAdmin } from "@/lib/admin";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        const db = await getDb();
        const user = await db.collection("users").findOne({ email });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Save Google users in our own users collection
      if (account?.provider === "google" && user.email) {
        const email = user.email.toLowerCase();
        const db = await getDb();
        await db.collection("users").updateOne(
          { email },
          {
            $set: { name: user.name ?? "", image: user.image ?? null, emailVerified: true, updatedAt: new Date() },
            $setOnInsert: { email, createdAt: new Date() },
          },
          { upsert: true }
        );
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account) token.provider = account.provider;
      if (user?.email) token.email = user.email.toLowerCase();
      // Admin only when signed in with Google (Google has verified the address)
      token.isAdmin = isAdmin(token.email) && token.provider === "google";
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.isAdmin = !!token.isAdmin;
      return session;
    },
  },
};