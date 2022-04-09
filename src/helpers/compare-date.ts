import { DateType } from "../types/date";
export function isNewDay(lastDate: DateType, currDate: DateType) {
  if (lastDate.year < currDate.year) {
    return true;
  } else if (
    lastDate.year === currDate.year &&
    lastDate.month < currDate.month
  ) {
    return true;
  } else if (
    lastDate.year === currDate.year &&
    lastDate.month === currDate.month &&
    lastDate.date < currDate.date
  ) {
    return true;
  }

  return false;
}
