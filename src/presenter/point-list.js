import SortView from '@view/sort';
import PointListView from '@view/point-list';
import ListEmptyView from '@/view/list-empty';
import { render, RenderPosition } from '@utils/dom';
import WaypointPresenter from '@presenter/waypoint';
import { updateItemById, getTimeForSort, getPriceForSort } from '@utils/util';
import { SortType } from '@utils/const';

export default class PointList {
  constructor(container) {
    this._container = container;
    this._waypointPresenter = new Map();

    this._sortComponent = new SortView();
    this._listComponent = new PointListView();
    this._noPointsComponent = new ListEmptyView();
    this._currentSortType = SortType.DAY;

    this._changeData = this._changeData.bind(this);
    this._resetEditMode = this._resetEditMode.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);
  }

  init(points, destinations, pointTypeToOffers) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    this._destinations = destinations;
    this._pointTypeToOffers = pointTypeToOffers;

    this._renderList();
    this._renderWaypoints();
    this._renderNoPoints();
  }

  _renderList() {
    render(this._container, this._listComponent, RenderPosition.BEFORE_END);
  }

  _renderWaypoint(point, destinations, pointTypeToOffers) {
    const waypointPresenter = new WaypointPresenter(this._listComponent, this._changeData, this._resetEditMode);
    waypointPresenter.init(point, destinations, pointTypeToOffers);
    this._waypointPresenter.set(point.id, waypointPresenter);
  }

  _renderWaypoints() {
    for (const point of this._points) {
      this._renderWaypoint(point, this._destinations, this._pointTypeToOffers);
    }
  }

  _clearList() {
    this._waypointPresenter.forEach((point) => point.destroy());
    this._waypointPresenter.clear();
  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.AFTER_BEGIN);
    this._sortComponent.setOnTypeChange(this._handleTypeChange);
  }

  _renderNoPoints() {
    this._points.length === 0
      ? render(this._container, this._noPointsComponent, RenderPosition.AFTER_BEGIN)
      : this._renderSort();
  }

  _changeData(updatedPoint) {
    this._points = updateItemById(this._points, updatedPoint);
    this._sourcedPoints = updateItemById(this._sourcedPoints, updatedPoint);
    this._waypointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _resetEditMode() {
    this._waypointPresenter.forEach((presenter) => presenter.resetView());
  }

  _sortPoints(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this._points.sort(getTimeForSort);
        break;
      case SortType.PRICE:
        this._points.sort(getPriceForSort);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearList();
    this._renderWaypoints();
  }
}
