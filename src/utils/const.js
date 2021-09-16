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
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const listEmptyTypeToText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const ButtonText = {
  DELETE: 'Delete',
  CANCEL: 'Cancel',
};

export {
  DateFormat,
  KeyboardKey,
  FormEditMode,
  SortType,
  FormMode,
  UserAction,
  UpdateType,
  FilterType,
  listEmptyTypeToText,
  ButtonText
};
