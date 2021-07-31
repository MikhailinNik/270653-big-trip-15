import { createPoint } from '@view/waypoint';

export const createList = () => (
  `<ul class="trip-events__list">
      ${createPoint()}
      ${createPoint()}
      ${createPoint()}
  </ul>`
);
