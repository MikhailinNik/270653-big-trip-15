const DateFormat = {
  MONTH_DAY: 'MMM DD',
  HOURS_MINUTE: 'HH:mm',
  DAY: 'DD',
  HOUR: 'HH',
  MINUTE: 'mm',
  DATE_TIME: 'DD/MM/YYYY hh:mm',
};

const KeyboardKey = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const FormEditMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const FormMode = {
  EDIT: 'EDIT',
  ADD: 'ADD',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

export {
  DateFormat,
  KeyboardKey,
  FormEditMode,
  SortType,
  FormMode,
  UserAction,
  UpdateType,
  FilterType
};
