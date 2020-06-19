<template>
  <a
    :href="href"
    class="card"
  >
    <div class="card__image">
      <img
        :src="image"
        :alt="imageAlt"
      >
    </div>
    <div
      v-if="title"
      class="card__title"
    >
      {{ title }}
    </div>
    <div v-if="subTitle">
      {{ subTitle }}
    </div>
    <a
      v-if="link"
      v-bind="linkProps"
      class="card__link"
    >
      {{ link }}
    </a>
  </a>
</template>

<script>

export default {
  name: 'PhotoCard',

  props: {
    image: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    linkProps: {
      type: Object,
      default: () => null,
    },
    href: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding-bottom: var(--spacing-md);
  color: var(--color-primary);
  text-decoration: none;

  &__image {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 150%;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: $transition-base;
      transform: scale(1.05);
    }
  }

  &[href]:hover {
    .card__image img {
      transform: scale(1);
    }
  }

  &__title {
    margin-top: var(--spacing-md);
    font-weight: var(--font-weight-bold);
  }

  &__link {
    color: var(--color-primary);
  }
}
</style>
