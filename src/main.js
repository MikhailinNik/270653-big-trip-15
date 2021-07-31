import { createList } from '@view/point-list';
import { createTripInfo } from '@view/trip-info';
import { createSiteMenu } from '@view/menu';
import { createFilter } from '@view/filter';
import { createSort } from '@view/sort';
import { createForm } from '@view/form-edit';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainContainer = document.querySelector('.page-main');
const siteSectionContainer = siteMainContainer.querySelector('.trip-events');

render(siteSectionContainer, createList(), 'afterbegin');
render(siteSectionContainer, createForm(), 'afterbegin');
render(siteSectionContainer, createSort(), 'afterbegin');


const siteHeaderContainer = document.querySelector('.page-header');
const siteContainerContainer = siteHeaderContainer.querySelector('.trip-main');

render(siteContainerContainer, createTripInfo(), 'afterbegin');


const siteMenuElement = siteHeaderContainer.querySelector('.trip-controls__navigation');

render(siteMenuElement, createSiteMenu(), 'beforeend');


const siteFilterElement = siteHeaderContainer.querySelector('.trip-controls__filters');

render(siteFilterElement, createFilter(), 'afterbegin');


