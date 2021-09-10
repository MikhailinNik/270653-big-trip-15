import AbstractView from '@view/abstract';

const isChecked = (type, currentFilterType) => type === currentFilterType ? 'checked' : '';

const createFilterTemplate = (filter, currentFilterType) => {
  const { type } = filter;
  return (
    `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value=${type} ${isChecked(type, currentFilterType)}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`
  );
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();


    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

  setOnFilterTypeChange(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .addEventListener('change', this._onFilterTypeChange);
  }

  _onFilterTypeChange(evt) {
    evt.preventDefault();
debugger
    this._callback.filterTypeChange(evt.target.value);
  }
}
