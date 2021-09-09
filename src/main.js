import { points, destinations, pointTypeToOffers } from '@mock/data';
import { render, RenderPosition } from '@utils/dom';
import MenuVeiw from '@view/menu';
import FilterView from '@view/filter';
import TripInfoView from '@view/trip-info';
import PointsModel from '@model/points';
import FilterModel from '@model/filter';

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
render(controlsFilters, new FilterView(), RenderPosition.AFTER_BEGIN);

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

const pointPresenter = new PointListPresenter(mainEvents, pointsModel);
pointPresenter.init(destinations, pointTypeToOffers);


