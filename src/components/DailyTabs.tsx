import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DailyReportForm } from "@/components/DailyReportForm";
import { DailyReportImages } from "./DailyReportImages";

export function DailyTabs() {
  return (
    <Tabs defaultValue="get" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="post">Uploads</TabsTrigger>
        <TabsTrigger value="get">Downloads</TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <Card>
          <CardHeader>
            <CardTitle>Photo Description</CardTitle>
            <CardDescription>photo + desc</CardDescription>
          </CardHeader>
          <CardContent>
            <DailyReportForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="get">
        <Card>
          <CardHeader>
            <CardTitle>Get Daily Report </CardTitle>
            <CardDescription>photo + desc</CardDescription>
          </CardHeader>
          <CardContent>
            <DailyReportImages />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
