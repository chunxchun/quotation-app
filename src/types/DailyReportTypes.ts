export type DailyReportImage = {
  date: string;
  id: string;
  desc: string;
  building: string;
  level: string;
  location: string;
  substrate: string;
  work: string;
  url: string;
  created_at: string;
  updated_at: string;
};

export type DailyReport = {
  date: string;
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  weather_summary: string;
}

export type DailyReportImageResponse = {
  success: boolean;
  message: string;
  results: Array<DailyReportImage>;
};