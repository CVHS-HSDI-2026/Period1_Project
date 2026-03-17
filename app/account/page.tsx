"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar"
import { LoginForm } from "@/components/auth/login-form";
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  BellIcon,
  CalculatorIcon,
  CalendarIcon,
  ClipboardPasteIcon,
  CodeIcon,
  CopyIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderIcon,
  FolderPlusIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LayoutGridIcon,
  ListIcon,
  ScissorsIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <div className="flex flex-col items-start space-y-6 p-6">
      <FieldDemo/>
    </div>
  )
}
export function FieldDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto">
  <h1 className="text-4xl font-bold mb-6">Welcome, [Name]!</h1>
  <form>
    <FieldGroup className="grid grid-cols-2 gap-6">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="First Name Last Name"
        className="placeholder:text-gray-700"/>
      </Field>
      <Field>
        <FieldLabel>Graduating Year</FieldLabel>
        <Input placeholder="20XX"
        className="placeholder:text-gray-700"/>
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="email@email.com"
        className="placeholder:text-gray-700"/>
      </Field>
      <Field>
        <FieldLabel>Student ID</FieldLabel>
        <Input placeholder="123456"
        className="placeholder:text-gray-700"/>
      </Field>
      <Field className="col-span-2">
        <FieldLabel>Password</FieldLabel>
        <Input type="password"
        className="placeholder:text-gray-700"/>
      </Field>
    </FieldGroup>
  </form>
</div>
  )
}
