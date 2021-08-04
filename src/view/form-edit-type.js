import { POINT_TYPES } from '@utils/const';
import { capitalizeFirstLetter } from '@utils/util';

export const createPointTypeTemplate = (currentType) => POINT_TYPES.map((type) => {
  const getFirstLetterUpper = () => currentType === ''
    ? ''
    : capitalizeFirstLetter(currentType);

  const isChecked = getFirstLetterUpper() === type
    ? 'checked'
    : '';

  return (
    `<div class="event__type-item">
    <input id="event-type-${type}-1"
    class="event__type-input  
    visually-hidden" 
    type="radio" 
    name="event-type" 
    value="${type}" ${isChecked}>
    <label class="event__type-label  event__type-label--${type}" 
    for="event-type-${type}-1">${type}</label>
  </div>`
  );
}).join('');
