<template>
  <div class="row">
    <h1 class="col-md-8 offset-2 header__title">
      {{title}}
    </h1>
    <div class="col-md-10 offset-1">
      <div class="header__image">
        <img
          :src="img"
          :alt="imgAlt"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedHeaderBlock',

  props: {
    title: {
      type: String,
      required: true,
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

<style lang="scss" scoped>
  .header {
    &__title {
      position: relative;
      z-index: 1;
      margin-bottom: -12px;
    }

    &__image {
      position: relative;
      width: 100%;
      padding-bottom: 66%;
      overflow: hidden;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
      }
    }
  }
</style>
