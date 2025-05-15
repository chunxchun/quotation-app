import { BASE_API_URL, BEARER_TOKEN, R2_URL } from "@/data/constants";
import type {
  DailyReportImage,
  DailyReportImageResponse,
} from "@/types/DailyReportTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "./DatePicker";

export function DailyReportImages() {
  const [dailyReport, setDailyReport] = useState<Array<DailyReportImage>>();
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!date) return;
    const parsedDate = date.toLocaleDateString("en-CA");
    const [yyyy, mm, dd] = parsedDate?.split("-");

    const fetchData = async () => {
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
    fetchData();
  }, [date]);

  return (
    <>
      <p>daily report images</p>
      <DatePicker date={date} setDate={setDate} />
      {/* <pre className="w-full text-wrap p-4">{JSON.stringify(dailyReport)}</pre> */}
      {dailyReport?.length ? (
        dailyReport.map((daily) => {
          return (
            <div key={daily.id} className="flex flex-col py-4">
              <p className="w-full text-wrap">{daily.desc}</p>
              <img src={`${R2_URL}/${daily.url}`} alt={daily.desc} />
              {/* <img src={`${BASE_API_URL}/api/${daily.url}`} alt={daily.desc} /> */}
            </div>
          );
        })
      ) : (
        <p>has not</p>
      )}
    </>
  );
}
