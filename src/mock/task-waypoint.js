import { TYPES, TOWNS, DESCRIPTIONS } from '@utils/const.js';
import { getRandomInteger } from '@utils/util.js';
import * as dayjs from 'dayjs';

const generateType = (advert) => {
  const randomIndex = getRandomInteger(0, advert.length - 1);
  return advert[randomIndex];
};

const getIcon = (eventType) => {
  const letter = eventType.toLowerCase();

  return `img/icons/${letter}.png`;
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};
console.log(generateDate());
const getPrice = () => {
  const value = getRandomInteger(1, 100);

  return value;
};

const getDescriptionText = () => {
  const descriptionContainer = [];
  const count = getRandomInteger(1, 5);

  for (let i = 0; i < count; i++) {
    const result = generateType(DESCRIPTIONS);
    descriptionContainer.push(result);
  }

  return descriptionContainer;
};

export const generatePoint = () => {
  const eventType = generateType(TYPES);
  const date = generateDate();
  const time = generateDate();

  return {
    type: eventType,
    town: generateType(TOWNS),
    date,
    icon: getIcon(eventType),
    time,
    price: getPrice(),
    descrtiption: getDescriptionText(),

  };
};


