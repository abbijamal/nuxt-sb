
<script>
import { ipoint, IPoint } from '@js-basics/vector';

IPoint.prototype.toCSSVars = function (name = 'ipoint') {
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
    }
  },

  mounted () {
    this.$emit('mounted', this.$el);
  },

  render () {
    try {
      const slot = this.$slots.default[0];
      slot.data.domProps = {
        ...slot.data.domProps,
        index: this.index
      };
      slot.data.style = {
        ...slot.data.style,
        ...this.offset.toCSSVars('offset'),
        ...this.position.toCSSVars('pos')
      };
      return slot;
    } catch (e) {
      throw new Error(e);
    }
  }
};

</script>

<style lang="postcss" scoped>
div.item {
  --x: calc(var(--offset-x) * 100%);
  --y: calc(var(--offset-y) * 100%);

  display: flex;
  grid-row-start: calc(var(--pos-y) + 1);
  grid-column-start: calc(var(--pos-x) + 1);
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 10em;
  box-shadow: 0 2px 2px 0 rgba(173, 173, 173, 1);
  transform: translateX(var(--x)) translateY(var(--y));

  @nest .scroll-mirror.scroll-vertical:not(.scroll-horizontal) & {
    transform: translateX(var(--x)) translateY(var(--y)) rotateZ(180deg);
  }

  @nest .scroll-mirror.scroll-horizontal:not(.scroll-vertical) & {
    transform: translateX(calc(var(--x) * -1)) translateY(var(--y));
  }

  @nest .scroll-mirror.scroll-vertical.scroll-horizontal & {
    transform: translateX(calc(var(--x) * -1)) translateY(var(--y)) rotateX(180deg);
  }
}
</style>
