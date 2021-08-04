import dayjs from 'dayjs';
import { ZERO } from '@utils/const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createFormatForDate = (date, format) => dayjs(date).format(format);

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

const getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);

const getDurationTime = (dateTo, dateFrom) => {
  const result = getDate(dateTo) - getDate(dateFrom);

  const hours = ((result / 3600000));
  const minutes = (((result % 86400000) % 3600000) / 60000);

  const isHours = `${hours < 10 ? ZERO + hours : hours}`;
  const isMinutes = `${minutes < 10 ? ZERO + minutes : minutes}`;

  return `${isHours}:${isMinutes}`;
};

export {
  getRandomInteger,
  createFormatForDate,
  capitalizeFirstLetter,
  getDate,
  getDurationTime
};
