import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CreateClubPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <h1 className="text-3xl font-bold text-white">Create a Club</h1>

        <div className="rounded-xl border bg-white px-8 py-8">
          <FieldSet>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="name">Club Name</FieldLabel>
                <Input id="name" type="text" placeholder="e.g. Falcon Robotics" />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" placeholder="What does your club do?" rows={3} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="roomNumber">Room Number</FieldLabel>
                  <Input id="roomNumber" type="text" placeholder="e.g. 7201" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="advisorName">Advisor Name</FieldLabel>
                  <Input id="advisorName" type="text" placeholder="e.g. Ms. Johnson" />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="advisorEmail">Advisor Email</FieldLabel>
                <Input id="advisorEmail" type="email" placeholder="advisor@school.edu" />
              </Field>

              <Field>
                <FieldLabel htmlFor="signUpLink">Sign-Up Link</FieldLabel>
                <Input id="signUpLink" type="url" placeholder="https://forms.google.com/..." />
              </Field>

            </FieldGroup>
          </FieldSet>

          <div className="mt-8 flex justify-end">
            <Button type="submit" className="px-8">
              Submit for Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
