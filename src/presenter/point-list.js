import SortView from '@view/sort';
import PointListView from '@view/point-list';
import ListEmptyView from '@/view/list-empty';
import { render, RenderPosition } from '@utils/dom';
import WaypointPresenter from '@presenter/waypoint';
import { remove, getTimeForSort, getPriceForSort, sortTimeUp } from '@utils/util';
import { SortType, UserAction, UpdateType, FilterType } from '@utils/const';
import { filterTypeToPoints } from '@utils/filter';

export default class PointList {
  constructor(container, pointsModel, filterModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._waypointPresenter = new Map();

    this._sortComponent = null;
    this._listComponent = new PointListView();
    // this._noPointsComponent = new ListEmptyView();
    this._currentSortType = SortType.DAY;
    this._filterType = FilterType.EVERYTHING;

    this._changeData = this._changeData.bind(this);
    this._resetEditMode = this._resetEditMode.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init(destinations, pointTypeToOffers) {
    this._destinations = destinations;
    this._pointTypeToOffers = pointTypeToOffers;

    this._renderList();
    this._renderWaypoints();
    this._renderNoPoints();
  }

  _getPoints() {
    const points = this._pointsModel.getPoints();
    this._filterType = this._filterModel.getFilter();
    const filteredPoints = filterTypeToPoints[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(getTimeForSort);
      case SortType.PRICE:
        return filteredPoints.sort(getPriceForSort);
    }

    return filteredPoints.sort(sortTimeUp);
  }

  _renderList() {
    render(this._container, this._listComponent, RenderPosition.BEFORE_END);
  }

  _renderWaypoint(point, destinations, pointTypeToOffers) {
    const waypointPresenter = new WaypointPresenter(this._listComponent, this._handleViewAction, this._resetEditMode);
    waypointPresenter.init(point, destinations, pointTypeToOffers);
    this._waypointPresenter.set(point.id, waypointPresenter);
  }

  _renderWaypoints() {
    const points = this._getPoints();
    for (const point of points) {
      this._renderWaypoint(point, this._destinations, this._pointTypeToOffers);
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setOnTypeChange(this._handleTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(this._container, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderNoPoints() {
    this._noPointsComponent = new ListEmptyView(this._filterType);
debugger
    this._pointsModel.isEmpty()
      ? render(this._container, this._noPointsComponent, RenderPosition.AFTER_BEGIN)
      : this._renderSort();
  }

  _changeData(updatedPoint) {
  // Вызывать обновление модели
    this._waypointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _resetEditMode() {
    this._waypointPresenter.forEach((presenter) => presenter.resetView());
  }

  _clear({ resetSortType = false } = {}) {
    // resetSortType
    this._waypointPresenter.forEach((point) => point.destroy());
    this._waypointPresenter.clear();

    // remove(this._listComponent);
    // remove(this._sortComponent);
debugger
    if (this._noPointsComponent !== null) {
      remove(this._noPointsComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointsModel.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clear();
        this._renderWaypoints();
        break;
      case UpdateType.MAJOR:
        this._clear({ resetSortType: true });
        this._renderWaypoints();
        break;
    }
  }

  _handleTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
debugger
    this._currentSortType = sortType;
    this._getPoints();
    this._clear({ resetSortType: true });
    this._renderWaypoints();
  }
}
