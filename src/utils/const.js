import dayjs from 'dayjs';

const DATE_FORMAT = {
  MONTH_DAY: 'MMM DD',
  HOURS_MINUTE: 'HH:mm',
};

const ZERO = '0';

const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const TOWNS = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OPTIONS = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car ',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Travel by train',
  'Add meal',
  'Choose seats',
];

const createFormatForDate = (date, format) => dayjs(date).format(format);

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

const getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);

const getDurationTime = (dateTo, dateFrom) => {
  const result = getDate(dateTo) - getDate(dateFrom);

  const hours = ((result / 3600000));
  const minutes = (((result % 86400000) % 3600000) / 60000);

  const isHours = `${hours < 10 ? ZERO + hours : hours}`;
  const isMinutes = `${minutes < 10 ? ZERO + minutes : minutes}`;

  return `${isHours}:${isMinutes}`;
};

export {
  POINT_TYPES,
  TOWNS,
  DESCRIPTIONS,
  OPTIONS,
  DATE_FORMAT,
  createFormatForDate,
  capitalizeFirstLetter,
  getDate,
  getDurationTime
};
