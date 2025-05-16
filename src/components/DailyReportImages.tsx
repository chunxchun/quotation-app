import { BASE_API_URL, BEARER_TOKEN, R2_URL } from "@/data/constants";
import type {
  DailyReportImage,
  DailyReportImageResponse,
} from "@/types/DailyReportTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "./DatePicker";
import { Button } from "./ui/button";

export function DailyReportImages() {
  const [dailyReport, setDailyReport] = useState<Array<DailyReportImage>>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (!date) return;
    const parsedDate = date.toLocaleDateString("en-CA");
    const [yyyy, mm, dd] = parsedDate?.split("-");

    try {
      const fetchUrl = `${BASE_API_URL}/daily-reports/images/${yyyy}/${mm}/${dd}`;
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      const { success, message, results } =
        (await response.json()) as DailyReportImageResponse;
      if (success) {
        toast.success("fetch success", {
          description: message,
        });
      }
      setDailyReport(results);
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  };

  const deleteImage = async (url: string) => {
    console.log("delete", url);
    setIsFetching(true);
    try {
      const fetchUrl = `${BASE_API_URL}/daily-reports/images/${url}`;
      const response = await fetch(fetchUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      const { success, message } =
        (await response.json()) as DailyReportImageResponse;

      if (success) {
        toast.success(`success delete image`, { description: message });
      }
      fetchData();
      setIsFetching(false);
    } catch (err) {
      toast.error(JSON.stringify(err));
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <>
      <h2 className="w-full py-4">daily report images</h2>
      <DatePicker date={date} setDate={setDate} />

      {dailyReport?.length ? (
        dailyReport.map((daily) => {
          return (
            <div key={daily.id} className="flex flex-col py-4">
              <p className="w-full text-wrap">{daily.desc}</p>
              <p className="w-full text-wrap">{`${daily.building}${daily.level} ${daily.location}${daily.substrate}${daily.work}`}</p>

              <img
                className=" aspect-square object-cover"
                src={`${R2_URL}/${daily.url}`}
                alt={daily.desc}
              />

              <Button
                variant="destructive"
                className="m-4 w-1/2 self-center"
                onClick={() => deleteImage(encodeURIComponent(daily.url))}
                disabled={isFetching}
              >
                Delete
              </Button>
              {/* </div> */}
              {/* <img src={`${BASE_API_URL}/api/${daily.url}`} alt={daily.desc} /> */}
            </div>
          );
        })
      ) : (
        <p className="w-full text-wrap py-4">
          {date
            ? `No images found in ${date.toLocaleDateString("en-HK")}`
            : `no specified date`}
        </p>
      )}
    </>
  );
}
