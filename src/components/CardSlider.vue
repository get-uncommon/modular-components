<template>
  <div
    ref="component"
    class="card-slider"
  >
    <Swiper
      v-bind="swiperOptions"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="slide in slides"
        :key="slide.alt"
        class="card-slider__slide"
      >
        <PhotoCard
          :image="slide.image"
          :image-alt="slide.alt"
          :title="slide.title"
          :sub-title="slide.description"
          :link="slide.linkText"
          :link-props="slide.linkProps"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import PhotoCard from './PhotoCard.vue';
import {
  createScrollTimeline,
  killScrollTimeline,
  markRawInstance,
} from '../utils/animation';

export default {
  name: 'CardSlider',

  components: {
    Swiper,
    SwiperSlide,
    PhotoCard,
  },

  props: {
    slides: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      },
      scrollScene: null,
      swiper: null,
    };
  },

  mounted() {
    this.scrollScene = createScrollTimeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 90%',
        once: true,
      },
    });
  },

  beforeUnmount() {
    this.swiper?.destroy(true, true);
    killScrollTimeline(this.scrollScene);
  },

  methods: {
    onSwiper(swiper) {
      this.swiper = markRawInstance(swiper);
    },
  },
};
</script>

<style scoped lang="scss">
.card-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: url('../assets/images/slider-cursor.svg') 50 25, auto;
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &.show {
    opacity: 1;
    transform: translateX(0);
  }

  &__slide {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  &:hover {
    a {
      color: currentColor;
      text-decoration: none;
    }
  }
}
</style>

<style lang="scss">
// Includes global styles for the slider.
.card-slider {
  .swiper-wrapper {
    display: inline-flex;
    height: 100%;
    box-sizing: content-box;
  }
}

</style>
