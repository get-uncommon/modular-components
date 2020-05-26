<template>
  <div class="featured-single">
    <div class="col-md-6 col-11 offset-1 featured-single__img">
      <img
        :src="mainImage"
        :alt="mainImageAlt"
      >
    </div>
    <div class="col-md-5 col-12 order-3 order-md-0 u-margin-top-xl">
      <h2>{{ title }}</h2>
      <p class="featured-single__paragraph">
        {{ body }}
      </p>
      <Button v-bind="buttonProps">
        {{ buttonText }}
      </Button>
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
import ScrollMagic from 'scrollmagic';
import gsap, { TimelineMax } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, gsap);

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

  mounted() {
    const domNode = document.querySelector('.featured-single:not(.parallax)');

    if (domNode) {
      domNode.classList.add('parallax');

      const childHigher = domNode.querySelector('.featured-single__img:not(.featured-single__img--lower)');
      const childLower = domNode.querySelector('.featured-single__img--lower');
      const controller = new ScrollMagic.Controller();
      const timeline = new TimelineMax();

      timeline
        .to(childHigher, 2, { y: 200 })
        .to(childLower, 2, { y: -250 }, 0)
        .add('end', 2);

      new ScrollMagic.Scene({
        triggerElement: domNode,
        duration: '200%',
        triggerHook: 'onEnter',
      })
        .setTween(timeline)
        .addTo(controller);
    }
  },

};
</script>

<style scoped lang="scss">
.featured-single {
  @include media-breakpoint-up(sm) {
    margin-bottom: calc(1px - var(--spacing-xl) - 1px);
  }

  padding-top: var(--spacing-lg);

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

    &--lower {
      margin-top: var(--spacing-lg);
    }
  }

  &__paragraph {
    width: 75%;
  }

  @include media-breakpoint-down(sm) {
    .u-margin-top-xl {
      margin-top: calc(1px - var(--spacing-lg) - 1px);
    }
  }
}
</style>
