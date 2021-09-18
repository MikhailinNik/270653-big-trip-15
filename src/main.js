import { points, destinations, pointTypeToOffers } from '@mock/data';
import { render, RenderPosition, remove } from '@utils/dom';
import MenuVeiw from '@view/menu';
import TripInfoView from '@view/trip-info';
import PointsModel from '@model/points';
import FilterModel from '@model/filter';
import FilterPresenter from '@presenter/filter';
import PointListPresenter from '@presenter/point-list.js';
import StatisticsView from '@view/statistics';
import { MenuItem } from '@utils/const';

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderContainer = document.querySelector('.page-header');
const siteContainer = siteHeaderContainer.querySelector('.trip-main');
render(siteContainer, new TripInfoView(), RenderPosition.AFTER_BEGIN);

const controlsNavigation = siteHeaderContainer.querySelector('.trip-controls__navigation');
const menuComponent = new MenuVeiw();
render(controlsNavigation, menuComponent, RenderPosition.BEFORE_END);

const controlsFilters = siteHeaderContainer.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const mainEvents = main.querySelector('.trip-events');

const filterPresenter = new FilterPresenter(controlsFilters, filterModel, pointsModel);
const pointPresenter = new PointListPresenter(mainEvents, pointsModel, filterModel);

let statisticsComponent = null;
let currentMenuItem = MenuItem.TABLE;

const onMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      if (currentMenuItem !== MenuItem.TABLE) {
        pointPresenter.destroy();
        pointPresenter.init(destinations, pointTypeToOffers);
        remove(statisticsComponent);
        currentMenuItem = MenuItem.TABLE;
        menuComponent.setMenuItem(MenuItem.TABLE);
      }
      break;
    case MenuItem.STATS:
      if(currentMenuItem !== MenuItem.STATS) {
        pointPresenter.destroy();
        // pointPresenter.renderInfo();
        statisticsComponent = new StatisticsView(pointsModel.getPoints());
        render(controlsNavigation, statisticsComponent, RenderPosition.BEFOREEND);
        currentMenuItem = MenuItem.STATS;
        menuComponent.setMenuItem(MenuItem.STATS);
      }
      break;
  }
};

menuComponent.setOnMenuClick(onMenuClick);

filterPresenter.init();
// pointPresenter.init(destinations, pointTypeToOffers);
render(controlsNavigation, statisticsComponent.getElement(), RenderPosition.BEFORE_END);


