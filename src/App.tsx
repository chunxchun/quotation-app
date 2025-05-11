"use client";

import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import RequestQuotationForm from "@/components/RequestQuotationForm";
import PhotoDescriptionBuildingComboBox from "@/components/PhotoDescriptionBuildingComboBox";
import PhotoDescriptionLocationComboBox from "@/components/PhotoDescriptionLocationComboBox";
import PhotoDescriptionSubstrateComboBox from "@/components/PhotoDescriptionSubstrateComboBox";
import PhotoDescriptionWorkComboBox from "@/components/PhotoDescriptionWorkComboBox";

import { buildings, locations, substrates, works } from "@/data/combobox";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("unknown");
  const [building, setBuilding] = useState("");
  const [location, setLocation] = useState("");
  const [substrate, setSubstrate] = useState("");
  const [work, setWork] = useState("");

  const formSchema = z.object({
    picture: z
      .instanceof(File)
      .refine((picture) => picture.size !== 0, "Please upload a picture"),
    building: z.string(),
    location: z.string(),
    substrate: z.string(),
    work: z.string(),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      picture: new File([""], ""),
      building: "",
      location: "",
      substrate: "",
      work: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(`${building}${location}${substrate}${work}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vite + React + Cloudflare</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setCount((count) => count + 1)}
            aria-label="increment"
          >
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Button
            onClick={() => {
              fetch("/api/")
                .then((res) => res.json() as Promise<{ name: string }>)
                .then((data) => setName(data.name));
            }}
            aria-label="get name"
          >
            Name from API is: {name}
          </Button>
        </CardContent>
        <p>
          Edit <code>worker/index.ts</code> to change the name
        </p>
        <CardFooter>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </CardFooter>
      </Card>
      {/* <RequestQuotationForm /> */}
      <Card>
        <CardHeader>
          <CardTitle>Photo Description</CardTitle>
          <CardDescription>photo + desc</CardDescription>
        </CardHeader>
        <CardContent>
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
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            {building}
            {location}
            {substrate}
            {work}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default App;
