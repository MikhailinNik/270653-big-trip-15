import { sortTimeUp } from '@utils/util';
import { formatDuration } from '@view/waypoint-date';

const getDurationTime = ({ dateFrom, dateTo }) => dateTo - dateFrom;

const getCostEventType = (events, type) => events.filter((event) => event.type === type)
  .reduce((sum, event) => sum + event.basePrice, 0);

const getCountEventsType = (events, type) => events.filter((event) => event.type === type).length;

const getSpendTime = (points, type) => {

  points.filter((point) => point.type === type)
    .reduce((sum, point) => sum + getDurationTime(point), 0);
};

export {
  getCostEventType,
  getCountEventsType,
  getSpendTime
};
