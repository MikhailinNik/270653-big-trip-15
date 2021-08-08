import { createItem } from '@/utils/util';
import { POINT_TYPES } from '@utils/const';
import { getUpperCaseFirstLetter, getLowerCaseFirstLetter } from '@utils/util';

export const createPointTypeTemplate = (currentType) => POINT_TYPES.map((type) => {
  const getFirstLetterUpper = () => currentType === ''
    ? ''
    : getUpperCaseFirstLetter(currentType);

  const getCheckIn = () => getFirstLetterUpper() === type
    ? 'checked'
    : '';

  return (
    `<div class="event__type-item">
    <input id="event-type-${type}-1"
    class="event__type-input visually-hidden" type="radio" 
    name="event-type" 
    value="${getLowerCaseFirstLetter(type)}" ${getCheckIn()}>
    <label class="event__type-label  event__type-label--${getLowerCaseFirstLetter(type)}" 
    for="event-type-${getLowerCaseFirstLetter(type)}-1">${type}</label>
  </div>`
  );
}).join('');

export default class FormEditType {
  constructor(currentType) {
    this._currentType = currentType;
    this._element = null;
  }

  getTemplate() {
    return createPointTypeTemplate(this._currentType);
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
