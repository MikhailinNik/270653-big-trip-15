import { generateAdvert, getPrice, form  } from '@mock/data';

export const createOfferContainer = () => {
  const { offers } = form;
  
  const randomOffer = generateAdvert(offers);


  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${randomOffer}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${getPrice()}</span>
      </label>
    </div>`
  );
};
