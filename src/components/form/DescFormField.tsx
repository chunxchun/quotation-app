import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormFieldProps } from "@/types/FormTypes";

export function DescFormField({ form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="desc"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input placeholder="input image description here" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
