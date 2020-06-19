<template>
  <div>This is a card list</div>
</template>

<script>
export default {
  name: 'CardList',

  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
