import AbstractObserver from '@utils/abstract-observer';

export default class Points extends AbstractObserver {
  constructor () {
    super();

    this._pointsEvent = [];
  }

  setPoints(points) {
    this._pointsEvent = points.slice();
  }

  getPointsEvent() {
    return this._pointsEvent;
  }

  updatePoint(updateType, update) {
    const index = this._pointsEvent.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._pointsEvent = [
      ...this._pointsEvent.slice(0, index),
      update,
      ...this._pointsEvent.slice(index + 1),
    ];

    this.notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._pointsEvent = [
      update,
      ...this._pointsEvent,
    ];

    this.notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._pointsEvent.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._pointsEvent = [
      ...this._pointsEvent.slice(0, index),
      ...this._pointsEvent.slice(index + 1),
    ];

    this.notify(updateType);
  }

  isEmpty() {
    return this._pointsEvent.length === 0;
  }

  static adaptToClient(point) {
    const adaptedEvent = Object.assign(
      {},
      point,
      {
        basePrice: point['base_price'],
        dateFrom: point['date_from'],
        dateTo: point['date_to'],
        isFavorite: point['is_favorite'],
      },
    );

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }

  static adaptToServer(point) {
    const adaptedEvent = Object.assign(
      {},
      point,
      {
        'base_price': point.basePrice,
        'date_from': point.dateFrom,
        'date_to': point.dateTo,
        'is_favorite': point.isFavorite,
      },
    );

    delete point.basePrice;
    delete point.dateFrom;
    delete point.dateTo;
    delete point.isFavorite;

    return adaptedEvent;
  }
}


