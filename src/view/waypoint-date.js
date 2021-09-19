import { DateFormat } from '@utils/const';
import { getDurationToMilliseconds, getLeadingZero, formatDate } from '@utils/util';

const getTypeTemplate = (eventType) => (
  `<div class="event__type">
    <img class="event__type-icon"
    width="42" height="42"
    src="img/icons/${eventType}.png"
    alt="Event ${eventType} icon">
  </div>`
);

export const formatDuration = (millisecond) => {
  const { days, hours, minutes } = getDurationToMilliseconds(millisecond);

  if (days > 0) {
    return `${getLeadingZero(days)}D ${getLeadingZero(hours)}H ${getLeadingZero(minutes)}M`;
  }

  if (hours > 0) {
    return `${getLeadingZero(hours)}H ${getLeadingZero(minutes)}M`;
  }

  return minutes > 0 ? `${getLeadingZero(minutes)}M` : '';
};

export const createWaypointDateTemplate = (point) => {
  const {
    dateFrom = null,
    dateTo = null,
    destination = [],
    type = '',
  } = point;

  const milliseconds = dateTo - dateFrom;

  return (
    `<div class="event">
        <time class="event__date" datetime="${dateFrom.toISOString()}">
        ${formatDate(dateFrom, DateFormat.MONTH_DAY)}
        </time>
        ${getTypeTemplate(type)}
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom.toISOString()}">
          ${formatDate(dateFrom, DateFormat.HOURS_MINUTE)}
          </time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo.toISOString()}">
          ${formatDate(dateTo, DateFormat.HOURS_MINUTE)}
          </time>
        </p>
        <p class="event__duration">
        ${formatDuration(milliseconds)}
        </p>`
  );
};
