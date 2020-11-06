<template>
  <div
    ref="component"
    class="card-slider"
  >
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import PhotoCard from './PhotoCard.vue';

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

<style scoped lang="scss">
.card-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: url(../assets/images/slider-cursor.svg) 50 25, auto;
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
