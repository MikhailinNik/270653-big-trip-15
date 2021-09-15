import { FilterType } from '@utils/const';
import { getDifferentDate } from '@utils/util';

export const filterTypeToPoints = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => getDifferentDate(point.dateFrom, new Date()) >= 0 ||
  getDifferentDate(point.dateFrom, new Date()) < 0 && getDifferentDate(point.dateTo, new Date() > 0)),
  [FilterType.PAST]: (points) => points.filter((point) => getDifferentDate(point.dateTo, new Date()) < 0 ||
  getDifferentDate(point.dateFrom, new Date()) < 0 && getDifferentDate(point.dateTo, new Date()) > 0),
};
