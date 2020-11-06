<template>
  <div
    ref="component"
    class="content-block"
  >
    <div
      v-if="title || intro"
      class="col-md-8 offset-md-2"
    >
      <h2 v-if="title">
        {{ title }}
      </h2>
      <div
        v-if="intro"
        v-html="intro"
      />
    </div>
    <div
      v-if="img"
      class="col-md-10 offset-md-1 content-block__image__wrapper"
    >
      <img
        class="content-block__image"
        :src="img"
        :alt="imgAlt"
      >
    </div>
    <div
      v-if="body"
      class="col-md-8  offset-md-2 u-margin-top-lg"
      v-html="body"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default {
  name: 'ContentBlock',

  props: {
    title: {
      type: String,
      default: null,
    },
    intro: {
      type: String,
      default: null,
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
  },

  beforeCreate() {
    gsap.registerPlugin(ScrollTrigger);
  },

  date() {
    return {
      scrollScene: null,
    };
  },

  mounted() {
    this.scrollScene = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 80%',
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

<style lang="scss" scoped>
  .content-block {
    opacity: 0;
    transition: var(--transition-page);
    transform: translateY(var(--spacing-lg));

    &__image {
      transition: var(--transition-page);
      transform: scale(1.1);

      &__wrapper {
        overflow: hidden;
      }
    }

    &.show {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
