import { FilterType } from '@utils/const';

const getFuturePoints = (points, nowDate) => points.filter(({ dateFrom }) => dateFrom > nowDate);
const getPastPoints = (points, nowDate) => points.filter(({ dateFrom }) => dateFrom < nowDate);

export const filterTypeToPoints = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => getFuturePoints(points, Date.now()),
  [FilterType.PAST]: (points) => getPastPoints(points, Date.now()),
};
