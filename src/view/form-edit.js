import { getOffers, createPointOfferTemplate } from '@view/form-offer';
import { createPointTypeTemplate } from '@view/form-edit-type';
import { createDestinationTemplate } from '@view/form-edit-destination';
import { FormMode } from '@utils/const';
import SmartView from '@/view/smart';
import { createFormatForDate } from '@utils/util';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';


export const createPointFormTemplate = (data, pointTypeToOffers = [], destinations = []) => {

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
          ${destinations.map(({ name }) => `<option value="${name}">${name}</option>`).join(' ')}
        
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${createFormatForDate(dateFrom, 'DD/MM/YYYY hh:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${createFormatForDate(dateTo, 'DD/MM/YYYY hh:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="0" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
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
  constructor(point, destinations, offers, mode = FormMode.EDIT) {
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
    this._onRollUpButtonClick = this._onRollUpButtonClick.bind(this);
    this._onEventEditSubmit = this._onEventEditSubmit.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onDateFromChange = this._onDateFromChange.bind(this);
    this._onDateToChange = this._onDateToChange.bind(this);

    this._setInnerHandlers();
    this._setDateFrompicker();
    this._setDateTopicker();
  }

  getTemplate() {
    return createPointFormTemplate(this._data, this._offers, this._destinations);
  }

  setOnClick(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._onRollUpButtonClick);
  }

  setOnFormSubmit(callback) {
    this._callback.submit = callback;
    this.getElement()
      .querySelector('.event--edit')
      .addEventListener('submit', this._onEventEditSubmit);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setOnClick(this._callback.click);
    this.setOnFormSubmit(this._callback.submit);
  }

  _setDateFrompicker() {
    if(this._flatpickerDateFrom) {
      this._flatpickerDateFrom.destroy();
      this._flatpickerDateFrom = null;
    }

    this._flatpickerDateFrom = flatpickr(
      this.getElement()
        .querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/Y h:i',
        minDate: this._data.dateFrom,
        onChange: this._onDateFromChange,
      },
    );
  }

  _setDateTopicker() {
    if(this._flatpickerDateTo) {
      this._flatpickerDateTo.destroy();
      this._flatpickerDateTo = null;
    }

    this._flatpickerDateTo = flatpickr(
      this.getElement()
        .querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/Y h:i',
        maxDate: this._data.dateTo,
        onChange: this._onDateToChange,
      },
    );
  }

  _onRollUpButtonClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _setInnerHandlers() {
    const template = this.getElement();

    template
      .querySelector('.event__type-group')
      .addEventListener('change', this._onTypeGroupChange);

    template
      .querySelector('.event__input--destination')
      .addEventListener('change', this._onDestinationChange);
  }

  _onEventEditSubmit(evt) {
    evt.preventDefault();

    const point = {...this._data};

    delete point.isEdit;
    delete point.renderOffers;

    this._callback.submit(point);
  }

  _onTypeGroupChange(evt) {
    if (evt.target.classList.contains('event-type-toggle')) {
      return;
    }

    this.updateData({ type: evt.target.value }, false);
  }

  _onDestinationChange(evt) {
    evt.preventDefault();

    const name = evt.target.value;
    const destination = this._destinations.find((obj) => obj.name === name);

    if (!destination) {
      return;
    }

    this.updateData({ destination }, true);
  }

  _onDateFromChange([userDate]) {
    this.updateData({
      dateFrom: this._flatpickerDateFrom.set('minDate', userDate),
    }, false);
  }

  _onDateToChange([userDate]) {
    this.updateData({
      dateTo: this._flatpickerDateTo.set('maxDate', userDate),
    }), false;
  }
}
