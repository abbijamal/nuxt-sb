import { Observable } from 'rxjs';
import { flatMap, distinctUntilChanged, share } from 'rxjs/operators';

export default class IntersectionObservable {
  constructor (elements, options) {
    this.observable = new Observable((observer) => {
      this.observer = createIntersectionObserver(observer, options);
      elements.forEach(e => this.observe(e));
      return () => { this.destroy(); };
    })
      .pipe(
        flatMap(entries => entries),
        distinctUntilChanged(),
        share()
      );
  }

  subscribe (...args) {
    return this.observable.subscribe(...args);
  }

  observe (el) {
    this.observer.observe(el);
  }

  unobserve (el) {
    this.observer.unobserve(el);
  }

  destroy () {
    this.observer.disconnect();
  }
};

function createIntersectionObserver (observer, options = null) {
  return new global.IntersectionObserver((entries) => {
    observer.next(entries);
  }, options);
}
