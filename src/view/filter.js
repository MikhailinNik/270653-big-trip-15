import AbstractView from '@view/abstract';

const createFilterTemplate = (currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" 
      class="trip-filters__filter-input  visually-hidden" 
      type="radio" 
      name="trip-filter" 
      value="everything" checked>
    <label class="trip-filters__filter-label" 
    for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" 
      class="trip-filters__filter-input  visually-hidden" 
      type="radio" 
      name="trip-filter" 
      value="future">
    <label class="trip-filters__filter-label" 
    for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" 
      class="trip-filters__filter-input  visually-hidden" 
      type="radio" 
      name="trip-filter" 
      value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
);

export default class Filter extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilterType = currentFilterType;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setOnFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .querySelector('.trip-filters__filter-input')
      .addEventListener('change', this._onFilterTypeChange);
  }

  _onFilterTypeChange(evt) {
    evt.preventDefault();

    this._callback.filterTypeChange(evt.target.value);
  }
}
