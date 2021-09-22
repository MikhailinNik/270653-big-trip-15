import { points, destinations, pointTypeToOffers } from '@mock/data';
import { render, RenderPosition } from '@utils/dom';
import { remove } from '@utils/util';
import { POINT_TYPES } from '@mock/const';
import MenuVeiw from '@view/menu';
import TripInfoView from '@view/trip-info';
import PointsModel from '@model/points';
import FilterModel from '@model/filter';
import FilterPresenter from '@presenter/filter';
import PointListPresenter from '@presenter/point-list.js';
import StatisticsView from '@view/statistics';
import { MenuItem } from '@utils/const';
import Api from '@view/api';

const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic iT3te4egTxdm2tb3k';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const api = new Api(END_POINT, AUTHORIZATION);

api.getData()
  .then(([events, destination, offers]) => {
    pointsModel.setEvents(UpdateType.INIT, events);
    destinationsModel.setDestinations(destination);
    offersModel.setOffers(offers);
  })
  .then(() => {
    const tripInfoPresenter = new TripInfoPresenter(siteHeaderMainElement, filterModel, eventsModel);
    tripInfoPresenter.init();
    const siteMenuComponent = new SiteMenuView();
    render(siteControlElement, siteMenuComponent, RenderPosition.BEFOREEND);

    const filterPresenter = new FilterPresenter(siteControlElement, filterModel, eventsModel);
    filterPresenter.init();

    const tripPresenter = new TripPresenter(siteTripEventsElement, siteHeaderMainElement, eventsModel, filterModel, destinationsModel, offersModel, api);
    tripPresenter.init();

    document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      tripPresenter.createEvent();
    });

    let statisticsComponent = null;

    const menuItemsClickHandler = (menuItemsClick) => {
      switch (menuItemsClick) {
        case MenuItem.TABLE:
          tripPresenter.init();
          remove(statisticsComponent);
          statisticsComponent = null;
          document.querySelector('.trip-main__event-add-btn').disabled = false;
          break;
        case MenuItem.STATISTICS:
          tripPresenter.destroy();
          statisticsComponent = new StatisticsView(eventsModel.getEvents(), TYPES);
          render(siteMainPageElement, statisticsComponent, RenderPosition.AFTERBEGIN);
          statisticsComponent.initCharts();
          document.querySelector('.trip-main__event-add-btn').disabled = true;
          break;
      }
    };

    siteMenuComponent.setMenuClickHandler(menuItemsClickHandler);
  });


pointsModel.setPoints(points);


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
        pointPresenter.init(destinations, pointTypeToOffers);
        remove(statisticsComponent);
        statisticsComponent = null;
        currentMenuItem = MenuItem.TABLE;
        menuComponent.setMenuItem(MenuItem.TABLE);
      }
      break;
    case MenuItem.STATS:
      if(currentMenuItem !== MenuItem.STATS) {
        pointPresenter.destroy();
        statisticsComponent = new StatisticsView(pointsModel.getPoints(), POINT_TYPES);
        statisticsComponent.init();
        render(controlsNavigation, statisticsComponent, RenderPosition.BEFOREEND);
        currentMenuItem = MenuItem.STATS;
        menuComponent.setMenuItem(MenuItem.STATS);
      }
      break;
  }
};

filterPresenter.init();
pointPresenter.init(destinations, pointTypeToOffers);
menuComponent.setOnMenuClick(onMenuClick);


