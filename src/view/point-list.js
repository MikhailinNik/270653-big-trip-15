import AbstarctView from '@/view/abstract';

const createPointListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointList extends AbstarctView{
  getTemplate() {
    return createPointListTemplate();
  }
}
