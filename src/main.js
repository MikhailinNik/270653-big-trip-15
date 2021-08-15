import { points, destinations, pointTypeToOffers } from '@mock/data';
import { render, replace } from '@utils/dom';
import { RenderPosition } from '@utils/const';
import { isEscapeEvent } from '@utils/util';
import MenuVeiw from '@view/menu';
import FilterView from '@view/filter';
import TripInfoView from '@view/trip-info';
import SortView from '@view/sort';
import PointListView from '@view/point-list';
import FormEditView from '@view/form-edit';
import WaypointView from '@view/waypoint';
import ListEmptyView from '@/view/list-empty';

import PointPresenter from '@presenter/point.js';

const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');
render(siteContainer, new TripInfoView(), RenderPosition.AFTERBEGIN);

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');
render(controlsNavigation, new MenuVeiw(), RenderPosition.BEFOREEND);

const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');
render(controlsFilters, new FilterView(), RenderPosition.AFTERBEGIN);

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

const pointPresenter = new PointPresenter(mainEvents);
pointPresenter.init(points, destinations, pointTypeToOffers);

