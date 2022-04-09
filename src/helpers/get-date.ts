import { DateType } from "../types/date";

export function getDate(): DateType {
  var today = new Date();

  const date: DateType = {
    date: today.getUTCDate(),
    month: today.getUTCMonth(),
    year: today.getUTCFullYear(),
  };
  return date;
}
