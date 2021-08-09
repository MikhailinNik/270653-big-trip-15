import { RenderPosition } from '@utils/const';

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newContainer = document.createElement('div');
  newContainer.innerHTML = template;

  return newContainer.firstChild;
};

const replaceItem = (place, toItem, fromItem) => place.replaceChild(toItem.getElement(), fromItem.getElement());

export {
  render,
  createElement,
  replaceItem
};
