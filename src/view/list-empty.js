import { createItem } from '@/utils/dom';

const createEmptyList = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class ListEmpty {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyList();
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
