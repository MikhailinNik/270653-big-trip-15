
import { getPrice, form  } from '@mock/task-waypoint';

export const createOfferContainer = () => {
  const { offer } = form;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${getPrice()}</span>
      </label>
    </div>`
  );
};
