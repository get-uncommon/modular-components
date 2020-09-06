<template>
  <div class="card-slider">
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
    >
      <swiper-slide
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
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import PhotoCard from './PhotoCard.vue';

import Scrollmagic from '../mixins/scrollscene';

export default {
  name: 'CardSlider',

  components: {
    Swiper,
    SwiperSlide,
    PhotoCard,
  },

  mixins: [Scrollmagic],

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
    };
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
    display: table;
    position: relative;
    height: 100%;
    overflow: hidden;
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
