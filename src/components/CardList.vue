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
import PhotoCard from './PhotoCard.vue';

import Scrollmagic from '../mixins/scrollscene';

export default {
  name: 'CardList',

  components: { PhotoCard },

  mixins: [Scrollmagic],

  props: {
    cards: {
      type: Array,
      default: () => [],
    },
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
