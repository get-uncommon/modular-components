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
import { ScrollScene } from 'scrollscene';

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
