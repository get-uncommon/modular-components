<template>
  <div>
    <div class="featured-single__wrapper">
      <div class="col-md-6 col-11 offset-1 featured-single__img">
        <img
          :src="mainImage"
          :alt="mainImageAlt"
        >
      </div>
      <div class="col-md-5">
        <h2>{{ title }}</h2>
        <p class="featured-single__paragraph">
          {{ body }}
        </p>
        <Button v-bind="buttonProps">
          {{ buttonText }}
        </Button>
      </div>
    </div>
    <div class="col-md-4 col-6  featured-single__img featured-single__img--lower">
      <img
        :src="secondaryImage"
        :alt="secondaryImageAlt"
      >
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'FeaturedSingle',

  components: { Button },

  props: {
    mainImage: {
      type: String,
      required: true,
    },
    mainImageAlt: {
      type: String,
      default: null,
    },
    secondaryImage: {
      type: String,
      required: true,
    },
    secondaryImageAlt: {
      type: String,
      default: null,
    },
    title: {
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

<style scoped lang="scss">
.featured-single {
  &__wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &__img {
    display: flex;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      object-fit: cover;
      width: calc(100% - 30px);
      max-width: none;
      height: 100%;
    }

    &::after {
      width: 100%;
      padding-bottom: 100%;
      content: '';
    }

    &--lower {
      transform: translateY(-75%);
    }
  }

  &__paragraph {
    width: 75%;
  }
}
</style>
