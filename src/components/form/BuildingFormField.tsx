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
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types/FormTypes";
import { Check, ChevronsUpDown } from "lucide-react";

import { buildings } from "@/data/combobox";
import { useState } from "react";
export function BuildingFormField({ form }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="building"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4 w-full">
          <FormLabel>Building</FormLabel>
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
                    ? buildings.find(
                        (building) => building.value === field.value
                      )?.label
                    : "Select building"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search building..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No building found</CommandEmpty>
                  <CommandGroup>
                    {buildings.map((building) => (
                      <CommandItem
                        value={building.label}
                        key={building.value}
                        onSelect={() => {
                          form.setValue("building", building.value);
                          setIsOpen(false);
                        }}
                      >
                        {building.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            building.value === field.value
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
