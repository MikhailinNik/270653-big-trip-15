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
