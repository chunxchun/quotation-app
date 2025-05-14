import { useState } from "react";
import PhotoDescriptionBuildingComboBox from "@/components/PhotoDescriptionBuildingComboBox";
import PhotoDescriptionLocationComboBox from "@/components/PhotoDescriptionLocationComboBox";
import PhotoDescriptionSubstrateComboBox from "@/components/PhotoDescriptionSubstrateComboBox";
import PhotoDescriptionWorkComboBox from "@/components/PhotoDescriptionWorkComboBox";

import { buildings, locations, substrates, works } from "@/data/combobox";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

export function LegacyDailyReportForm() {
  const [building, setBuilding] = useState("");
  const [location, setLocation] = useState("");
  const [substrate, setSubstrate] = useState("");
  const [work, setWork] = useState("");

  const formSchema = z.object({
    picture: z
      .instanceof(File)
      .refine((picture) => picture.size !== 0, "Please upload a picture"),
    // building: z.string(),
    // location: z.string(),
    // substrate: z.string(),
    // work: z.string(),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      picture: new File([""], ""),
      // building: "",
      // location: "",
      // substrate: "",
      // work: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log("on submit", values);
    const desc = `${building}${location}${substrate}${work}`;
    console.log(desc);

    const formData = new FormData();
    formData.append("image_desc", desc);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-stretch space-x-2 p-2">
          <FormField
            control={form.control}
            name="picture"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="picture">Picture</FormLabel>
                <Input id="picture" type="file" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-stretch space-x-2 p-2">
          <Label htmlFor="building combobox">Building</Label>
          <PhotoDescriptionBuildingComboBox
            buildings={buildings}
            value={building}
            setValue={setBuilding}
          />
        </div>
        <div className="flex items-center justify-stretch space-x-2 p-2">
          <Label htmlFor="location combobox">Location</Label>
          <PhotoDescriptionLocationComboBox
            locations={locations}
            value={location}
            setValue={setLocation}
          />
        </div>
        <div className="flex items-center justify-stretch space-x-2 p-2">
          <Label htmlFor="substrate combobox">Substrate</Label>
          <PhotoDescriptionSubstrateComboBox
            substrates={substrates}
            value={substrate}
            setValue={setSubstrate}
          />
        </div>
        <div className="flex items-center  justify-stretch space-x-2 p-2">
          <Label htmlFor="work combobox">Work</Label>
          <PhotoDescriptionWorkComboBox
            works={works}
            value={work}
            setValue={setWork}
          />
        </div>
        <div className="flex items-center  justify-center space-x-2 p-2">
          <Button type="submit">Submit</Button>
        </div>
        <Button type="button" onClick={() => console.log("click go")}>
          GO
        </Button>
      </form>
    </Form>
  );
}
