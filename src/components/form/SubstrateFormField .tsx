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
import { substrates } from "@/data/combobox";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types/FormTypes";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
export function SubstrateFormField({ form }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="substrate"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4 w-full">
          <FormLabel>Substrate</FormLabel>
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
                    ? substrates.find(
                        (substrate) => substrate.value === field.value
                      )?.label
                    : "Select substrate"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search substrate..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No substrate found</CommandEmpty>
                  <CommandGroup>
                    {substrates.map((substrate) => (
                      <CommandItem
                        value={substrate.label}
                        key={substrate.value}
                        onSelect={() => {
                          form.setValue("substrate", substrate.value);
                          setIsOpen(false);
                        }}
                      >
                        {substrate.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            substrate.value === field.value
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
