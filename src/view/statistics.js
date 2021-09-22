import AbstractView from '@view/abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getCostEventType, getCountEventsType, getSpendTime } from '@utils/statistics.js';
import { formatDuration } from '@view/waypoint-date.js';

const TYPES = {
  MONEY: 'money',
  COUNT: 'count',
  TIME: 'time',
};

const currentTypeToText ={
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME-SPEND',
};

const renderChart = (template, typeData, data, eventTypes) => {
  let processedData;
  let currentFormatter;
  let currentText;

  switch (typeData) {
    case TYPES.MONEY:
      processedData = eventTypes.map((type) => getCostEventType(data, type));
      currentFormatter = (value) => `€ ${value}`;
      currentText = currentTypeToText.MONEY;
      break;
    case TYPES.COUNT:
      processedData = eventTypes.map((type) => getCountEventsType(data, type));
      (value) => `${value}x`;
      currentTypeToText.TYPE;
      break;
    case TYPES.TIME:
      processedData = eventTypes.map((type) => getSpendTime(data, type));
      currentFormatter = (value) => `${formatDuration(value)}`;
      console.log(currentFormatter);
      currentText = currentTypeToText.TIME;
      break;
  }

  return new Chart(template, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: eventTypes,
      datasets: [{
        data: processedData,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: currentFormatter,
        },
      },
      title: {
        display: true,
        text: currentText,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Statistics extends AbstractView {
  constructor(points, eventTypes) {
    super();

    this._data = points.slice();
    this._eventTypes = eventTypes;

    this._renderMoneyChart = null;
    this._renderTypeChart = null;
    this._renderTimeChart = null;

    this.init = this.init.bind(this);
    this.init();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  init() {
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderChart(moneyCtx, TYPES.MONEY, this._data, this._eventTypes);
    this._typeChart = renderChart(typeCtx, TYPES.COUNT, this._data, this._eventTypes);
    debugger
    this._timeSpendChart = renderChart(timeCtx, TYPES.TIME, this._data, this._eventTypes);
  }
}
