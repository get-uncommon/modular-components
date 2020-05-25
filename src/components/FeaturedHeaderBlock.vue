<template>
  <div class="row">
    <h1 class="col-md-8 offset-md-2 header__title">
      {{ title }}
    </h1>
    <div v-if="img" class="col-md-10 offset-md-1">
      <div class="header__image">
        <img
          :src="img"
          :alt="imgAlt"
        >
      </div>
    </div>
    <div class="header__bottom">
      <p
        v-if="body"
        class="col-md-8 offset-md-2 h4 u-margin-top-lg u-margin-bottom-lg"
      >
        {{ body }}
      </p>
      <Button
        v-if="buttonText"
        v-bind="buttonProps"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'FeaturedHeaderBlock',

  components: { Button },

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
    buttonText: {
      type: String,
      default: null,
    },
    buttonProps: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  &__title {
    position: relative;
    z-index: 1;
    margin-bottom: -4px;
    text-align: center;

    @include media-breakpoint-up(xl) {
      margin-bottom: -12px;
    }
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

  &__bottom {
    text-align: center;
  }
}
</style>
