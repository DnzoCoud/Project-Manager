import moment from "moment";

export class DateUtilities {
  static toShortString(dateStr: string) {
    return moment(dateStr, "D/M/YYYY, h:mm:ss a").format("D MM, YYYY");
  }
}
