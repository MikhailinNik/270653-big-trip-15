import WaypointView from '@view/waypoint';
import FormEditView from '@view/form-edit';
import { render, replace, RenderPosition } from '@utils/dom';
import { isEscapeEvent, remove } from '@utils/util';
import { pointMode } from '@utils/const';

export default class Waypoint {
  constructor(pointListComponent, changeData, changeMode) {
    this._pointListComponent = pointListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._formEditComponent = null;
    this._pointMode = pointMode.DEFAULT;

    this._handleWaypointClick = this._handleWaypointClick.bind(this);
    this._handleFormEditClick = this._handleFormEditClick.bind(this);
    this._handleFormEditSubmit = this._handleFormEditSubmit.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
  }

  init(point, destinations, pointTypeToOffers) {
    this._point = point;
    this._destinations = destinations;
    this._pointTypeToOffers = pointTypeToOffers;

    const prevPointComponent = this._pointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._pointComponent = new WaypointView(point);
    this._formEditComponent = new FormEditView(point, destinations, pointTypeToOffers);

    this._pointComponent.setOnEditclick(this._handleWaypointClick);

    this._formEditComponent.setOnClick(this._handleFormEditClick);

    this._formEditComponent.setOnFormSubmit(this._handleFormEditSubmit);

    this._pointComponent.setOnFavouritePointClick(this._handleFavouriteClick);

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this._pointListComponent, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._pointMode === pointMode.DEFAULT) {
      replace(this._pointListComponent, this._pointComponent, prevPointComponent);
    }

    if (this._pointMode === pointMode.EDITING) {
      replace(this._pointListComponent, this._formEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._formEditComponent);
  }

  resetView() {
    if (this._pointMode !== pointMode.DEFAULT) {
      this._replaceFormToPoint();
      this._removeKeydownListener();
    }
  }

  _replaceFormToPoint() {
    replace(this._pointListComponent, this._pointComponent, this._formEditComponent);
    this._pointMode = pointMode.DEFAULT;
  }

  _replaceWaypointToForm() {
    replace(this._pointListComponent, this._formEditComponent, this._pointComponent);
    this._changeMode();
    this._pointMode = pointMode.EDITING;
  }

  _handleWaypointClick() {
    this._replaceWaypointToForm();
    document.addEventListener('keydown', this._onEscapeKeyDown);
  }

  _handleFormEditClick() {
    this._replaceFormToPoint();
    this._removeKeydownListener();
  }

  _handleFormEditSubmit(point) {
    this._changeData(point);
    this._replaceFormToPoint();
    this._removeKeydownListener();
  }

  _handleFavouriteClick() {
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

  _removeKeydownListener() {
    document.removeEventListener('keydown', this._onEscapeKeyDown);
  }

  _onEscapeKeyDown(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();

      this._replaceFormToPoint();
      this._removeKeydownListener();
    }
  }
}

