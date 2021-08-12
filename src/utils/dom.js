import { RenderPosition } from '@utils/const';
import Abstract from '@view/abstract';

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const newContainer = document.createElement('div');
  newContainer.innerHTML = template;

  return newContainer.firstElementChild;
};

const replace = (place, toItem, fromItem) => {
  if (place instanceof Abstract) {
    place = place.getElement();
  }

  return place.replaceChild(toItem.getElement(), fromItem.getElement());
};

export {
  render,
  createElement,
  replace
};
