import moment from "moment-timezone";

export default function formatTime(datetime, timezone) {
  const time = moment(datetime);
  const dateTime = time.tz(timezone).format("DD MMM YYYY, HH:mm z");
  return dateTime;
}
