"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DEFAULT_DAILY_REPORT_FORM_VALUES, MAX_FILE_SIZE } from "@/data/form";
import { postDailyReportImage } from "@/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { BuildingFormField } from "./form/BuildingFormField";
import { DateFormField } from "./form/DateFormField";
import { DescFormField } from "./form/DescFormField";
import { FileUploadFormField } from "./form/FileUploadFormField";
import { LevelFormField } from "./form/LevelFormField";
import { LocationFormField } from "./form/LocationFormField";
import { SubstrateFormField } from "./form/SubstrateFormField ";
import { WorkFormField } from "./form/WorkFormField ";

const formSchema = z.object({
  files: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(5, "Please select up to 5 files")
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
  desc: z.string(),
  report_date: z.date(),
  building: z.string(),
  level: z.string(),
  location: z.string(),
  substrate: z.string(),
  work: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function DailyReportForm() {
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_DAILY_REPORT_FORM_VALUES,
  });

  const onSubmit = async (data: FormValues) => {
    setIsUploading(true);

    try {

      const report_date = format(data.report_date, "yyyy-MM-dd");
      const imageFiles = data.files;
      const postResponses = imageFiles.map((file) =>
        postDailyReportImage(
          file,
          data.desc,
          report_date,
          data.building,
          data.level,
          data.location,
          data.substrate,
          data.work
        )
      );

      const results = await Promise.all(postResponses);
      console.log(results);
  
      toast.success(`post success`, {
        description: `success post ${imageFiles.length} daily report image `,
      });
      
      setIsUploading(false);
      form.reset();
    } catch (err) {
      toast(`error: ${err}`);
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* date */}
        <DateFormField form={form} />
        {/* file upload */}
        <FileUploadFormField form={form} />
        {/* desc */}
        <DescFormField form={form} />
        {/* building */}
        <BuildingFormField form={form} />
        {/* level */}
        <LevelFormField form={form} />
        {/* location */}
        <LocationFormField form={form} />
        {/* substrate */}
        <SubstrateFormField form={form} />
        {/* work */}
        <WorkFormField form={form} />
        <Button type="submit" className="mt-4" disabled={isUploading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
