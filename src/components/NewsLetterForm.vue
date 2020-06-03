<template>
  <div class="news-letter">
    <h1>{{ title }}</h1>
    <p v-if="body">
      {{ body }}
    </p>
    <form>
      {{ nameText }}
      <input type="text">
      {{ emailText }}
      <input type="text">
      <Button>{{ buttonText }}</Button>
    </form>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {

  components: { Button },

  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: null,
    },
    nameText: {
      type: String,
      required: true,
    },
    emailText: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    successText: {
      type: String,
      required: true,
    },
    failText: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">

.news-letter {
  background-color: var(--color-light);
}
</style>
