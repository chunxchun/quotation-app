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

      {/* uploads */}
      <TabsContent value="post">
        <Card>
          <CardHeader>
            <CardTitle>Post Daily Report Photos</CardTitle>
            <CardDescription>Photo + Description</CardDescription>
          </CardHeader>
          <CardContent>
            <DailyReportForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      {/* downloads */}
      <TabsContent value="get">
        <Card>
          <CardHeader>
            <CardTitle>Get Daily Report Photos</CardTitle>
            <CardDescription>Photo + Description</CardDescription>
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
