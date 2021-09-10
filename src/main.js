import { points, destinations, pointTypeToOffers } from '@mock/data';
import { render, RenderPosition } from '@utils/dom';
import MenuVeiw from '@view/menu';
import TripInfoView from '@view/trip-info';
import PointsModel from '@model/points';
import FilterModel from '@model/filter';
import FilterPresenter from '@presenter/filter';

import PointListPresenter from '@presenter/point-list.js';

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');
render(siteContainer, new TripInfoView(), RenderPosition.AFTER_BEGIN);

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');
render(controlsNavigation, new MenuVeiw(), RenderPosition.BEFORE_END);

const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

const filterPresenter = new FilterPresenter(controlsFilters, filterModel, pointsModel);
const pointPresenter = new PointListPresenter(mainEvents, pointsModel, filterModel);

filterPresenter.init();
pointPresenter.init(destinations, pointTypeToOffers);


