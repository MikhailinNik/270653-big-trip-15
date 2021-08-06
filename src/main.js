import { createTripInfoTemplate } from '@view/trip-info';
import { createSiteMenuTemplate } from '@view/menu';
import { createFilterTemplate } from '@view/filter';
import { createPointSortTemplate } from '@view/sort';
import { points } from '@mock/data';
import { createWaypointTemplate } from '@view/waypoint';
import { createPointFormTemplate } from '@view/form-edit';
import { createPointListTemplate } from '@view/point-list';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

render(mainEvents, createPointListTemplate(), 'afterbegin');

const eventList = document.querySelector('.trip-events__list');

points.slice(0, 2).forEach((point) => {
  const template = createWaypointTemplate(point);

  render(eventList, template, 'beforeend');
});

render(eventList, createPointFormTemplate(points[0]), 'afterbegin');

render(mainEvents, createPointSortTemplate(), 'afterbegin');


const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');

render(siteContainer, createTripInfoTemplate(), 'afterbegin');

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');

render(controlsNavigation, createSiteMenuTemplate(), 'beforeend');


const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');

render(controlsFilters, createFilterTemplate(), 'afterbegin');


