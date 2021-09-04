import Abstract from '@view/abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating = true) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevTemplate = this.getElement();
    const parent = prevTemplate.parentElement;
    this.removeElement();

    const newTemplate = this.getElement();

    parent.replaceChild(newTemplate, prevTemplate);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
