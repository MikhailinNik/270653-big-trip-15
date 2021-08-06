import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { renderTemplatePosition } from '@utils/const';

dayjs.extend(duration);

const createFormatForDate = (date, format) => dayjs(date).format(format);
const getDurationTime = (millisecond, dateFormat) => dayjs.duration(millisecond).format(dateFormat);

const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1);
const getLowerCaseFirstLetter = (type) => type[0].toLowerCase() + type.slice(1);

const getDateFromMilliseconds = (dateTo, dateFrom) => +dateTo - +dateFrom;

const renderTemplateElement = (container, element, place) => {
  switch (place) {
    case renderTemplatePosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderTemplatePosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export {
  createFormatForDate,
  getUpperCaseFirstLetter,
  getLowerCaseFirstLetter,
  getDateFromMilliseconds,
  getDurationTime,
  renderTemplateElement,
  renderTemplate,
  createElement
};
