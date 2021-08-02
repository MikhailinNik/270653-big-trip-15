import { createList } from '@view/point-list';
import { createTripInfo } from '@view/trip-info';
import { createSiteMenu } from '@view/menu';
import { createFilter } from '@view/filter';
import { createSort } from '@view/sort';
import { generatePoint } from '@mock/data';

console.log(generatePoint());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainContainer = document.querySelector('.page-main');
const siteSectionContainer = siteMainContainer.querySelector('.trip-events');

render(siteSectionContainer, createList(), 'beforeend');
render(siteSectionContainer, createSort(), 'afterbegin');


const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');

render(siteContainer, createTripInfo(), 'afterbegin');


const siteMenuElement = siteHeaderContainer.querySelector('.trip-controls__navigation');

render(siteMenuElement, createSiteMenu(), 'beforeend');


const siteFilterElement = siteHeaderContainer.querySelector('.trip-controls__filters');

render(siteFilterElement, createFilter(), 'afterbegin');


