import { renderTemplate } from '@utils/util';
import { createTripInfoTemplate } from '@view/trip-info';
import { createSiteMenuTemplate } from '@view/menu';
import { createFilterTemplate } from '@view/filter';
import { createPointSortTemplate } from '@view/sort';
import { points } from '@mock/data';
import { createWaypointTemplate } from '@view/waypoint';
import { createPointFormTemplate } from '@view/form-edit';
import { createPointListTemplate } from '@view/point-list';

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

renderTemplate(mainEvents, createPointListTemplate(), 'afterbegin');

const eventList = document.querySelector('.trip-events__list');

points.slice(0, 2).forEach((point) => {
  const template = createWaypointTemplate(point);

  renderTemplate(eventList, template, 'beforeend');
});

renderTemplate(eventList, createPointFormTemplate(points[0]), 'afterbegin');

renderTemplate(mainEvents, createPointSortTemplate(), 'afterbegin');


const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');

renderTemplate(siteContainer, createTripInfoTemplate(), 'afterbegin');

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');

renderTemplate(controlsNavigation, createSiteMenuTemplate(), 'beforeend');


const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');

renderTemplate(controlsFilters, createFilterTemplate(), 'afterbegin');


