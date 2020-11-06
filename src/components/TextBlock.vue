<template>
  <div
    ref="component"
    class="text-block col-md-8 offset-md-2"
  >
    <h3 v-if="title">
      {{ title }}
    </h3>
    <div
      v-if="body"
      v-html="body"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default {
  name: 'TextBlock',

  props: {
    title: {
      type: String,
      default: null,
    },
    body: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      scrollScene: null,
    };
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

  beforeCreate() {
    gsap.registerPlugin(ScrollTrigger);
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
  .text-block {
    opacity: 0;
    transition: var(--transition-page);
    transform: translateY(var(--spacing-lg));

    &.show {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
