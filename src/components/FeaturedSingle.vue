<template>
  <div
    ref="parallaxContainer"
    class="featured-single"
  >
    <div
      ref="nodeHigher"
      class="col-md-6 col-11 offset-1 featured-single__img"
    >
      <AdvancedImage
        :src="mainImage"
        :alt="mainImageAlt"
        :options="{
          small: {
            w: 450,
            h: 450,
            q: 80,
            fit: 'fill'
          },
          large: {
            w: 800,
            h: 800,
            q: 90,
            fit: 'fill'
          },
        }"
      />
    </div>
    <div class="col-md-5 col-12 order-3 order-md-0 u-margin-top-xl featured-single__content">
      <h2 v-if="title">
        {{ title }}
      </h2>
      <p
        v-if="body"
        class="featured-single__paragraph"
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
    <div
      ref="nodeLower"
      class="col-md-4 col-6  featured-single__img featured-single__img--lower"
    >
      <AdvancedImage
        :src="secondaryImage"
        :alt="secondaryImageAlt"
        :options="{
          small: {
            w: 250,
            h: 250,
            q: 80,
            fit: 'fill'
          },
          large: {
            w: 450,
            h: 450,
            q: 90,
            fit: 'fill'
          },
        }"
      />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button.vue';
import AdvancedImage from './AdvancedImage.vue';

export default {
  name: 'FeaturedSingle',

  components: { Button, AdvancedImage },

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

  data() {
    return {
      scrollScene: null,
      scrollSceneClass: null,
    };
  },

  beforeCreate() {
    gsap.registerPlugin(ScrollTrigger);
  },

  mounted() {
    const { nodeLower, nodeHigher } = this.$refs;

    this.scrollSceneClass = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.parallaxContainer,
        toggleClass: 'show',
        once: true,
        start: 'top 90%',
      },
    });

    this.scrollScene = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.parallaxContainer,
        start: 'top 90%',
        end: '+=200%',
        scrub: true,
      },
    });

    this.scrollScene
      .to(nodeHigher, {
        y: 200,
        force3D: true,
      })
      .to(nodeLower, {
        y: -250,
        force3D: true,
      }, 0);
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

.featured-single {
  @media (min-width: $breakpoint-sm) {
    margin-bottom: calc(1px - var(--spacing-xl) - 1px);
  }

  padding-top: var(--spacing-lg);
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &__wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &__img {
    display: flex;
    position: relative;
    margin-top: calc(1px - var(--spacing-xl) - 1px);
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
  }

  &__paragraph {
    width: 75%;
  }

  &__content {
    opacity: 0;
    transition: var(--transition-page);
    transition-delay: var(--transition-page-fast);
    transform: translateY(var(--spacing-lg));
  }

  @media (max-width: $breakpoint-sm) {
    .u-margin-top-xl {
      padding-top: var(--spacing-lg);
    }
  }

  &.show {
    opacity: 1;
    transform: translateY(0);

    .featured-single__content {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
