import { ipoint, point } from '@js-basics/vector';

export default class Item {
  constructor (position) {
    this.position = position;
    this.index = position;
    this.offset = ipoint();
    this.sizeDiff = point();
    this.enlargement = {};
  }
}
