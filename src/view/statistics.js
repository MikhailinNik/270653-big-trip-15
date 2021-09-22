import AbstractView from '@view/abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getCostEventType, getCountEventsType, getSpendTime, humanizeDuration } from '@utils/statistics.js';

const TYPE = {
  MONEY: 'money',
  COUNT: 'count',
  TIME: 'time',
};

const currentTypeToText ={
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME-SPEND',
};

const BAR_HEIGHT = 55;

const renderChart = (template, typeData, data, eventTypes) => {
  let processedData;
  let currentFormatter;
  let currentText;

  switch (typeData) {
    case TYPE.MONEY:
      processedData = eventTypes.map((type) => getCostEventType(data, type));
      currentFormatter = (value) => `€ ${value}`;
      currentText = currentTypeToText.MONEY;
      break;
    case TYPE.COUNT:
      processedData = eventTypes.map((type) => getCountEventsType(data, type));
      currentFormatter = (value) => `${value}x`;
      currentText = currentTypeToText.TYPE;
      break;
    case TYPE.TIME:
      processedData = eventTypes.map((type) => getSpendTime(data, type));
      currentFormatter = (value) => `${humanizeDuration(value)}`;
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

    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  init() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    const template = this.getElement();

    const moneyCtx = template.querySelector('#money');
    const typeCtx = template.querySelector('#type');
    const timeCtx = template.querySelector('#time-spend');


    moneyCtx.height = BAR_HEIGHT * this._eventTypes.length;
    typeCtx.height = BAR_HEIGHT * this._eventTypes.length;
    timeCtx.height = BAR_HEIGHT * this._eventTypes.length;

    this._moneyChart = renderChart(moneyCtx, TYPE.MONEY, this._data, this._eventTypes);
    this._typeChart = renderChart(typeCtx, TYPE.COUNT, this._data, this._eventTypes);
    this._timeChart = renderChart(timeCtx, TYPE.TIME, this._data, this._eventTypes);
  }
}
