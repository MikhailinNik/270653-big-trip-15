import { dayjs, getLeadingZero, createFormatForDate } from '@utils/util';
import { createElement } from '@utils/dom';
import { DATE_FORMAT } from '@utils/const';

const createWaypointTemplate = (point) => {
  const {
    basePrice = 0,
    dateFrom = null,
    dateTo = null,
    destination = [],
    isFavourite = false,
    offers = [],
    type = '',
  } = point;

  const formatDuration = () => {
    const { days, hours, minutes } = dayjs.duration(dateTo - dateFrom).$d;

    if (days > 0) {
      return `${getLeadingZero(days)}D ${getLeadingZero(hours)}H ${getLeadingZero(minutes)}M`;
    }

    if (hours > 0) {
      return `${getLeadingZero(hours)}H ${getLeadingZero(minutes)}M`;
    }

    return minutes > 0 ? `${getLeadingZero(minutes)}M` : '';
  };

  const getTypeTemplate = (eventType) => (
    `<div class="event__type">
      <img class="event__type-icon"
      width="42" height="42"
      src="img/icons/${eventType}.png"
      alt="Event ${eventType} icon">
    </div>`
  );

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom.toISOString()}">
        ${createFormatForDate(dateFrom, DATE_FORMAT.MONTH_DAY)}
        </time>
        ${getTypeTemplate(type)}
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.toISOString()}">
          ${createFormatForDate(dateFrom, DATE_FORMAT.HOURS_MINUTE)}
          </time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.toISOString()}">
          ${createFormatForDate(dateTo, DATE_FORMAT.HOURS_MINUTE)}
          </time>
        </p>
        <p class="event__duration">
        ${formatDuration()}
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map(({ title, price }) => `<li class="event__offer">
        <span class="event__offer-title">
        ${title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
        ${price}
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
  </li>`
  );
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
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
