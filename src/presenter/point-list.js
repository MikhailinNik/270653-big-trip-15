import SortView from '@view/sort';
import PointListView from '@view/point-list';
import ListEmptyView from '@/view/list-empty';
import { render } from '@utils/dom';
import { RenderPosition } from '@utils/const';
import WaypointPresenter from '@presenter/waypoint';
import { updateItem } from '@utils/util';

export default class PointList {
  constructor(mainEvents) {
    this._mainEvents = mainEvents;
    this._waypointPresenter = new Map();

    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._listEmptyComponent = new ListEmptyView();

    this._onWaypointChange = this._onWaypointChange.bind(this);
    this._onWaypointMode = this._onWaypointMode.bind(this);
  }

  init(points, destinations, pointTypeToOffers) {
    this._points = points;
    this._destinations = destinations;
    this._pointTypeToOffers = pointTypeToOffers;

    this._renderPointList();
    this._renderWaypoints();
    this._renderListEmpty(this._points);
  }

  _renderPointList() {
    render(this._mainEvents, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypoint(point, destinations, pointTypeToOffers) {
    const waypointPresenter = new WaypointPresenter(this._pointListComponent, this._onWaypointChange, this._onWaypointMode);
    waypointPresenter.init(point, destinations, pointTypeToOffers);
    this._waypointPresenter.set(point.id, waypointPresenter);
  }

  _renderWaypoints() {
    for (const point of this._points) {
      this._renderWaypoint(point, this._destinations, this._pointTypeToOffers);
    }
  }

  _clearPointList() {
    this._waypointPresenter.forEach((point) => point.destroy());
    this._waypointPresenter.clear();
  }

  _renderListEmpty(points) {
    points.length === 0
      ? render(this._mainEvents, this._listEmptyComponent, RenderPosition.AFTERBEGIN)
      : render(this._mainEvents, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _onWaypointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._waypointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _onWaypointMode() {
    this._waypointPresenter.forEach((presenter) => presenter.resetView());
  }
}
