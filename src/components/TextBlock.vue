<template>
  <div
    ref="component"
    class="text-block col-md-8 offset-md-2"
  >
    <h3 v-if="title">
      {{ title }}
    </h3>
    <p v-if="body">
      {{ body }}
    </p>
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
      scrollSCene: null,
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
    transform: translateX(-50px);

    &.show {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
