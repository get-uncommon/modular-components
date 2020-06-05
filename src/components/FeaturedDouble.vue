<template>
  <div class="featured-double">
    <div
      v-for="item in items"
      :key="item.title"
      class="col-md-6 featured-double__wrapper"
    >
      <a
        class="featured-double__item"
        :href="item.href"
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.imageAlt"
          class="featured-double__item__image"
        >
        <div class="featured-double__item__content">
          <div class="featured-double__item__title">
            {{ item.title }}
          </div>
          <div>
            <h3 class="featured-double__item__header">
              {{ item.header }}
            </h3>
            <Button
              type="bordered"
              :light="true"
              v-bind="item.buttonProps"
            >
              {{ item.buttonText }}
            </Button>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'FeaturedDouble',
  components: { Button },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.featured-double {
  &__wrapper:last-child {
    margin-top: var(--spacing-xl);
  }

  &__item {
    display: block;
    position: relative;
    height: 0;
    padding-bottom: 105%;
    overflow: hidden;
    color: var(--color-light);
    cursor: pointer;
    background-color: var(--color-primary);

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      width: 100%;
      height: 100%;
      pointer-events: none;
      content: '';
      border: 2px solid var(--color-light);
      opacity: 0;
      transition: $transition-base;
      transform: translate(-50%, -50%) scale(1);
    }

    &__content {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      padding: var(--spacing-lg);
    }

    &__image {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .8;
      transition: $transition-base;
      transform: translate(-50%, -50%) scale(1.05);
    }

    &__title {
      font-weight: var(--font-weight-bold);
      opacity: .5;
      transition: $transition-base;
    }

    &__header {
      width: 100%;
      max-width: 320px;
      color: var(--color-light);
    }

    &:hover {
      .featured-double__item {
        &__title {
          opacity: 1;
        }

        &__image {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        &__header {
          text-decoration: underline;
        }
      }

      &::after {
        opacity: 1;
        transform: translate(-50%, -50%) scale(.95);
      }
    }
  }
}
</style>
