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

        const user = await db.user.findUnique({
          where: { email },
          include: {
            student: true,
            admin: true,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      // Only fetch role on initial sign in, not every request
      if (user) {
        token.id = user.id;

        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          include: {
            student: true,
            admin: true,
          },
        });

        if (dbUser?.student) {
          token.role = "STUDENT";
          token.studentId = dbUser.student.id;
        } else if (dbUser?.admin) {
          token.role = "ADMIN";
          token.adminId = dbUser.admin.id;
        }
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
