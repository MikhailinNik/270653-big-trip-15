export const getOffers = (checkedOffers, typeOffers) => {
  const offers = checkedOffers.map((offer) => ({ ...offer, isChecked: true }));

  typeOffers.forEach(( offer ) => {
    const checked = checkedOffers.some(({ title, price }) =>
      title === offer.title &&
      price === offer.price,
    );

    if (!checked) {
      offers.push({ ...offer, isChecked: true });
    }
  });

  return offers;
};

export const createPointOfferTemplate = (offers) => offers.map(({ title, price, isChecked = false } = {}) => (
  `<div class="event__offer-selector">
      <input
      class="event__offer-checkbox  visually-hidden" 
      id="event-offer-luggage-1"
      type="checkbox"
      name="event-offer-luggage"
      ${isChecked ? 'checked' : ''}
    >
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
