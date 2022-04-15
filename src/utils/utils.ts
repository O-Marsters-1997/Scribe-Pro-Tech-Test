import moment, { Moment } from "moment";
/**
 * Values for dictionary
 */
export function values<V>(dict: { [key: string]: V; [key: number]: V }): V[] {
  return Object.keys(dict).map((key) => dict[key]);
}

/**
 * You can use this pattern with other parts of the type system to get type-safe lookups.
 */

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}

const dateToMoment = (Date: { date: number }): undefined | Moment => {
  if (Date && Date.date) {
    return moment(Date.date);
  }

  return undefined;
};

const timeToMoment = (Time?: { time: number }): undefined | Moment => {
  if (Time && Time.time) {
    return moment(Time.time);
  }

  return undefined;
};

export const dateTimeString = (
  date: string | null | number,
  time: string | null | number
): ScribePro.TextView => {
  return { display: date && time ? `${date} at ${time}` : null };
};

export const yearsAgo = (Date: { date: number }) => {
  const dateMoment = dateToMoment(Date);

  return moment().diff(dateMoment, "years").toString();
};

export const monthsFromNow = (value: number | string) => {
  const eventdate = moment(value);
  const todaysdate = moment();

  return `${eventdate.diff(todaysdate, "months")} months left`;
};

export const daysToNow = (value: number | string) => {
  const eventdate = moment(value);
  const todaysdate = moment();

  return `${moment(eventdate).format("D MM YY")} (${todaysdate.diff(
    eventdate,
    "days"
  )} day/s)`;
};

export const date = (value: number | string) => {
  const eventdate = moment(value);

  return moment(eventdate).format("MMMM D YYYY");
};

export const time = (value: number | string) => {
  const eventdate = moment(value);

  return moment(eventdate).format("HH:mm");
};

export const dateTimeElapsed = (value: number | string) => {
  const eventdate = moment(value);

  return moment(eventdate).fromNow();
};

export const dateTimeElapsedDays = (value: number | string) => {
  // get from-now for this date
  const fromNow = moment(value).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(value).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: "[Last] dddd",
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    // when the date is further away, use from-now functionality
    sameElse() {
      return "[" + fromNow + "]";
    },
  });
};

export const dayNumber = (value: string): string => {
  return moment(value).format("DD");
};

export const monthName = (value: string): string => {
  return moment(value).format("MMM");
};

export const mergeTimestampsTimeAndDate = (
  _timestampTime: number,
  timestampDate: number
): string => {
  return (
    moment(moment.unix(timestampDate).format("MM/DD/YYYY HH:mm:ss")).format(
      "YYYY MM DD"
    ) +
    " " +
    moment(moment.unix(timestampDate).format("MM/DD/YYYY HH:mm:ss")).format(
      "HH:mm:ss"
    )
  );
};

export const mergeTimeAndDate = (time: string, date: string): string => {
  // get from-now for this date
  return (
    moment(date).format("YYYY MM DD") + " " + moment(time).format("HH:mm:ss")
  );
};

export const momentDay = (Date: { date: number }) => {
  const dateMoment = dateToMoment(Date);

  if (dateMoment) {
    return dateMoment.format("DD");
  }

  return null;
};

export const momentMonth = (Date: { date: number }) => {
  const dateMoment = dateToMoment(Date);

  if (dateMoment) {
    return dateMoment.format("MMM");
  }

  return null;
};

export const momentTime = (value: moment.Moment) => {
  return value.format("HH:mm");
};

export const momentElapsedDayAtTime = (
  Date: { date: number },
  Time?: { time: number }
) => {
  const dateMoment = dateToMoment(Date);
  const timeMoment = timeToMoment(Time);

  if (dateMoment) {
    if (timeMoment) {
      return `${momentElapsedDay(dateMoment)} at ${momentTime(timeMoment)}`;
    }

    return `${momentElapsedDay(dateMoment)}`;
  }

  return undefined;
};

export const momentElapsedDay = (value: moment.Moment): string => {
  // get from-now for this date
  const fromNow = value.fromNow();

  // ensure the date is displayed with today and yesterday
  return value.calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: "[Last] dddd",
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    // when the date is further away, use from-now functionality
    sameElse() {
      return "[" + fromNow + "]";
    },
  });
};

export const momentElapsedDaysCount = (Date: { date: number }) => {
  const dateMoment = dateToMoment(Date);

  if (dateMoment) {
    return `${moment().diff(dateMoment, "days")}`;
  }

  return undefined;
};

export const momentInPast = (Date: { date: number }) => {
  const dateMoment = dateToMoment(Date);

  if (dateMoment) {
    return dateMoment.isBefore(moment().endOf("day"));
  }

  return undefined;
};

export const getAgeAtDateFromDOB = (date: number, dob: number) => {
  const age = moment(date).diff(moment(dob), "years", false);

  return age;
};

export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const stringWithTwoChars = /(.*[a-z]){2}/i;

export const bm = /(.*[1-9])/i;

export const validationRegEx = (value: string, regex: RegExp): boolean => {
  return regex.test(String(value).toLowerCase());
};

export const genericError = "Invalid";

export const formatPhoneNumber = (
  phoneNumber?: ScribePro.PhoneNumber
): string | null => {
  let fullPhoneNumber = null;
  if (phoneNumber && phoneNumber.value) {
    fullPhoneNumber = `${phoneNumber.prefix} ${phoneNumber.value}`;
  }

  return fullPhoneNumber;
};
