import { createPoint } from '@view/waypoint';
import { createForm } from '@view/form-edit';
import { generatePoint } from '@mock/data';

const POINT_COUNT = 15;

const adverts = new Array(POINT_COUNT).fill().map(generatePoint);

const addPoint = () => {
  const advert = [];

  for (let i = 0; i < POINT_COUNT; i++) {
    advert.push(createPoint(adverts[i]));
  }

  return advert.join('');
};

export const createList = () => (
  `<ul class="trip-events__list">
      ${createForm()}
      ${addPoint()}
  </ul>`
);
