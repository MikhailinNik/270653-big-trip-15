import SortView from '@view/sort';
import PointListView from '@view/point-list';
import ListEmptyView from '@/view/list-empty';
import { render } from '@utils/dom';
import { RenderPosition } from '@utils/const';
import WaypointPresenter from '@presenter/waypoint';

export default class PointList {
  constructor(mainEvents) {
    this._mainEvents = mainEvents;

    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._listEmptyComponent = new ListEmptyView();
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
    const waypointPresenter = new WaypointPresenter(this._pointListComponent);
    waypointPresenter.init(point, destinations, pointTypeToOffers);
  }

  _renderWaypoints() {
    for (const point of this._points) {
      this._renderWaypoint(point, this._destinations, this._pointTypeToOffers);
    }
  }

  _renderListEmpty(points) {
    points.length === 0
      ? render(this._mainEvents, this._listEmptyComponent, RenderPosition.AFTERBEGIN)
      : render(this._mainEvents, this._sortComponent, RenderPosition.AFTERBEGIN);
  }
}
