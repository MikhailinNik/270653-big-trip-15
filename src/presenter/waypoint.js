import WaypointView from '@view/waypoint';
import FormEditView from '@view/form-edit';
import { render, replace } from '@utils/dom';
import { isEscapeEvent } from '@utils/util';
import { RenderPosition } from '@utils/const';

export default class Waypoint {
  constructor(pointListComponent) {
    this._pointListComponent = pointListComponent;

    this._waypointComponent = null;
    this._formEditComponent = null;

    this._onWaypointClick = this._onWaypointClick.bind(this);
    this._onFormEditClick = this._onFormEditClick.bind(this);
    this._onFormEditSubmit = this._onFormEditSubmit.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
  }

  init(point, destinations, pointTypeToOffers) {
    this._waypointComponent = new WaypointView(point);
    this._formEditComponent = new FormEditView(point, destinations, pointTypeToOffers);

    this._waypointComponent.setOnclick(this._onWaypointClick);

    this._formEditComponent.setOnClick(this._onFormEditClick);

    this._formEditComponent.setOnFormSubmit(this._onFormEditSubmit);

    render(this._pointListComponent, this._waypointComponent, RenderPosition.BEFOREEND);

  }

  _replaceFormToPoint() {
    replace(this._pointListComponent, this._waypointComponent, this._formEditComponent);
  }

  _replaceWaypointToFrom() {
    replace(this._pointListComponent, this._formEditComponent, this._waypointComponent);
  }

  _onWaypointClick() {
    this._replaceWaypointToFrom();
    document.addEventListener('keydown', this._onEscapeKeyDown);
  }

  _onFormEditClick() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscapeKeyDown);
  }

  _onFormEditSubmit() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscapeKeyDown);
  }

  _onEscapeKeyDown(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();

      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._onEscapeKeyDown);
    }
  }
}

