import AbstractView from '@view/abstract';
import { MenuItem } from '@utils/const';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
  <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
</nav>`
);

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._onMenuClick = this._onMenuClick.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  setOnMenuClick(callback) {
    this._callback.getMenuClick = callback;

    this.getElement().addEventListener('click', this._onMenuClick);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('.trip-tabs__btn');

    items.forEach((item) => {
      item.text === menuItem
        ? item.classList.add('.trip-tabs__btn--active')
        : item.classList.remove('.trip-tabs__btn--active');
    });
  }

  _onMenuClick(evt) {
    evt.preventDefault();
    this._callback.getMenuClick(evt.target.text);
  }
}
