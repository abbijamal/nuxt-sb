<template>
  <infinite-scroll :mirror="Boolean(false)" :toggle="Boolean(false)" :grid-x="Number(1)" :grid-y="Number(10)">
    <template v-slot:item="props" lang="html">
      <div class="item">
        hello {{ props.index.x }} {{ props.index.y }}
      </div>
    </template>
    <template v-slot:toggle-button="props" lang="html">
      <button @click="props.click">
        more
      </button>
    </template>
  </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/molecules/InfiniteScroll';

export default {
  components: {
    InfiniteScroll
  }
};
</script>

<style>

</style>
