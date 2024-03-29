<template>
  <div
    ref="component"
    class="featured-header"
  >
    <h1 class="col-md-8 mx-auto featured-header__title">
      {{ title }}
    </h1>
    <div
      v-if="img"
      class="col-md-10 offset-md-1"
    >
      <div class="featured-header__image">
        <AdvancedImage
          :src="img"
          :alt="imgAlt"
        />
      </div>
    </div>
    <div class="featured-header__bottom">
      <div
        v-if="body"
        class="col-md-8 mx-auto h4 u-margin-top-lg u-margin-bottom-lg"
        v-html="body"
      />
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button.vue';
import AdvancedImage from './AdvancedImage.vue';

export default {
  name: 'FeaturedHeaderBlock',

  components: { Button, AdvancedImage },

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

  data() {
    return {
      scrollScene: null,
    };
  },

  beforeCreate() {
    gsap.registerPlugin(ScrollTrigger);
  },

  mounted() {
    this.scrollScene = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 90%',
        once: true,
      },
    });
  },

  beforeDestroy() {
    if (this.scrollScene) {
      this.scrollScene.kill();

      if (this.scrollScene.scrollTrigger) {
        this.scrollScene.scrollTrigger.kill();
      }
    }
  },
};
</script>

<style lang="scss">
@import '../assets/scss/config/breakpoints';

.featured-header {
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &__title {
    position: relative;
    z-index: 1;
    margin-bottom: -4px;
    text-align: center;

    @media (min-width: $breakpoint-xl) {
      margin-bottom: -16px;
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
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      object-fit: cover;
    }
  }

  &__bottom {
    text-align: center;
    opacity: 0;
    transition: var(--transition-page);
    transition-delay: var(--transition-page-fast);
    transform: translateY(var(--spacing-lg));
  }

  &.show {
    opacity: 1;
    transform: translateY(0);

    .featured-header__bottom {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
