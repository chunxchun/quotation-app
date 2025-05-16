import { BASE_API_URL, BEARER_TOKEN } from "@/data/constants";
import { DailyReportImageResponse } from "@/types/DailyReportTypes";

export const getImageDimensions = async (
  image: File
): Promise<{ height: number; width: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async (event) => {
      const image = new Image();
      image.src = event.target?.result as string;
      await image.decode();
      resolve({ height: image.height, width: image.width });
    };
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });
};

export const postDailyReportImage = async (
  imageFile: File,
  imageDesc: string,
  reportDate: string,
  building: string,
  level: string,
  location: string,
  substrate: string,
  work: string
): Promise<DailyReportImageResponse> => {
  try {
    const formData = new FormData();
    const { height, width } = await getImageDimensions(imageFile);
    const [yyyy, mm, dd] = reportDate.split("-");

    formData.append("image_file", imageFile);
    formData.append("image_height", height.toString());
    formData.append("image_width", width.toString());
    formData.append("image_desc", imageDesc);
    formData.append("report_date", reportDate);
    formData.append("building", building);
    formData.append("level", level);
    formData.append("location", location);
    formData.append("substrate", substrate);
    formData.append("work", work);

    const fetchUrl = `${BASE_API_URL}/daily-reports/images/${yyyy}/${mm}/${dd}`;
    // const fetchUrl = `http://localhost:8787/api/daily-reports/images/${yyyy}/${mm}/${dd}`;
    // const fetchUrl = `http://localhost:8787/api/tests/form-data`;

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: formData,
    });

    const result: DailyReportImageResponse = await response.json(); // as DailyReportImageResponse;
    return result;
  } catch (err) {
    throw err;
  }
};
