"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BuildingFormField } from "./form/BuildingFormField";
import { LocationFormField } from "./form/LocationFormField";
import { LevelFormField } from "./form/LevelFormField";
import { SubstrateFormField } from "./form/SubstrateFormField ";
import { WorkFormField } from "./form/WorkFormField ";
import { DescFormField } from "./form/DescFormField";
import { DateFormField } from "./form/DateFormField";
import { DEFAULT_DAILY_REPORT_FORM_VALUES, MAX_FILE_SIZE } from "@/data/form";
import { FileUploadFormField } from "./form/FileUploadFormField";
import { toast } from "sonner";
import { useState } from "react";
import { BASE_API_URL, BEARER_TOKEN } from "@/data/constants";
import { DailyReportImageResponse } from "@/types/DailyReportTypes";

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
      const formData = new FormData();

      const report_date = format(data.report_date, "yyyy-MM-dd");
      const [yyyy, mm, dd] = report_date.split("-");
      console.log('data', data);
      formData.append("image_file", data.files[0]);
      formData.append("image_desc", data.desc);
      formData.append("report_date", report_date);
      formData.append("building", data.building);
      formData.append("level", data.level);
      formData.append("location", data.location);
      formData.append("substrate", data.substrate);
      formData.append("work", data.work);

      for (const value of formData.entries()) {
        console.log(value[0], value[1]);
      }
      const fetchUrl = `${BASE_API_URL}/daily-reports/images/${yyyy}/${mm}/${dd}`;
      // const fetchUrl = `http://localhost:8787/api/daily-reports/images/${yyyy}/${mm}/${dd}`;
      // const fetchUrl = `http://localhost:8787/api/tests/form-data`;

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: formData,
      });

      const { success, message } =
        (await response.json()) as DailyReportImageResponse;

      if (success) {
        toast.success("fetch success", {
          description: message,
        });
      }

      setIsUploading(false);
      form.reset()
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
