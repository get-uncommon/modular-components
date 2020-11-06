<template>
  <div
    ref="component"
    class="static-cards"
  >
    <h1 class="static-cards__title col-md-8">
      {{ title }}
    </h1>
    <div class="col-md-4 order-2 order-md-0">
      <div
        v-if="buttonText"
        class="row static-cards__button__wrapper"
      >
        <Button
          v-bind="buttonProps"
        >
          {{ buttonText }}
        </Button>
      </div>
    </div>
    <component
      :is="card.as ? card.as : 'a'"
      v-for="card in cards"
      :key="card.title"
      class="col-md-4 static-cards__card"
      :href="card.url"
      v-bind="card.props"
    >
      <div class="static-cards__card__image__wrapper">
        <img
          class="static-cards__card__image"
          :src="card.image"
          :alt="card.imageAlt"
        >
      </div>
      <div class="static-cards__card__subtitle">
        {{ card.subTitle }}
      </div>
      <h3>{{ card.title }}</h3>
    </component>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import Button from './Button.vue';

export default {
  name: 'StaticCards',

  components: { Button },

  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: null,
    },
    buttonProps: {
      type: Object,
      default: () => {},
    },
    cards: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.scrollScene = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
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

<style scoped lang="scss">
@import '../assets/scss/config/breakpoints';

.static-cards {
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &__button {
    &__wrapper {
      height: 100%;
      flex-direction: row-reverse;
      align-items: center;
      order: 2;
      margin-right: 0;

      @media (max-width: $breakpoint-sm) {
        align-items: baseline;
        justify-content: center;
        padding-bottom: var(--spacing-md);
      }
    }
  }

  &__card {
    text-decoration: none;
    opacity: 0;
    transition: var(--transition-page);
    transition-delay: var(--transition-page-fast);
    transform: translateY(var(--spacing-lg));

    @media (max-width: $breakpoint-sm) {
      margin-bottom: var(--spacing-md);
    }

    &__subtitle {
      margin-top: var(--spacing-sm);
      color: var(--color-secondary);

      @media (min-width: $breakpoint-md) {
        margin-top: var(--spacing-md);
      }
    }

    &__image {
      position: absolute;
      top: 50%;
      left: 50%;
      width: auto;
      min-width: 100%;
      height: auto;
      min-height: 100%;
      transition: var(--transition-base);
      transform: translate(-50%, -50%) scale(1.05);
      object-fit: cover;

      &__wrapper {
        position: relative;
        overflow: hidden;

        &::after {
          display: block;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          content: '';
        }
      }
    }

    &:hover,
    &:focus {
      outline: 0;

      .static-cards__card__image {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  &.show {
    opacity: 1;
    transform: translateY(0);

    .static-cards__card {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
