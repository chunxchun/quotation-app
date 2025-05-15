"use client";

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
import { works } from "@/data/combobox";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types/FormTypes";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
export function WorkFormField({ form }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="work"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4 w-full">
          <FormLabel>Work</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between w-full",
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
                          setIsOpen(false);
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
