
<script>
import { ipoint, IPoint, point, Point } from '@js-basics/vector';

IPoint.prototype.toCSSVars = function (name = 'ipoint') {
  return {
    [`--${name}-x`]: this.x,
    [`--${name}-y`]: this.y
  };
};

Point.prototype.toCSSVars = function (name = 'point') {
  return {
    [`--${name}-x`]: this.x,
    [`--${name}-y`]: this.y
  };
};

export default {
  abstract: true,
  props: {
    index: {
      type: IPoint,
      default () {
        return ipoint();
      }
    },
    position: {
      type: IPoint,
      default () {
        return ipoint();
      }
    },
    offset: {
      type: IPoint,
      default () {
        return ipoint();
      }
    },
    sizeDiff: {
      type: Point,
      default () {
        return point();
      }
    },
    enlargement: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data () {
    return {
      height: `${20 + rand()}em`,
      size: point(),
      history: new Map()
      // offset: ipoint()
    };
  },

  watch: {
    enlargement: {
      handler (options) {
        if (this.history.has(options.index.toString())) {
          const sizeDiff = this.history.get(options.index.toString());
          this.sizeDiff.calc(() => +sizeDiff);
          console.log('YAPP', options.index.toString(), this.sizeDiff.toString());
          options.resolve(this.sizeDiff);
        } else {
          setTimeout(() => {
            this.height = `${20 + (options.index % 10)}em`;
            this.$el.querySelector('.content').style.height = this.height;
            this.size.x = this.$el.scrollWidth / this.$el.clientWidth;
            this.size.y = this.$el.scrollHeight / this.$el.clientHeight;
            this.sizeDiff.calc(() => this.size - ipoint(1, 1));
            this.history.set(options.index.toString(), this.sizeDiff);
            console.log('Huch', options.index.toString(), this.sizeDiff.toString());
            options.resolve(this.sizeDiff);
          }, rand() * 10);
        }
      }
    },
    index: {
      handler () {
        console.log('ACG');
      }
    }
  },

  mounted () {
    this.$el.position = this.position;

    this.$emit('mounted', this.$el);
  },

  updated () {
    // console.log('UPDATE');
  },

  render () {
    // console.log('RENDER');
    try {
      const slot = this.$slots.default[0];
      slot.data.style = {
        ...slot.data.style,
        ...this.offset.toCSSVars('offset')
      };
      return slot;
    } catch (e) {
      throw new Error(e);
    }
  }
};

function rand (min = 0, max = 20) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>

<style lang="postcss" scoped>
div.item {
  --x: calc((var(--offset-x)) * 100%);
  --y: calc((var(--offset-y)) * 100%);

  display: flex;
  flex-shrink: 0;
  grid-row-start: calc(var(--pos-y) + 1);
  grid-column-start: calc(var(--pos-x) + 1);
  align-items: flex-start;

  /* align-items: center;
  justify-content: center; */
  width: 900px;
  height: 10em;
  transform: translateX(var(--x)) translateY(var(--y));

  @nest .scroll-mirror.scroll-vertical:not(.scroll-horizontal) & {
    align-items: flex-end;
    transform: translateX(var(--x)) translateY(var(--y)) rotateZ(180deg);
  }

  @nest .scroll-mirror.scroll-horizontal:not(.scroll-vertical) & {
    transform: translateX(calc(var(--x) * -1)) translateY(var(--y));
  }

  @nest .scroll-mirror.scroll-vertical.scroll-horizontal & {
    transform: translateX(calc(var(--x) * -1)) translateY(var(--y)) rotateX(180deg);
  }

  & >>> .content {
    width: 100%;
    min-height: 100%;
    box-shadow: 0 2px 2px 0 rgba(173, 173, 173, 1);
  }
}
</style>
