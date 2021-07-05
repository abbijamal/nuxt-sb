
import {
  hydrateWhenIdle,
  hydrateWhenVisible
} from 'vue-lazy-hydration';

export function getAsyncComponents (componentsData, initialVisibleComponents = 1) {
  return componentsData.map((item, index) => {
    const asyncLoad = () => import('@/components/organisms/' + item.component);
    item.data.options = item.data.options || {};
    if (index >= initialVisibleComponents) {
      return {
        asyncComponent: hydrateWhenVisible(
          asyncLoad,
          { observerOptions: { rootMargin: '100px' } }
        ),
        data: item.data
      };
    }
    item.data.options = Object.assign(item.data.options, {
      visible: true
    });
    const a = hydrateWhenIdle(asyncLoad);
    // console.log('TEST', a);
    return {
      asyncComponent: (...args) => {
        const result = a(...args);
        if (result.then) {
          return result.then((r) => {
            r.default.data = () => {
              return {
                critical: true
              };
            };
            // r.default.font = () => {
            //   return {
            //     test: 123
            //   };
            // };
            console.log('HIRRA', r);
            return r;
          });
        } else {
          return result;
        }
      },
      data: item.data
    };
  });
}
