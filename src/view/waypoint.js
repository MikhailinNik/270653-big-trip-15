import { DATE_FORMAT, createFormatForDate, getDurationTime } from '@utils/const';

export const createWaypointTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavourite,
    offers,
    type,
  } = point;

  const isBasePrice = basePrice === null
    ? ''
    : basePrice;

  const isType = type === null
    ? ''
    : type;

  const isDateFrom = dateFrom === null
    ? ''
    : createFormatForDate(dateFrom, DATE_FORMAT.MONTH_DAY);

  const firstDate = dateFrom === null
    ? ''
    : createFormatForDate(dateFrom, DATE_FORMAT.HOURS_MINUTE);

  const secondDate = dateFrom === null
    ? ''
    : createFormatForDate(dateTo, DATE_FORMAT.HOURS_MINUTE);


  const duration = getDurationTime(secondDate, firstDate);


  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">
      ${isDateFrom}
      </time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${isType}.png" alt="Event ${isType} icon">
      </div>
      <h3 class="event__title">
      ${isType} ${destination === null ? '' : destination.description}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">
          ${firstDate}
          </time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">
          ${secondDate}
          </time>
        </p>
        <p class="event__duration">
        ${duration}
        M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${isBasePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">

        ${offers.map(({ title, price }) => `<li class="event__offer">
        <span class="event__offer-title">
          ${title === null ? '' : title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
          ${price === null ? '' : price}
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

