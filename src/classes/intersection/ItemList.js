import { ipoint } from '@js-basics/vector';
import Item from '@/classes/intersection/Item';
export default class ItemList {
  constructor (max, total, direction) {
    this.direction = direction;
    this.axis = getAxis(this.direction);
    this.max = ipoint({ [this.axis.scroll]: max.x, [this.axis.static]: max.y });
    this.matrix = getMatrix(this.max, this.axis);
    this.total = total;
  }

  async setup () {
    const globalOffset = new Array(this.max[this.axis.static]).fill(null).map(() => ipoint());
    this.matrix = await this.matrix.reduce(async (promise, scroll) => {
      const result = await promise;
      result.push(await Promise.all(
        scroll.map(async (item, index) => {
          item.offset = globalOffset[Number(index)];
          item.size = new Promise((resolve) => { item.enlargement = { resolve, index: item.index }; });
          const size = await item.size;
          globalOffset[Number(index)] = ipoint(() => size + globalOffset[Number(index)]);
          return item;
        })
      ));
      return result;
    }, Promise.resolve([]));
    return this.matrix;
  }

  async update (index) {
    const centeredItem = this.getItem(index);
    let accumulatedSlotOffsets = [
      ipoint(() => centeredItem.offset + centeredItem.sizeDiff),
      centeredItem.offset
    ];

    const availableRange = ipoint(() => Math.floor((this.max) / 2) * this.direction);
    for (let item = 0; item <= availableRange[this.axis.scroll]; item++) {
      const bidirectionalOffset = ipoint({ [this.axis.scroll]: item, [this.axis.static]: 0 });
      accumulatedSlotOffsets = await this.updateBidirectional(centeredItem, bidirectionalOffset, accumulatedSlotOffsets);
      // console.log('V', accumulatedSlotOffsets);
    }
  }

  async updateBidirectional (centeredItem, bidirectionalOffset, accumulatedSlotOffsets) {
    const test = await accumulatedSlotOffsets.reduce(async (promise, accumulatedSlotOffset, i) => {
      const result = await promise;
      const direction = i * 2 - 1;
      const offset = ipoint(() => bidirectionalOffset * direction);
      const position = ipoint(() => centeredItem.position + offset);
      const index = ipoint(() => centeredItem.index + offset);
      result.push(this.updateItem(index, position, accumulatedSlotOffset, direction));
      return result;
    }, Promise.resolve([]));
    // console.log('A', test);
    return Promise.all(test);
  }

  async updateItem (index, position, accumulatedSlotOffset, direction) {
    const item = this.getItem(index);
    // const size = ipoint(() => item.sizeDiff * direction);
    const itemSize = await item.size;
    let size = ipoint(() => itemSize * direction);
    // console.log('B', accumulatedSlotOffset);

    if (!index.equals(item.index) && isInRange(index, this.total)) {
      item.index = index;
      const xtraOffset = ipoint(() => Math.floor(position / this.max) * this.max);
      item.size = new Promise((resolve) => { item.enlargement = { resolve, index }; });
      size = await item.size;
      item.offset = calcItemOffset(direction, accumulatedSlotOffset, xtraOffset, size);
    }
    return ipoint(() => accumulatedSlotOffset + size);
  }

  getItem (pos = ipoint()) {
    const index = ipoint(() => Math.round((pos + this.max) % this.max));
    return this.matrix[index[this.axis.scroll]][index[this.axis.static]];
  }
}

function calcItemOffset (direction, accumulatedSlotOffset, xtraOffset, size) {
  direction = (direction * -1 + 1) / 2;
  return ipoint(() => accumulatedSlotOffset + xtraOffset + size * direction);
}

const axis = [
  'x', 'y'
];

function getAxis (direction) {
  return {
    scroll: axis[Number(direction.x < direction.y)],
    static: axis[Number(direction.x > direction.y)]
  };
}

function getMatrix (max, axis) {
  return Array.from(Array(max[String(axis.scroll)]).keys()).map((slot) => {
    return Array.from(Array(max[String(axis.static)]).keys()).map((item) => {
      return new Item(ipoint({ [axis.scroll]: slot, [axis.static]: item }));
    });
  });
}

function isInRange (indexOfItem, total) {
  // return indexOfItem.x >= 0 && indexOfItem.x < total.x && indexOfItem.y >= 0 && indexOfItem.y < total.y;
  return indexOfItem.x >= 0 && indexOfItem.y >= 0;
}
