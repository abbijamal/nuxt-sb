import { ipoint } from '@js-basics/vector';

export default class ItemList {
  constructor (max, total) {
    this.length = max;
    this.matrix = Array.from(Array(max.y).keys()).map((y) => {
      return Array.from(Array(max.x).keys()).map((x) => { return { index: ipoint(x, y), position: ipoint(x, y), offset: ipoint() }; });
    });
    this.total = total;
    this.index = ipoint();
  }

  getItem (index = this.index) {
    const { x, y } = ipoint(() => Math.round((index + this.length) % this.length));
    return this.matrix[Number(y)][Number(x)];
  }

  getItemOffset (index) {
    return ipoint(() => Math.floor(index / this.length) * this.length);
  }

  update (currentIndex) {
    const availableRange = ipoint(() => Math.floor((this.length) / 2));
    for (let y = -availableRange.y; y <= availableRange.y; y++) {
      for (let x = -availableRange.x; x <= availableRange.x; x++) {
        this.updateItem(ipoint(() => currentIndex + ipoint(x, y)));
      }
    }
    this.index = currentIndex;
    return this;
  }

  updateItem (index) {
    const item = this.getItem(index);
    if (isInRange(index, this.total)) {
      item.index = index;
      item.offset = this.getItemOffset(index);
    }
  }
}

function isInRange (indexOfItem, total) {
  return indexOfItem.x >= 0 && indexOfItem.x < total.x && indexOfItem.y >= 0 && indexOfItem.y < total.y;
}
