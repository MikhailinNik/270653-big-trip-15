import { createItem } from '@utils/util';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`
);


export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate();
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
