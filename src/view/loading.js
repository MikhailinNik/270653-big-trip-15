import AbstractView from '@view/abstract.js';

const createNoEventsTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoEventsTemplate();
  }
}
