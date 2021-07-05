<template>
  <div class="container" :class="htmlClasses" :style="max.toCSSVars('max')">
    <list-item
      v-for="(item, index) in items.matrix.flat()"
      :key="'list-item-' + index"
      v-bind="item"
      @mounted="el => elements.push(el)"
    >
      <slot name="item" :index="item.index" />
    </list-item>
    <div v-if="toggle && !activate && scroll.vertical" class="toggle horizontal">
      <slot name="toggle-button" :click="enable" />
    </div>

    <div v-if="toggle && !activate && scroll.horizontal" class="toggle vertical">
      <slot name="toggle-button" :click="enable" />
    </div>
  </div>
</template>

<story
  name="InfiniteScroll"
  group="Molecules"
  knobs="{
    toggle: { default: boolean('toggle', false) },
    mirror: { default: boolean('mirror direction', false) },
    gridX: { default: number('items on x-axis', 1) },
    gridY: { default: number('items on y-axis', 10) }
  }">
  <infinite-scroll :mirror="mirror" :toggle="toggle" :grid-x="gridX" :grid-y="gridY">
    <template lang="html" v-slot:item="props">
      <div class="item">
        hello {{ props.index.x }} {{ props.index.y }}
      </div>
    </template>
    <template lang="html" v-slot:toggle-button="props">
      <button @click="props.click">more</button>
    </template>
  </infinite-scroll>
</story>

<script>
import { ipoint, IPoint } from '@js-basics/vector';
import IntersectionObservable from '@/classes/intersection/Observable';
import IntersectionItemList from '@/classes/intersection/ItemList';
import ListItem from '@/components/molecules/ListItem';
import { getElementRect } from '@/utils/element';

IPoint.prototype.toCSSVars = function (name = 'ipoint') {
  return {
    [`--${name}-x`]: this.x,
    [`--${name}-y`]: this.y
  };
};

export default {
  components: {
    ListItem
  },

  props: {
    mirror: {
      type: Boolean,
      default () {
        return false;
      }
    },
    gridX: {
      type: Number,
      default () {
        return 10;
      }
    },
    gridY: {
      type: Number,
      default () {
        return 10;
      }
    },
    rootElement: {
      type: global.HTMLElement,
      default () {
        // global.document.documentElement is global viewport
        return null;
      }
    },
    toggle: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },

  data () {
    const max = ipoint(this.gridX, this.gridY);
    return {
      max,
      items: this.createItemList(max),
      elements: [],
      observable: null,
      subscription: null,
      activate: false,
      scroll: {
        horizontal: false,
        vertical: false
      }
    };
  },

  computed: {
    htmlClasses () {
      return {
        'scroll-mirror': this.mirror,
        'scroll-horizontal': this.scroll.horizontal,
        'scroll-vertical': this.scroll.vertical
      };
    },
    root () {
      return this.rootElement || this.$el;
    }
  },

  mounted () {
    this.detectScrollDirections();
    this.observable = new IntersectionObservable(this.elements, {
      root: this.root,
      rootMargin: '-50% -50%'
    });

    if (!this.toggle) {
      this.scrollTo(this.getElement(this.items.getItem().index));
      this.enable();
    }
  },

  destroyed () {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  },

  methods: {
    createItemList (max) {
      const itemList = new IntersectionItemList(max, this.getTotal());
      if (!this.toggle) {
        itemList.update(this.getDeepIndex());
      }
      return itemList;
    },

    detectScrollDirections () {
      this.scroll.horizontal = this.$el.scrollWidth > this.$el.clientWidth;
      this.scroll.vertical = this.$el.scrollHeight > this.$el.clientHeight;
    },

    enable () {
      this.subscription = this.observable.subscribe((entry) => {
        if (entry.isIntersecting) {
          const index = ipoint(entry.target.index);
          if (!this.items.index.equals(index)) {
            this.items.update(index);
            this.setDeepIndex(index);
          }
        }
      });
      this.activate = true;
    },

    getElement (index) {
      return this.elements.find((el) => {
        return el.index.equals(index);
      });
    },

    getDeepIndex () {
      const query = this.$route.query;
      return ipoint(Number(query.x), Number(query.y));
    },

    setDeepIndex (index) {
      if (!this.toggle) {
        this.$router.replace({
          query: JSON.parse(index.toString())
        });
      }
    },

    scrollTo (el) {
      const child = getElementRect(el);
      const parent = getElementRect(this.root);
      const scroll = ipoint(() => Math.max(0, child.pos - parent.pos + (child.size / 2) - (parent.size / 2)));
      this.root.scrollTo(scroll.x, scroll.y);
    },

    getTotal () {
      let x = 1;
      let y = 1;
      if (this.gridX > 1) {
        x = Infinity;
      }
      if (this.gridY > 1) {
        y = Infinity;
      }
      return ipoint(x, y);
    }
  }
};
</script>

<style lang="postcss" scoped>

div.container {
  display: inline-grid;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: auto;

  &.scroll-horizontal:not(.scroll-vertical) {
    align-content: center;

    &.scroll-mirror {
      direction: rtl;
    }
  }

  &.scroll-vertical:not(.scroll-horizontal) {
    justify-content: center;

    &.scroll-mirror {
      transform: rotateZ(180deg);
      direction: rtl;
    }
  }

  &.scroll-vertical.scroll-horizontal {
    &.scroll-mirror {
      transform: rotateX(180deg);
      direction: rtl;
    }
  }
}

div.toggle {
  &.vertical {
    grid-row-start: 1;
    grid-row-end: calc(var(--max-y) + 1);
    grid-column-start: calc(var(--max-x) + 1);

    & button {
      position: sticky;
      top: 50%;
      transform: translateY(-50%);

      @nest .scroll-mirror.scroll-vertical.scroll-horizontal & {
        transform: rotateX(180deg);
      }
    }
  }

  &.horizontal {
    grid-row-start: calc(var(--max-y) + 1);
    grid-column-start: 1;
    grid-column-end: calc(var(--max-x) + 1);

    & button {
      position: sticky;
      left: 50%;
      transform: translateX(-50%);

      @nest .scroll-mirror & {
        right: 50%;
        transform: translateX(50%) rotateZ(180deg);
      }

      @nest .scroll-mirror.scroll-vertical.scroll-horizontal & {
        transform: translateX(50%) rotateX(180deg);
      }
    }
  }
}
</style>
