<template>
  <div
    ref="component"
    class="featured-double"
  >
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
              :href="item.href"
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
import { ScrollScene } from 'scrollscene';
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

  data() {
    return {
      scrollScene: null,
    };
  },

  mounted() {
    this.scrollScene = new ScrollScene({
      triggerElement: this.$refs.component,
    });

    this.scrollScene.Scene.on('enter', () => {
      if (!this.$refs.component.classList.contains('show')) {
        this.$refs.component.classList += ' show';
      }
    });
  },

  beforeDestroy() {
    this.scrollScene.destroy();
  },
};
</script>

<style lang="scss" scoped>
.featured-double {
  opacity: 0;
  transition: var(--transition-page);

  &__wrapper {
    margin-bottom: var(--spacing-md);

    &:nth-child(2) {
      margin-top: var(--spacing-xl);
    }

    &:nth-child(odd) {
      // Get the negative value of --spacing-xl
      margin-top: calc((1px - var(--spacing-xl)) - 1px);
    }

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
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
    transition: var(--transition-page);
    transform: translateY(var(--spacing-lg));

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
      transition: var(--transition-base);
      transform: translate(-50%, -50%) scale(1.05);
    }

    &__title {
      font-weight: var(--font-weight-bold);
      opacity: .5;
      transition: var(--transition-base);
    }

    &__header {
      width: 100%;
      max-width: 320px;
      color: var(--color-light);
    }

    &:hover,
    &:focus {
      outline: 0;

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
    }
  }

  &.show {
    opacity: 1;

    .featured-double__item {
      transform: translateY(0);
    }
  }
}
</style>
