export const MAX_FILE_NUM = 5;
export const MAX_FILE_SIZE = MAX_FILE_NUM * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPE = ["image/jpg", "image/jpeg", "image/png"];

export const DEFAULT_DAILY_REPORT_FORM_VALUES = {
  files: [],
  desc: "",
  report_date: new Date(),
  building: "",
  level: "",
  location: "",
  substrate: "",
  work: "",
};
