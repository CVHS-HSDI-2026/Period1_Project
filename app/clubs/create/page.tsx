"use client"
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {IconPaperclip} from "@tabler/icons-react";
import {launchImageLibrary} from "react-native-image-picker";
import {useRef} from "react";
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