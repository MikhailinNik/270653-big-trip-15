import { points, offersForm, destinations } from '@mock/data';
import { render, replaceItem } from '@utils/util';
import { RenderPosition } from '@utils/const';
import MenuVeiw from '@view/menu';
import FilterView from '@view/filter';
import TripInfoView from '@view/trip-info';
import SortView from '@view/sort';
import PointListView from '@view/point-list';
import FormEditView from '@view/form-edit';
import WaypointView from '@view/waypoint';

const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');
render(siteContainer, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');
render(controlsNavigation, new MenuVeiw().getElement(), RenderPosition.BEFOREEND);

const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');
render(controlsFilters, new FilterView().getElement(), RenderPosition.AFTERBEGIN);

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');
render(mainEvents, new SortView().getElement(), RenderPosition.AFTERBEGIN);

const pointListComponent = new PointListView();
render(mainEvents, pointListComponent.getElement(), RenderPosition.BEFOREEND);


const eventList = document.querySelector('.trip-events__list');

for (const point of points) {
  const waypointComponent = new WaypointView(point);
  const formEditComponent = new FormEditView(point, destinations, offersForm);

  const rollUpButtonWaypoint = waypointComponent.getElement().querySelector('.event__rollup-btn');
  const rollUpButtonForm = formEditComponent.getElement().querySelector('.event__rollup-btn');
  const submitForm = formEditComponent.getElement().querySelector('.event--edit');

  rollUpButtonWaypoint.addEventListener('click', () => {
    replaceItem(eventList, formEditComponent, waypointComponent);
  });

  rollUpButtonForm.addEventListener('click', () => {
    replaceItem(eventList, waypointComponent, formEditComponent);
  });

  submitForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceItem(eventList, waypointComponent, formEditComponent);
  });

  render(eventList, waypointComponent.getElement(), RenderPosition.BEFOREEND);
}


