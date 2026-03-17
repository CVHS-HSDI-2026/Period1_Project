import { Uploader } from '@/components/ui/uploader';
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Uploader />
    </main>
  );
}

// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldLegend,
//   FieldSeparator,
//   FieldSet,
//   FieldTitle,
// } from "@/components/ui/field";
// import { Uploader } from '@/components/uploader';
// import {Input} from "@/components/ui/input"
// export default function FieldInput() {
//     return (
//         <FieldSet className = "w-full max-w-xs">
//           <FieldGroup>
//             <Field>
//               <FieldLabel htmlFor="Club Name">Club Name</FieldLabel>
//               <Input id="CName" type="text" placeholder="Insert Name(e.g. Falkon Robotics)"/>
//               <FieldLabel htmlFor="Description">Description</FieldLabel>
//               <Input id="Des" type="text" placeholder="Insert Description(e.g. Build stuff)"/>
//               <FieldLabel htmlFor="Room Number">Room Number</FieldLabel>
//               <Input id="Num" type="text" placeholder="Insert Room Number"/>
//               <FieldLabel htmlFor="Uploader">Upload</FieldLabel>
//               <Input id="Upl" type="text" placeholder="Upload Images"/>
//             </Field>
//           </FieldGroup>
//         </FieldSet>  
//     )
// }