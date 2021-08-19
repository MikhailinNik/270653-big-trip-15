import AbstractView from '@view/abstract';
import { SortType } from '@utils/const';

const createPointSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DEFAULT}">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" >
    <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME}">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}" >Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`
);

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._onTypeChange = this._onTypeChange.bind(this);
  }

  getTemplate() {
    return createPointSortTemplate();
  }

  _onTypeChange(evt) {
    evt.preventDefault();
    const inputTypes = document.querySelectorAll('.trip-sort__input');
    const currentType = evt.target.previousElementSibling;

    inputTypes.forEach((input) => input.removeAttribute('checked'));
    currentType.setAttribute('checked', 'checked');

    this._callback.click(evt.target.dataset.sortType);
  }

  setOnTypeChange(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._onTypeChange);
  }
}
