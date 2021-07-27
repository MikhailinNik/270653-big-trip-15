import { createEmptyList } from './view/waypoint.js';
import { createTripInfo } from './view/trip-info.js';
import { createSiteMenu } from './view/menu.js';
import { createFilter } from './view/filter.js';
import { createSort } from './view/sort.js';
import { createForm } from './view/form-edit.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-main');
const siteSectionElement = siteMainElement.querySelector('.trip-events');

render(siteSectionElement, createEmptyList(), 'afterbegin');
render(siteSectionElement, createForm(), 'afterbegin');
render(siteSectionElement, createSort(), 'afterbegin');


const siteHeaderElement = document.querySelector('.page-header');
const siteContainerElement = siteHeaderElement.querySelector('.trip-main');

render(siteContainerElement, createTripInfo(), 'afterbegin');


const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');

render(siteMenuElement, createSiteMenu(), 'beforeend');


const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(siteFilterElement, createFilter(), 'afterbegin');


