"use client"
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {IconPaperclip} from "@tabler/icons-react";
import {launchImageLibrary} from "react-native-image-picker";
import {useRef} from "react";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSet,
} from "@/components/ui/field";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.currentTarget.files?.[0]
if(file){
console.log(file)
}
}
export default function FieldInput() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    fileInputRef.current?.click()
  }
    return (
      <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg md:max-w-2xl p-6">
        <CardTitle>Create a Club</CardTitle>
        <form>
        <div className="flex flex-col gap-6 p-3">
          <div className="grip gap-2">
            <div className="flex flex-col gap-2">
            <Label htmlFor="Club Name" className="flex gap-4">Enter Club Name</Label>
            <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{display: "none"}}
            required
            />
            <Input 
            id="Club Name"
            type="Club Name"
            placeholder="ex. Falkon Robotics"
            required
            />
            <div className="flex flex-col gap-2">
            <Label htmlFor="Club Description" className="flex gap-4">Enter Club Description</Label>
            <Input 
            id="Club Description"
            type="Club Description"
            placeholder="ex. You have a lot of fun"
            required
            />
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="Room Number" className="gap-4">Enter Room Number</Label>
            <Input 
            id="Room Number"
            type="Room Number"
            placeholder="ex. 1308"
            required
            />
            <Label htmlFor="Club Links" className="gap-4">Enter Club Links</Label>
            <Input
            id="Club Links"
            type="Links"
            placeholder="ex. A google classroom link"
            required
            />
            </div>
          </div>
          </div>
        </div>
        </form>
        <CardFooter className="flex-left gap-4">
        <Button variant="outline" size="sm" onClick={handleClick}>
          <IconPaperclip/>Upload Club Photo </Button>
        <input type="file" ref={fileInputRef} style={{display:"none"}}/>
        <Button variant="outline" type="submit">
        Submit Club
        </Button>
      </CardFooter>
      </Card>
      </div>
    )
}
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CreateClubPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    roomNumber: "",
    advisorName: "",
    advisorEmail: "",
    signUpLink: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.roomNumber.trim()) e.roomNumber = "Required";
    if (!form.advisorName.trim()) e.advisorName = "Required";
    if (!form.advisorEmail.trim()) e.advisorEmail = "Required";
    if (!form.signUpLink.trim()) e.signUpLink = "Required";
    return e;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});
    setSubmitting(true);
    setServerError("");
    try {
      await axios.post("/api/clubs", form);
      router.push("/clubs");
    } catch (err: any) {
      setServerError(err.response?.data?.error ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <h1 className="text-3xl font-bold text-white">Create a Club</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rounded-xl border bg-white px-8 py-8">
            <FieldSet>
              <FieldGroup>

                <Field>
                  <FieldLabel htmlFor="name">Club Name</FieldLabel>
                  <Input id="name" type="text" placeholder="e.g. Falcon Robotics" {...field("name")} />
                  <FieldError>{errors.name}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea id="description" placeholder="What does your club do?" rows={3} {...field("description")} />
                  <FieldError>{errors.description}</FieldError>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="roomNumber">Room Number</FieldLabel>
                    <Input id="roomNumber" type="text" placeholder="e.g. 7201" {...field("roomNumber")} />
                    <FieldError>{errors.roomNumber}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="advisorName">Advisor Name</FieldLabel>
                    <Input id="advisorName" type="text" placeholder="e.g. Ms. Johnson" {...field("advisorName")} />
                    <FieldError>{errors.advisorName}</FieldError>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="advisorEmail">Advisor Email</FieldLabel>
                  <Input id="advisorEmail" type="email" placeholder="advisor@school.edu" {...field("advisorEmail")} />
                  <FieldError>{errors.advisorEmail}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="signUpLink">Sign-Up Link</FieldLabel>
                  <Input id="signUpLink" type="url" placeholder="https://forms.google.com/..." {...field("signUpLink")} />
                  <FieldError>{errors.signUpLink}</FieldError>
                </Field>

              </FieldGroup>
            </FieldSet>

            {serverError && (
              <p className="mt-4 text-sm text-destructive">{serverError}</p>
            )}

            <div className="mt-8 flex justify-end">
              <Button type="submit" className="px-8" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit for Approval"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
