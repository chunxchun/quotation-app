import { UseFormReturn } from "react-hook-form";

export type FormFieldProps = {
  form: UseFormReturn<
    {
      building: string;
      desc: string;
      files: File[];
      report_date: Date;
      level: string;
      location: string;
      substrate: string;
      work: string;
    },
    any,
    {
      building: string;
      desc: string;
      files: File[];
      report_date: Date;
      level: string;
      location: string;
      substrate: string;
      work: string;
    }
  >;
};
