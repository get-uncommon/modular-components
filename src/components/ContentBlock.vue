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
      <p
        v-if="intro"
        class="h4"
      >
        {{ intro }}
      </p>
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
    <p
      v-if="body"
      class="col-md-8  offset-md-2 h5 u-margin-top-lg"
    >
      {{ body }}
    </p>
  </div>
</template>

<script>
import { ScrollScene } from 'scrollscene';

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

  date() {
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
