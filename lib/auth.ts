import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, // Required for Credentials provider
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        console.time("[auth] db.user.findUnique");
        const user = await db.user.findUnique({
          where: { email },
          include: {
            student: true,
            admin: true,
          },
        });
        console.timeEnd("[auth] db.user.findUnique");

        if (!user || !user.password) {
          return null;
        }

        console.time("[auth] bcrypt.compare");
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.timeEnd("[auth] bcrypt.compare");

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.student ? "STUDENT" : user.admin ? "ADMIN" : undefined,
          studentId: user.student?.id,
          adminId: user.admin?.id,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.studentId = user.studentId;
        token.adminId = user.adminId;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "STUDENT" | "ADMIN" | undefined;
        session.user.studentId = token.studentId as string | undefined;
        session.user.adminId = token.adminId as string | undefined;
      }
      return session;
    },
  },
});
