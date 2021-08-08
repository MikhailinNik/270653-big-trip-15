import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const createFormatForDate = (date, format) => dayjs(date).format(format);
const getDurationTime = (millisecond, dateFormat) => dayjs.duration(millisecond).format(dateFormat);

const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1);
const getLowerCaseFirstLetter = (type) => type[0].toLowerCase() + type.slice(1);

const getDateFromMilliseconds = (dateTo, dateFrom) => +dateTo - +dateFrom;

export {
  createFormatForDate,
  getUpperCaseFirstLetter,
  getLowerCaseFirstLetter,
  getDateFromMilliseconds,
  getDurationTime
};
