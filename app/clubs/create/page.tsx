import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
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
export default function FieldInput() {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg md:max-w-2xl p-6">
        <CardTitle>Create a Club</CardTitle>
        <form>
        <div className="flex flex-col gap-6 p-3">
          <div className="grip gap-2">
            <div className="flex flex-col gap-2">
            <Label htmlFor="Club Name" className="flex gap-4">Enter Club Name</Label>
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
            </div>
          </div>
          </div>
        </div>
        </form>
        <CardFooter className="flex-col gap-2">
        <Button type="submit">
          Submit Club
        </Button>
      </CardFooter>
      </Card>
      </div>
    )
}