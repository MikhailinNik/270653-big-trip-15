import Abstract from '@view/abstract';

const RenderPosition = {
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const newContainer = document.createElement('div');
  newContainer.innerHTML = template;

  return newContainer.firstElementChild;
};

const replace = (place, secondItem, firstItem) => {
  if (place instanceof Abstract) {
    place = place.getElement();
  }

  return place.replaceChild(secondItem.getElement(), firstItem.getElement());
};

export {
  RenderPosition,
  render,
  createElement,
  replace
};
