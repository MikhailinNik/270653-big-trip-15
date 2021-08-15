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
    this._renderPointList();
    this._renderWaypoints(points, destinations, pointTypeToOffers);
    this._renderListEmpty(points);
  }

  _renderPointList() {
    render(this._mainEvents, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypoints(points, destinations, pointTypeToOffers) {
    const waypointPresenter = new WaypointPresenter(this._pointListComponent);
    waypointPresenter.init(points, destinations, pointTypeToOffers);
  }

  _renderListEmpty(points) {
    points.length === 0
      ? render(this._mainEvents, this._listEmptyComponent, RenderPosition.AFTERBEGIN)
      : render(this._mainEvents, this._sortComponent, RenderPosition.AFTERBEGIN);
  }
}
