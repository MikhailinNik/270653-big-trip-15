import AbstractView from '@view/abstract';
import { listEmptyTypeToText } from '@utils/const';

const createEmptyList = (filterType) => {
  const value = listEmptyTypeToText[filterType];

  return (
    `<p class="trip-events__msg">${value}</p>`
  );
};

export default class ListEmpty extends AbstractView {
  constructor(filterType) {
    super();

    this._filterType = filterType;
  }

  getTemplate() {
    return createEmptyList(this._filterType);
  }
}
