import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RenderPosition } from '@utils/const';

dayjs.extend(duration);

const createFormatForDate = (date, format) => dayjs(date).format(format);
const getDurationTime = (millisecond, dateFormat) => dayjs.duration(millisecond).format(dateFormat);

const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1);
const getLowerCaseFirstLetter = (type) => type[0].toLowerCase() + type.slice(1);

const getDateFromMilliseconds = (dateTo, dateFrom) => +dateTo - +dateFrom;

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


const createItem = (template) => {
  const newContainer = document.createElement('div');
  newContainer.innerHTML = template;

  return newContainer.firstChild;
};

const replaceItem = (place, toItem, fromItem) => place.replaceChild(toItem.getElement(), fromItem.getElement());

export {
  createFormatForDate,
  getUpperCaseFirstLetter,
  getLowerCaseFirstLetter,
  getDateFromMilliseconds,
  getDurationTime,
  render,
  createItem,
  replaceItem
};
