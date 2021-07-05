import { Victor, ipoint } from '@js-basics/vector';

export function getElementSize (el) {
  const bounds = el.getBoundingClientRect();
  return new Victor(bounds.width, bounds.height);
}

export function getElementRect (el) {
  const elRect = el.getBoundingClientRect();
  return {
    pos: ipoint(elRect.x, elRect.y),
    size: ipoint(elRect.width, elRect.height)
  };
}
