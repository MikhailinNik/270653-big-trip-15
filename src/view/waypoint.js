import { DATE_FORMAT } from '@utils/const';
import { createFormatForDate, getDateFromMilliseconds, getDurationTime, createItem } from '@utils/util';

const createWaypointTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavourite,
    offers,
    type,
  } = point;

  const eventPrice = basePrice === null
    ? ''
    : basePrice;

  const eventType = type === null
    ? ''
    : type;

  const eventDate = dateFrom === null
    ? ''
    : createFormatForDate(dateFrom, DATE_FORMAT.MONTH_DAY);

  const firstDate = dateFrom === null
    ? ''
    : createFormatForDate(dateFrom, DATE_FORMAT.HOURS_MINUTE);

  const secondDate = dateTo === null
    ? ''
    : createFormatForDate(dateTo, DATE_FORMAT.HOURS_MINUTE);

  const millesecond = getDateFromMilliseconds(dateTo, dateFrom);
  const durationHour = getDurationTime(millesecond, DATE_FORMAT.HOUR);
  const durationMinute = getDurationTime(millesecond, DATE_FORMAT.MINUTE);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom.toISOString()}">
      ${eventDate}
      </time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event ${eventType} icon">
      </div>
      <h3 class="event__title">
      ${eventType} ${destination === null || destination.name === null
  ? ''
  : destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.toISOString()}">
          ${firstDate}
          </time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.toISOString()}">
          ${secondDate}
          </time>
        </p>
        <p class="event__duration">
        ${durationHour} H ${durationMinute} M
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">

        ${offers.map(({ title, price }) => `<li class="event__offer">
        <span class="event__offer-title">
  ${title === null
    ? ''
    : title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
  ${price === null
    ? ''
    : price}
        </span>
      </li>`).join('')}

      </ul>
      <button class="event__favorite-btn event__favorite-btn--${isFavourite}" type="button">
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

export default class Waypoint {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createWaypointTemplate(this._points);
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
