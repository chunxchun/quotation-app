import { useEffect, useState } from "react";

export function DailyReportImages() {
  const [dailyReport, setDailyReport] = useState<unknown>();
  useEffect(() => {
    const getData = async () => {
      try {
        // const fetchUrl = `http://localhost:8787/api/daily-reports/images/${yyyy}/${mm}/${dd}`
        const fetchUrl = `https://hono-weather-fetcher.find2meals.workers.dev/api/daily-reports/images/2025/02/03`;
        console.log("start fetch");
        const response = await fetch(fetchUrl, {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: "Bearer joerogan",
            Accept: "*/*",
            Host: "https://quotation-app.find2meals.workers.dev",
          },
        });
        console.log(response);
        setDailyReport(response);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <p>daily report images</p>
      <pre>{JSON.stringify(dailyReport)}</pre>
    </>
  );
}
