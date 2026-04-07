import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "STUDENT" | "ADMIN";
    studentId?: string;
    adminId?: string;
  }

  interface Session {
    user: {
      id: string;
      role?: "STUDENT" | "ADMIN";
      studentId?: string;
      adminId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "STUDENT" | "ADMIN";
    studentId?: string;
    adminId?: string;
  }
}
