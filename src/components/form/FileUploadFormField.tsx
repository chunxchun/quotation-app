import { CloudUpload, X } from "lucide-react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import type { FormFieldProps } from "@/types/FormTypes";
import { MAX_FILE_SIZE } from "@/data/form";

export function FileUploadFormField({ form }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="files"
      render={({ field }) => (
        <FormItem className="flex flex-col py-4">
          <FormLabel>Photos</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={5}
              maxSize={MAX_FILE_SIZE}
              onFileReject={(_, message) => {
                form.setError("files", {
                  message,
                });
              }}
              multiple
            >
              <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                <CloudUpload className="size-4" />
                Drag and drop or
                <FileUploadTrigger asChild>
                  <Button variant="link" size="sm" className="p-0">
                    choose files
                  </Button>
                </FileUploadTrigger>
                to upload
              </FileUploadDropzone>
              <FileUploadList>
                {field.value.map((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
