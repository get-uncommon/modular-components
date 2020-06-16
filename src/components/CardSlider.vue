<template>
  <div>
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
    <div
      slot="pagination"
      class="card-slider__pagination u-margin-top-md"
    />
  </div>
</template>

<script>
import PhotoCard from './PhotoCards.vue';

export default {
  name: 'CardSlider',
  components: { PhotoCard },
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.photo-slider__pagination',
          clickable: true,
        },
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
    cursor: url(../assets/images/slider-cursor.svg) 50 25, auto;

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
