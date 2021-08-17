import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { KeyboardKey } from '@utils/const';
import Abstract from '@view/abstract';
dayjs.extend(duration);

const getDurationToMilliseconds = (millisecond) => dayjs.duration(millisecond).$d;

const createFormatForDate = (date, format) => dayjs(date).format(format);

const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1);
const getLowerCaseFirstLetter = (type) => type[0].toLowerCase() + type.slice(1);

const getLeadingZero = (value) => String(value).padStart(2, '0');

const isEscapeEvent = (evt) => Object.values(KeyboardKey).includes(evt.key);

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const updateItem = (items, update) => {
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

export {
  getDurationToMilliseconds,
  createFormatForDate,
  getUpperCaseFirstLetter,
  getLowerCaseFirstLetter,
  getLeadingZero,
  isEscapeEvent,
  remove,
  updateItem
};
