<template>
  <div
    class="services"
  >
    <div
      ref="component"
      class="services__bg"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <h1 class="services__title u-margin-bottom-xl">
              {{ title }}
            </h1>
            <div class="row services__blocks">
              <div
                v-for="service in services"
                :key="service.title"
                class="col-md-4 u-margin-bottom-xl"
              >
                <h3>{{ service.title }}</h3>
                <p>{{ service.body }}</p>
                <Button
                  v-if="service.buttonText && service.buttonText"
                  type="anchor"
                  v-bind="service.buttonProps"
                >
                  {{ service.buttonText }}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button.vue';

export default {
  name: 'TextBlocks',

  components: { Button },

  props: {
    title: {
      type: String,
      required: true,
    },
    services: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      scrollScene: null,
    };
  },

  beforeCreate() {
    gsap.registerPlugin(ScrollTrigger);
  },

  mounted() {
    this.scrollScene = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 90%',
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

<style scoped lang="scss">
@import '../assets/scss/config/breakpoints';

$offset: 89px;
$offset-mob: 72px;

.services {
  display: grid;
  padding-top: $offset-mob;

  @media (min-width: $breakpoint-lg) {
    padding-top: $offset;
  }

  &__blocks {
    opacity: 0;
    transition: var(--transition-page);
    transition-delay: var(--transition-page-fast);
    transform: translateY(var(--spacing-lg));
  }

  &__bg {
    position: relative;
    width: 100%;
    opacity: 0;
    transition: var(--transition-page);
    transform: translateY(var(--spacing-lg));

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      background-color: var(--color-light);
      transition: var(--transition-page);
      transform: translateX(-100%);
    }

    &.show {
      opacity: 1;
      transform: translateY(0);

      .services__blocks {
        opacity: 1;
        transform: translateY(0);
      }

      &::after {
        transform: translateX(0);
      }
    }
  }

  &__title {
    margin-top: -#{$offset-mob};

    @media (min-width: $breakpoint-lg) {
      margin-top: -#{$offset};
    }
  }
}

.u-margin-bottom-xl {
  @media (max-width: $breakpoint-sm) {
    margin-bottom: var(--spacing-lg);
  }
}
</style>
