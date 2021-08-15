import { points, destinations, pointTypeToOffers } from '@mock/data';
import { render } from '@utils/dom';
import { RenderPosition } from '@utils/const';
import MenuVeiw from '@view/menu';
import FilterView from '@view/filter';
import TripInfoView from '@view/trip-info';

import PointListPresenter from '@presenter/point-list.js';

const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');
render(siteContainer, new TripInfoView(), RenderPosition.AFTERBEGIN);

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');
render(controlsNavigation, new MenuVeiw(), RenderPosition.BEFOREEND);

const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');
render(controlsFilters, new FilterView(), RenderPosition.AFTERBEGIN);

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

const pointPresenter = new PointListPresenter(mainEvents);
pointPresenter.init(points, destinations, pointTypeToOffers);


