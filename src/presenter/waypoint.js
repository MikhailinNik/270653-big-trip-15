import WaypointView from '@view/waypoint';
import FormEditView from '@view/form-edit';
import { render, replace, RenderPosition } from '@utils/dom';
import { isEscapeEvent, remove } from '@utils/util';
import { FormEditMode, UserAction, UpdateType } from '@utils/const';

export default class Waypoint {
  constructor(pointListComponent, changeData, changeMode) {
    this._pointListComponent = pointListComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._formEditComponent = null;
    this._formEdit = FormEditMode.DEFAULT;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleAddClick = this._handleAddClick.bind(this);
    this._handleFormEditClick = this._handleFormEditClick.bind(this);
    this._handleFormEditSubmit = this._handleFormEditSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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

    this._pointComponent.setOnEditClick(this._handlePointClick);

    this._formEditComponent.setOnAddClick(this._handleAddClick);

    this._formEditComponent.setOnRollupClick(this._handleFormEditClick);

    this._formEditComponent.setOnFormSubmit(this._handleFormEditSubmit);

    this._formEditComponent.setOnDeleteClick(this._handleDeleteClick);

    this._pointComponent.setOnFavouritePointClick(this._handleFavouriteClick);

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this._pointListComponent, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._formEdit === FormEditMode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._formEdit === FormEditMode.EDITING) {
      replace(this._formEditComponent, prevFormEditComponent);
    }

    if (this._formEdit === FormEditMode.ADD) {
      render(this._pointListComponent, this._formEditComponent, RenderPosition.AFTER_BEGIN);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._formEditComponent);
  }

  resetView() {
    if (this._formEdit !== FormEditMode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._formEditComponent);
    this._formEdit = FormEditMode.DEFAULT;
    document.removeEventListener('keydown', this._onEscapeKeyDown);
  }

  _replacePointToForm() {
    replace(this._formEditComponent, this._pointComponent);
    this._changeMode();
    this._formEdit = FormEditMode.EDITING;
  }

  _handleAddClick() {
    this._formEdit = FormEditMode.ADD;
    // render(this._pointListComponent, this._formEditComponent, RenderPosition.AFTER_BEGIN);
  }

  _handlePointClick() {
    this._replacePointToForm();
    document.addEventListener('keydown', this._onEscapeKeyDown);
  }

  _handleFormEditClick() {
    this._replaceFormToPoint();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleFormEditSubmit(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );

    this._replaceFormToPoint();
  }

  _handleFavouriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
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
    }
  }
}

