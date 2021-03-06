import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { KeyboardKey } from '@utils/const';
import Abstract from '@view/abstract';
dayjs.extend(duration);

const ESCAPE_KEYS = Object.values(KeyboardKey);

const getDurationToMilliseconds = (millisecond) => dayjs.duration(millisecond).$d;

const formatDate = (date, format) => dayjs(date).format(format);

const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1);
const getLowerCaseFirstLetter = (type) => type[0].toLowerCase() + type.slice(1);

const getLeadingZero = (value) => String(value).padStart(2, '0');

const isEscapeEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const updateItemById = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getPointDuration = (point) => point.dateTo - point.dateFrom;

const getTimeForSort = (firstPoint, secondPoint) => {
  const firstDate = getPointDuration(firstPoint);
  const secondDate = getPointDuration(secondPoint);

  return secondDate - firstDate;
};

const getPriceForSort = (firstPrice, secondPrice) => secondPrice.basePrice - firstPrice.basePrice;

const getDifferentDate = (end, start) => dayjs(end).diff(start);

export const sortTimeUp = (pointA, pointB) => pointA.dateFrom - pointB.dateFrom;

export {
  getDurationToMilliseconds,
  formatDate,
  getUpperCaseFirstLetter,
  getLowerCaseFirstLetter,
  getLeadingZero,
  isEscapeEvent,
  remove,
  updateItemById,
  getTimeForSort,
  getPriceForSort,
  getDifferentDate,
  getPointDuration
};
