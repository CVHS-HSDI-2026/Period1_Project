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
import {Input} from "@/components/ui/input"
export default function FieldInput() {
    return (
        <FieldSet className = "w-[700px] max-w-l">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Club Name">Club Name</FieldLabel>
              <Input id="CName" type="text" placeholder="Insert Name(e.g. Falkon Robotics)"/>
              <FieldLabel htmlFor="Description">Description</FieldLabel>
              <Input id="Des" type="text" placeholder="Insert Description(e.g. Build stuff)"/>
              <FieldLabel htmlFor="Room Number">Room Number</FieldLabel>
              <Input id="Num" type="text" placeholder="Insert Room Number"/>
            </Field>
          </FieldGroup>
        </FieldSet>
    )
}