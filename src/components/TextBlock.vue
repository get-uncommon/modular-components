<template>
  <div class="col-md-8 offset-md-2">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <p v-if="body">
      {{ body }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextBlock',

  props: {
    title: {
      type: String,
      default: null,
    },
    body: {
      type: String,
      default: null,
    },
  },
};
</script>
