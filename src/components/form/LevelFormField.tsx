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

import { levels } from "@/data/combobox";
import { useState } from "react";
export function LevelFormField({ form }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="level"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4 w-full">
          <FormLabel>Level</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            {" "}
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
                    ? levels.find((level) => level.value === field.value)?.label
                    : "Select level"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search level..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No level found</CommandEmpty>
                  <CommandGroup>
                    {levels.map((level) => (
                      <CommandItem
                        value={level.label}
                        key={level.value}
                        onSelect={() => {
                          form.setValue("level", level.value);
                          setIsOpen(false);
                        }}
                      >
                        {level.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            level.value === field.value
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
