import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { KeyboardKey } from '@utils/const';
dayjs.extend(duration);

const getDurationToMilliseconds = (millisecond) => dayjs.duration(millisecond).$d;

const createFormatForDate = (date, format) => dayjs(date).format(format);

const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1);
const getLowerCaseFirstLetter = (type) => type[0].toLowerCase() + type.slice(1);

const getLeadingZero = (value) => String(value).padStart(2, '0');

const isEscapeEvent = (evt) => Object.values(KeyboardKey).includes(evt.key);

export {
  getDurationToMilliseconds,
  createFormatForDate,
  getUpperCaseFirstLetter,
  getLowerCaseFirstLetter,
  getLeadingZero,
  isEscapeEvent
};
