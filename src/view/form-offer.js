export const getOffers = (checkedOffers, allOffers) =>
  allOffers.reduce((offers, currentOffer) => {
    const isChecked = checkedOffers.some(({ title, price }) =>
      title === currentOffer.offers[0].title &&
      price === currentOffer.offers[0].price,
    );

    offers.push({
      title: currentOffer.offers[0].title,
      price: currentOffer.offers[0].price,
      isChecked,
    });

    return offers;
  }, []);

export const createPointOfferTemplate = (offers) => offers.map(({ title, price, isChecked = false } = {}) => (
  `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" 
      id="event-offer-luggage-1"
      type="checkbox" name="event-offer-luggage"
      ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">
          ${title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
          ${price}
        </span>
      </label>
  </div>`
)).join('');
