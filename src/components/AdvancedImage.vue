<template>
  <picture>
    <source
      :srcset="webp.large"
      type="image/webp"
      media="(min-width: 800px)"
    >
    <source
      v-if="!isPng"
      :srcset="jpg.large"
      type="image/jpeg"
      media="(min-width: 800px)"
    >
    <source
      v-if="isPng"
      :srcset="png.large"
      type="image/png"
      media="(min-width: 800px)"
    >
    <source
      :srcset="webp.small"
      media="(max-width: 799px)"
      type="image/webp"
    >
    <source
      v-if="!isPng"
      :srcset="jpg.small"
      media="(max-width: 799px)"
      type="image/jpeg"
    >
    <source
      v-if="isPng"
      :srcset="png.small"
      media="(max-width: 799px)"
      type="image/png"
    >
    <img
      ref="img"
      :src="isPng ? png.small : jpg.small"
      :alt="alt"
      :class="imageClass"
    >
  </picture>
</template>

<script>
import queryString from 'query-string';

export default {
  name: 'Visual',

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: 'Foto',
    },
    options: {
      type: Object,
      default: () => {},
    },
    isPng: {
      type: Boolean,
      default: false,
    },
    imageClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      defaultOptions: {
        small: {
          q: 80,
          w: 800,
        },
        large: {
          q: 90,
          w: 1400,
        },
      },
      jpgFormat: {
        fl: 'progressive',
        fm: 'jpg',
      },
      pngFormat: {
        fm: 'png',
      },
      webpFormat: {
        fm: 'webp',
      },
    };
  },
  computed: {
    mergedOptions() {
      return { ...this.defaultOptions, ...this.options };
    },
    jpg() {
      return {
        small: `${this.src}?${queryString.stringify({ ...this.mergedOptions.small, ...this.jpgFormat })}`,
        large: `${this.src}?${queryString.stringify({ ...this.mergedOptions.large, ...this.jpgFormat })}`,
      };
    },
    png() {
      return {
        small: `${this.src}?${queryString.stringify({ ...this.mergedOptions.small, ...this.pngFormat })}`,
        large: `${this.src}?${queryString.stringify({ ...this.mergedOptions.large, ...this.pngFormat })}`,
      };
    },
    webp() {
      return {
        small: `${this.src}?${queryString.stringify({ ...this.mergedOptions.small, ...this.webpFormat })}`,
        large: `${this.src}?${queryString.stringify({ ...this.mergedOptions.large, ...this.webpFormat })}`,
      };
    },
  },
};
</script>
