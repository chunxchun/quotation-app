"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FormFieldProps } from "@/types/FormTypes";

import { works } from "@/data/combobox";
export function WorkFormField({ form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="work"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4 w-full">
          <FormLabel>Work</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between w-full",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? works.find((work) => work.value === field.value)?.label
                    : "Select work"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search work..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No work found</CommandEmpty>
                  <CommandGroup>
                    {works.map((work) => (
                      <CommandItem
                        value={work.label}
                        key={work.value}
                        onSelect={() => {
                          form.setValue("work", work.value);
                        }}
                      >
                        {work.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            work.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
