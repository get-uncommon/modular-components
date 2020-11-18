<template>
  <div>
    <div
      ref="component"
      class="photo-slider"
    >
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
      >
        <swiper-slide
          v-for="slide in slides"
          :key="slide.alt"
          class="photo-slider__slide"
        >
          <img
            :src="slide.image"
            :alt="slide.alt"
          >
        </swiper-slide>
      </swiper>
    </div>
    <div
      slot="pagination"
      class="photo-slider__pagination u-margin-top-md"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default {
  name: 'PhotoSlider',

  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    slides: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      scrollScene: null,
      swiperOptions: {
        pagination: {
          el: '.photo-slider__pagination',
          clickable: true,
        },
      },
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
    if (this.$refs.mySwiper && this.$refs.mySwiper.$swiper) {
      this.$refs.mySwiper.$swiper.destroy();
    }

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

$slider-width: calc(50vw + 600px);

.photo-slider {
  position: relative;
  width: 100%;
  max-width: $slider-width;
  height: 0;
  padding-bottom: 40%;
  overflow: hidden;
  cursor: grab;
  opacity: 0;
  transition: var(--transition-page);
  transition-property: transform, opacity;
  transform: translateY(var(--spacing-lg));

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  &__slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--color-dark);
    transition: .5s;
    transform: scale(.9);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .75;
      transition: .5s;
    }
  }

  &__pagination {
    display: flex;
    max-width: $slider-width;
    justify-content: center;
    padding-right: var(--spacing-md);
    padding-left: var(--spacing-md);

    @media (min-width: $breakpoint-md) {
      justify-content: flex-end;
    }

    @media (min-width: $breakpoint-xl) {
      padding-right: 0;
      padding-left: 0;
    }
  }

  .swiper-slide-active {
    transform: scale(1);

    img {
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
// Includes global styles for the slider.
.photo-slider {
  .swiper-wrapper {
    display: flex;
    position: absolute;
    height: 100%;
    box-sizing: content-box;
  }

  &__pagination {
    .swiper-pagination-bullet {
      position: relative;
      width: 70px;
      height: 12px;
      margin-left: 16px;
      overflow: hidden;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: var(--color-secondary);
        transform: translateY(-50%);
      }

      &::after {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: var(--color-primary);
        opacity: 0;
        transition: var(--transition-base);
        transform: translate(-100%, -50%);
      }

      &:focus {
        outline: 0;
      }

      &-active::after,
      &:focus::after,
      &:hover::after {
        opacity: 1;
        transform: translate(0, -50%);
      }
    }
  }
}

</style>
