import { createItem } from '@/utils/dom';

export const createPointOfferTemplate = (offersForm) => offersForm.map(({ offers }) => (
  `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" 
      id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">
          ${offers.slice().map(({ title }) => title)}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
          ${offers.slice().map(({ price }) => price)}
        </span>
      </label>
  </div>`
)).join('');

export default class FormOffer {
  constructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createPointOfferTemplate(this._offers);
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
