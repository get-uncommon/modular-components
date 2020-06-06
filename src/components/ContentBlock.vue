<template>
  <div>
    <div
      v-if="title || intro"
      class="col-md-8 offset-md-2"
    >
      <h2 v-if="title">
        {{ title }}
      </h2>
      <p
        v-if="intro"
        class="h4"
      >
        {{ intro }}
      </p>
    </div>
    <div
      v-if="img"
      class="col-md-10 offset-md-1"
    >
      <img
        :src="img"
        :alt="imgAlt"
      >
    </div>
    <p
      v-if="body"
      class="col-md-8  offset-md-2 h5 u-margin-top-lg"
    >
      {{ body }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContentBlock',

  props: {
    title: {
      type: String,
      default: null,
    },
    intro: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      default: null,
    },
    imgAlt: {
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
