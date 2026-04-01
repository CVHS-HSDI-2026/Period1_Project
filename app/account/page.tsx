"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { Axios } from "axios"
import { use, useState } from "react"

export default function Page() {

  // get user data from server and prefill form with it

  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-navy">Welcome, {session?.user?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountForm />
        </CardContent>
      </Card>
    </div>
  )
}

export async function AccountForm() {
  const { data: session } = useSession();
  // store form
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    graduationYear: "",
    studentId: "",
    password: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      // fetch user data from server
      Axios.get(`/api/customize?email=${session.user.email}`)
        .then((response) => {
          const { name, email, student } = response.data;
          setForm({
            name: name || "",
            email: email || "",
            graduationYear: student?.graduationYear || "",
            studentId: student?.studentId || "",
            password: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  }, [session]);



  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="First Name Last Name" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grad-year">Graduating Year</Label>
          <Input id="grad-year" placeholder="2026" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@email.com" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-id">Student ID</Label>
          <Input id="student-id" placeholder="123456" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" className="bg-white" />
        </div>
      </div>
      <Button type="submit" className="w-full bg-navy hover:bg-navy/90">
        Save changes
      </Button>
    </form>
  )
}
