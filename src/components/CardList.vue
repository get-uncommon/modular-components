<template>
  <div class="card-list">
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
import { ScrollScene } from 'scrollscene';
import PhotoCard from './PhotoCard.vue';

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
    this.scrollScene = new ScrollScene({
      triggerElement: this.$el,
      toggle: {
        element: this.$el,
        className: 'show',
      },
    });

    // Play animation only once
    this.scrollScene.Scene.reverse(false);
  },

  beforeDestroy() {
    this.scrollScene.destroy();
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
