export default class AbstractObserver {
  constructor() {
    this._observers = new Set();
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  notify(eventType, payload) {
    this._observers.forEach((observer) => observer(eventType, payload));
  }
}
