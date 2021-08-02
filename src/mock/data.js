import { TYPES, TOWNS, DESCRIPTIONS, OPTIONS, PLUG } from '@utils/const';
import { getRandomInteger } from '@utils/util';
import * as dayjs from 'dayjs';


const generateAdvert = (adverts) => {
  const randomIndex = getRandomInteger(0, adverts.length - 1);
  return adverts[randomIndex];
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

/*
const generateDateTime = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 3600;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'h').toDate();
};
*/
const getPrice = () => {
  const value = getRandomInteger(1, 100);

  return value;
};


const getRandomArrayLength = (value, adverts) => {
  const container = [];
  const count = getRandomInteger(1, value);

  for (let i = 0; i < count; i++) {
    const result = generateAdvert(adverts);
    container.push(result);
  }

  return container;
};

const getPhotoContainer = () => {
  const container = [];
  const count = getRandomInteger(1, 5);

  for (let i = 0; i < count; i++) {
    const advert = `http://picsum.photos/248/152?r=${Math.random(10)}`;
    container.push(advert);
  }
  return container.join('   ');
};

const generateForm = () => ({
  descriptions: getRandomArrayLength(5, DESCRIPTIONS),
  photos: getPhotoContainer(),
  offers: OPTIONS,
  isChecked: Boolean(getRandomInteger(0, 1)),
});
const form = generateForm();
console.log(generateForm());

export const generatePoint = () => {
  const eventType = generateAdvert(TYPES);

  return {
    type: eventType,
    town: generateAdvert(TOWNS),
    date: generateDate(),
    icon: getIcon(eventType),
    dateTo: generateDate(),
    dateFrom: generateDate(),
    price: getPrice(),
    // добавить offerPrice в offer, чтобы была другая сумма
    offerPrice: getPrice(),
    offers: getRandomArrayLength(2, OPTIONS),
    isFavourite: Boolean(getRandomInteger(0, 1)),

  };
};


export {
  generateAdvert,
  getPrice,
  form
};
