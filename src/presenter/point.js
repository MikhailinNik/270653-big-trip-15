import SortView from '@view/sort';
import PointListView from '@view/point-list';
import FormEditView from '@view/form-edit';
import WaypointView from '@view/waypoint';
import ListEmptyView from '@/view/list-empty';
import { render, replace } from '@utils/dom';
import { RenderPosition } from '@utils/const';
import { isEscapeEvent } from '@utils/util';

export default class Point {
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
    // Метод для рендеринга списка точек маршрута
  }

  _renderWaypoints(points, destinations, pointTypeToOffers) {
    for (const point of points) {
      const waypointComponent = new WaypointView(point);
      const formEditComponent = new FormEditView(point, destinations, pointTypeToOffers);

      const onEscapeKeyDown = (evt) => {
        if (isEscapeEvent(evt)) {
          evt.preventDefault();

          replace(this._pointListComponent, waypointComponent, formEditComponent);
          document.removeEventListener('keydown', onEscapeKeyDown);
        }
      };

      waypointComponent.setOnclick(() => {
        replace(this._pointListComponent, formEditComponent, waypointComponent);
        document.addEventListener('keydown', onEscapeKeyDown);
      });

      formEditComponent.setOnClick(() => {
        replace(this._pointListComponent, waypointComponent, formEditComponent);
        document.addEventListener('keydown', onEscapeKeyDown);
      });

      formEditComponent.setOnFormSubmit(() => {
        replace(this._pointListComponent, waypointComponent, formEditComponent);
        document.removeEventListener('keydown', onEscapeKeyDown);
      });

      render(this._pointListComponent, waypointComponent, RenderPosition.BEFOREEND);
    // Метод для рендеринга точки маршрута
    }
  }

  _renderListEmpty(points) {
    points.length === 0
      ? render(this._mainEvents, this._listEmptyComponent, RenderPosition.AFTERBEGIN)
      : render(this._mainEvents, this._sortComponent, RenderPosition.AFTERBEGIN);
    // Метод для рендеринга пустого списка
  }
}
