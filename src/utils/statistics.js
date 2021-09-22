import dayjs from 'dayjs';

const calculateDuration = ({ dateFrom, dateTo }) => {
  const date1 = dayjs(dateFrom, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const date2 = dayjs(dateTo, 'YYYY-MM-DDTHH:mm:ssZ[Z]');

  return date2.diff(date1);
};

const humanizeDuration = (currentDuration) => {
  if (dayjs.duration(currentDuration).asDays() < 1 && dayjs.duration(currentDuration).asHours() < 1) {
    return dayjs.duration(currentDuration).format('mm[M]');
  } else if (dayjs.duration(currentDuration).asDays() < 1) {
    return dayjs.duration(currentDuration).format('HH[H] mm[M]');
  }

  return dayjs.duration(currentDuration).format('DD[D] HH[H] mm[M]');
};

const getCostEventType = (pointEvents, type) => pointEvents.filter((pointEvent) => pointEvent.type === type)
  .reduce((sum, pointEvent) => sum + pointEvent.basePrice, 0);

const getCountEventsType = (pointEvents, type) => pointEvents.filter((pointEvent) => pointEvent.type === type).length;

const getSpendTime = (events, type) => events.filter((event) => event.type === type)
  .reduce((sum, event) => sum + calculateDuration(event), 0);
export {
  getCostEventType,
  getCountEventsType,
  getSpendTime,
  humanizeDuration
};
