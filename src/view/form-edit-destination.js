import { createItem } from '@/utils/util';

export const createDestinationTemplate = (destination) => (
  `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
  ${destination.description === null
    ? ''
    : destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
  ${destination.pictures === null
    ? ''
    : destination.pictures.map(({ src, description }) => `<img class="event__photo"
      src="${src === null
    ? ''
    : src}"
        alt="${description === null
    ? ''
    : description}">`).join('')}
        </div>
      </div>`
);


export default class FormEditDestination {
  constructor(destination) {
    this._destination = destination;
    this._element = null;
  }

  getTemplate() {
    return createDestinationTemplate(this._destination);
  }

  getElement() {
    if (!this._element) {
      this._element = createItem(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
