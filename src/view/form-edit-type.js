import { POINT_TYPES } from '@mock/const';
import { getLowerCaseFirstLetter } from '@utils/util';

export const createPointTypeTemplate = (currentType) => POINT_TYPES.map((type) => {
  const eventType = getLowerCaseFirstLetter(type);

  return (
    `<div class="event__type-item">
      <input 
      id="event-type-${eventType}-1"
      class="event__type-input visually-hidden" type="radio" 
      name="event-type" 
      value="${eventType}"
      ${eventType === currentType ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">
      ${type}
    </label>
  </div>`
  );
}).join('');
