<template>
  <div
    ref="component"
    class="card-list"
  >
    <PhotoCard
      v-for="card in cards"
      :key="card.alt"
      :href="card.href"
      :image="card.image"
      :image-alt="card.alt"
      :title="card.title"
      :sub-title="card.description"
      :link="card.linkText"
      :link-props="card.linkProps"
      class="col-md-4"
    />
  </div>
</template>

<script>
import PhotoCard from './PhotoCard.vue';
import { createScrollTimeline, killScrollTimeline } from '../utils/animation';

export default {
  name: 'CardList',

  components: { PhotoCard },

  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      scrollScene: null,
    };
  },

  mounted() {
    this.scrollScene = createScrollTimeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 90%',
        once: true,
      },
    });
  },

  beforeUnmount() {
    killScrollTimeline(this.scrollScene);
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &.show {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
