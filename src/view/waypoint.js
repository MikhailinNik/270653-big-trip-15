import { createWaypointDateTemplate } from '@view/waypoint-date';
import AbstarctView from '@/view/abstract';

const createWaypointTemplate = (point) => {
  const {
    basePrice = 0,
    isFavourite = false,
    offers = [],
  } = point;

  const hasActiveButton = isFavourite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
    ${createWaypointDateTemplate(point)}
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
      <button class="event__favorite-btn ${hasActiveButton}" type="button">
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

export default class Waypoint extends AbstarctView{
  constructor(points) {
    super();
    this._points = points;

    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onFavouriteButtonClick = this._onFavouriteButtonClick.bind(this);
  }

  getTemplate() {
    return createWaypointTemplate(this._points);
  }

  setOnEditClick(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._onRollupButtonClick);
  }

  setOnFavouritePointClick(callback) {
    this._callback.favouriteClick = callback;
    this.getElement()
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this._onFavouriteButtonClick);
  }

  _onFavouriteButtonClick(evt) {
    evt.preventDefault();
    this._callback.favouriteClick();
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
