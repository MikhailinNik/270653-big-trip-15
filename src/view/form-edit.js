import { getOffers, createPointOfferTemplate } from '@view/form-offer';
import { createPointTypeTemplate } from '@view/form-edit-type';
import { createDestinationTemplate } from '@view/form-edit-destination';
import { FormMode, DateFormat, ButtonText } from '@utils/const';
import SmartView from '@/view/smart';
import { formatDate } from '@utils/util';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const getBlankPoint = () => ({
  type: 'taxi',
  basePrice: 50,
  destination: null,
  offers: [],
  dateFrom: new Date(),
  dateTo: new Date(),
  isFavourite: false,
});

export const createPointFormTemplate = (data, pointTypeToOffers = {}, destinations = []) => {

  const {
    type = '',
    destination = {
      name: '',
      description: '',
      photos: [],
    },
    dateFrom = null,
    dateTo = null,
    basePrice = 0,
    offers,
    isEdit,
  } = data;

  const hasDescription = destination.name !== '';
  const renderOffers = getOffers(offers, pointTypeToOffers[data.type] || []);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17"
            src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${createPointTypeTemplate(type)}
              </fieldset>
            </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text"
        name="event-destination"
        value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${destinations.map(({ name }) => `<option value="${name}">${name}</option>`).join('')}

        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${formatDate(dateFrom, DateFormat.DATE_TIME)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${formatDate(dateTo, DateFormat.DATE_TIME)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price"
            id="event-price-1" type="number"
            name="event-price" min="0"
            value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isEdit ? ButtonText.DELETE : ButtonText.CANCEL}</button>
    ${isEdit
      ? (
        `<button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`
      ) : ''}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createPointOfferTemplate(renderOffers)}
          </div>
        </section>
        ${hasDescription ? createDestinationTemplate(destination) : ''}
      </section>
    </form>
  </li>`);
};

export default class FormEdit extends SmartView {
  constructor(point = getBlankPoint(), destinations = [], offers = {}, mode = FormMode.EDIT) {
    super();

    this._data = {
      ...point,
      isEdit: mode === FormMode.EDIT,
    };

    this._destinations = destinations;
    this._offers = offers;
    this._flatpickerDateFrom = null;
    this._flatpickerDateTo = null;

    this._onTypeGroupChange = this._onTypeGroupChange.bind(this);
    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onEventEditSubmit = this._onEventEditSubmit.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
    this._onDateFromChange = this._onDateFromChange.bind(this);
    this._onDateToChange = this._onDateToChange.bind(this);

    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  getTemplate() {
    return createPointFormTemplate(this._data, this._offers, this._destinations);
  }

  setOnRollupClick(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._onRollupButtonClick);
  }

  setOnFormSubmit(callback) {
    this._callback.submit = callback;

    this.getElement()
      .querySelector('.event--edit')
      .addEventListener('submit', this._onEventEditSubmit);
  }

  setOnDeleteClick(callback) {
    this._callback.deleteClick = callback;

    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._onDeleteClick);
  }

  restoreHandlers() {
    this._setDateFromPicker();
    this._setDateToPicker();
    this._setInnerHandlers();

    this.setOnRollupClick(this._callback.click);
    this.setOnFormSubmit(this._callback.submit);
    this.setOnDeleteClick(this._callback.deleteClick);
  }

  removeElement() {
    super.removeElement();

    if (this._flatpickerDateFrom !== null) {
      this._flatpickerDateFrom.destroy();
      this._flatpickerDateFrom = null;
    }

    if (this._flatpickerDateTo !== null) {
      this._flatpickerDateTo.destroy();
      this._flatpickerDateTo = null;
    }
  }

  _setDateFromPicker() {
    if (this._flatpickerDateFrom !== null) {
      this._flatpickerDateFrom.destroy();
      this._flatpickerDateFrom = null;
    }

    this._flatpickerDateFrom = flatpickr(
      this.getElement()
        .querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        minDate: this._data.dateFrom,
        onChange: this._onDateFromChange,
      },
    );
  }

  _setDateToPicker() {
    if(this._flatpickerDateTo !== null) {
      this._flatpickerDateTo.destroy();
      this._flatpickerDateTo = null;
    }

    this._flatpickerDateTo = flatpickr(
      this.getElement()
        .querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        maxDate: this._data.dateTo,
        onChange: this._onDateToChange,
      },
    );
  }

  _setInnerHandlers() {
    const element = this.getElement();

    const destinationInput = element.querySelector('.event__input--destination');

    destinationInput.addEventListener('focus', (evt) => {
      const target = evt.target;

      target.placeholder = target.value;
      target.value = '';

      destinationInput.addEventListener('blur', () => {
        if (target.value.length === 0) {
          target.value = target.placeholder;
        }
      }, {once: true});
    });

    destinationInput.addEventListener('input', (evt) => {
      const newDestinationName = evt.target.value;
      const destination = this._destinations.find(({ name }) => name === newDestinationName);

      if (!destination) {
        evt.target.value = '';
        return;
      }

      this.updateData({ destination }, false);
    });

    element
      .querySelector('.event__type-group')
      .addEventListener('change', this._onTypeGroupChange);

    element
      .querySelector('.event__input--price')
      .addEventListener('change', this._onPriceChange);
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  _onEventEditSubmit(evt) {
    evt.preventDefault();

    const point = FormEdit.parseDataToPoint(this._data);

    const selectedOfferInputs = this.getElement().querySelectorAll('.event__offer-checkbox:checked');
    point.offers = Array.from(selectedOfferInputs).map(({ name, value }) => ({
      title: name,
      price: +value,
    }));

    this._callback.submit(point);
  }

  _onDeleteClick(evt) {
    evt.preventDefault();

    const point = {...this._data};

    this._callback.deleteClick(point);
  }

  _onTypeGroupChange(evt) {
    if (evt.target.classList.contains('event-type-toggle')) {
      return;
    }

    this.updateData({ type: evt.target.value }, false);
  }

  _onPriceChange(evt) {
    const price = evt.target.valueAsNumber;

    this.updateData({
      basePrice: price,
    }, false);
  }

  _onDateFromChange([userDate]) {
    this._flatpickerDateFrom.set('minDate', userDate);

    this.updateData({
      dateFrom: userDate,
    }, true);
  }

  _onDateToChange([userDate]) {
    this._flatpickerDateTo.set('maxDate', userDate);

    this.updateData({
      dateTo: userDate,
    }, true);
  }

  static parseDataToPoint({
    ...point
  }) {
    return point;
  }
}
