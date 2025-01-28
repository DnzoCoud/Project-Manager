import moment from "moment";

export class DateUtilities {
  static toShortString(dateStr: string) {
    moment.locale("es");
    return moment(dateStr).format("DD, MMMM [de] YYYY");
  }
}
