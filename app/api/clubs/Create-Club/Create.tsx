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
export function FieldInput() {
    return (
        <FieldSet className = "w-full max-w-xs">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Club Name">Club Name</FieldLabel>
              <Input id="CName" type="text" placeholder="Falkon Robotics"/>
              <FieldDescription>
                Choose a unique username for your club!
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
    )
}