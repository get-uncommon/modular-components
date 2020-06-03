<template>
  <div class="static-cards">
    <h1 class="col-md-8">
      {{ title }}
    </h1>
    <div
      v-if="buttonText"
      class="col-md-4 order-2 order-md-0"
    >
      <div class="row static-cards__button__wrapper">
        <Button
          v-bind="buttonProps"
        >
          {{ buttonText }}
        </Button>
      </div>
    </div>
    <a
      v-for="card in cards"
      :key="card.title"
      class="col-md-4 static-cards__card"
      :href="card.url"
    >
      <div class="static-cards__card__image__wrapper">
        <img
          class="static-cards__card__image"
          :src="card.image"
          :alt="card.imageAlt"
        >
      </div>
      <div class="static-cards__card__subtitle u-margin-top-md">{{ card.subTitle }}</div>
      <h3>{{ card.title }}</h3>
    </a>
  </div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
.static-cards {
  &__button {
    &__wrapper {
      height: 100%;
      flex-direction: row-reverse;
      align-items: center;
      order: 2;
      margin-right: 0;

      @include media-breakpoint-down(sm) {
        align-items: baseline;
        justify-content: center;
        padding-bottom: var(--spacing-md);
      }
    }
  }

  &__card {
    text-decoration: none;

    @include media-breakpoint-down(sm) {
      margin-bottom: var(--spacing-md);
    }

    &__subtitle {
      color: var(--color-secondary);
    }

    &__image {
      position: absolute;
      top: 50%;
      left: 50%;
      width: auto;
      min-width: 100%;
      height: auto;
      min-height: 100%;
      transition: $transition-base;
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

        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          width: 100%;
          height: 100%;
          content: '';
          border: 1px solid var(--color-light);
          opacity: 0;
          transition: $transition-base;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }

    &:hover,
    &:focus {
      outline: 0;

      .static-cards__card__image {
        transform: translate(-50%, -50%) scale(1);

        &__wrapper::before {
          opacity: 1;
          transform: translate(-50%, -50%) scale(.9);
        }
      }
    }
  }
}
</style>
