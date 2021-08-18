import SortView from '@view/sort';
import PointListView from '@view/point-list';
import ListEmptyView from '@/view/list-empty';
import { render, RenderPosition } from '@utils/dom';
import WaypointPresenter from '@presenter/waypoint';
import { updateItemById } from '@utils/util';

export default class PointList {
  constructor(container) {
    this._container = container;
    this._waypointPresenter = new Map();

    this._sortComponent = new SortView();
    this._listComponent = new PointListView();
    this._noPointsComponent = new ListEmptyView();

    this._onWaypointChange = this._onWaypointChange.bind(this);
    this._onWaypointMode = this._onWaypointMode.bind(this);
  }

  init(points, destinations, pointTypeToOffers) {
    this._points = points;
    this._destinations = destinations;
    this._pointTypeToOffers = pointTypeToOffers;

    this._renderList();
    this._renderWaypoints();
    this._renderNoPoints();
  }

  _renderList() {
    render(this._container, this._listComponent);
  }

  _renderWaypoint(point, destinations, pointTypeToOffers) {
    const waypointPresenter = new WaypointPresenter(this._listComponent, this._onWaypointChange, this._onWaypointMode);
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

  _renderNoPoints() {
    this._points.length === 0
      ? render(this._container, this._noPointsComponent, RenderPosition.AFTER_BEGIN)
      : render(this._container, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _onWaypointChange(updatedPoint) {
    this._points = updateItemById(this._points, updatedPoint);
    this._waypointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _onWaypointMode() {
    this._waypointPresenter.forEach((presenter) => presenter.resetView());
  }
}
