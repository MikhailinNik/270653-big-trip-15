import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DISABLED } from '@utils/const';
import { ACTIVE } from '@utils/const';

dayjs.extend(customParseFormat);

export const createPoint = (advert) => {
  const {
    date,
    icon,
    type,
    town,
    price,
    dateTo,
    dateFrom,
    offers,
    isFavourite,
    offerPrice,
  } = advert;

  const getFavouriteСlassName = () => {
    if (isFavourite) {
      return DISABLED;
    }

    return ACTIVE;
  };

  const dueDate = date !== null
    ? dayjs(date).format('MMM DD')
    : '';

  const toDate = dayjs(dateTo).format('HH:mm');
  const fromDate = dayjs(dateFrom).format('HH:mm');
  const duration = dayjs(toDate).diff(dayjs(fromDate, 'm'));

  const getListOffer = (offer, priceForOffer) => (
    `<li class="event__offer">
    <span class="event__offer-title">${offer}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${priceForOffer}</span>
  </li>`
  );

  const addOfferList = () => {

    const list = offers.length > 1
      ? offers.map((offer) => getListOffer(offer, offerPrice)).join('')
      : getListOffer(offers, offerPrice);

    return list;
  };

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dueDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${icon}" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${town}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${toDate}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${fromDate}</time>
        </p>
        <p class="event__duration">${duration}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${addOfferList()}
      </ul>
      <button class="event__favorite-btn event__favorite-btn--${getFavouriteСlassName()}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

