<template>
  <div>
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

export default {
  name: 'CardList',

  components: { PhotoCard },

  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
