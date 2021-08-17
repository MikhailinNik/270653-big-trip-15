import WaypointView from '@view/waypoint';
import FormEditView from '@view/form-edit';
import { render, replace } from '@utils/dom';
import { isEscapeEvent, remove } from '@utils/util';
import { RenderPosition, Mode } from '@utils/const';

export default class Waypoint {
  constructor(pointListComponent, changeData, changeMode) {
    this._pointListComponent = pointListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._waypointComponent = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onWaypointClick = this._onWaypointClick.bind(this);
    this._onFormEditClick = this._onFormEditClick.bind(this);
    this._onFormEditSubmit = this._onFormEditSubmit.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
    this._onFavouriteClick = this._onFavouriteClick.bind(this);
  }

  init(point, destinations, pointTypeToOffers) {
    this._point = point;
    this._destinations = destinations;
    this._pointTypeToOffers = pointTypeToOffers;

    const prevWaypointComponent = this._waypointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._waypointComponent = new WaypointView(point);
    this._formEditComponent = new FormEditView(point, destinations, pointTypeToOffers);

    this._waypointComponent.setOnEditclick(this._onWaypointClick);

    this._formEditComponent.setOnClick(this._onFormEditClick);

    this._formEditComponent.setOnFormSubmit(this._onFormEditSubmit);

    this._waypointComponent.setOnFavouritePointClick(this._onFavouriteClick);

    if (prevWaypointComponent === null || prevFormEditComponent === null) {
      render(this._pointListComponent, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointListComponent, this._waypointComponent, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointListComponent, this._formEditComponent, prevFormEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._formEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replaceFormToPoint() {
    replace(this._pointListComponent, this._waypointComponent, this._formEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceWaypointToFrom() {
    replace(this._pointListComponent, this._formEditComponent, this._waypointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _onWaypointClick() {
    this._replaceWaypointToFrom();
    document.addEventListener('keydown', this._onEscapeKeyDown);
  }

  _onFormEditClick() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscapeKeyDown);
  }

  _onFormEditSubmit(point) {
    this._changeData(point);
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._onEscapeKeyDown);
  }

  _onFavouriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavourite: !this._point.isFavourite,
        },
      ),
    );
  }

  _onEscapeKeyDown(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();

      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._onEscapeKeyDown);
    }
  }
}

