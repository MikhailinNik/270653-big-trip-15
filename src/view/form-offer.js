import { offers } from '@mock/data1';

export const createPointOfferTemplate = () => offers.map(({ offers }) => (
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

