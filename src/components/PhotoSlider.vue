<template>
  <div class="photo-slider">
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
    >
      <swiper-slide v-for="slide in slides" :key="slide.alt" class="photo-slider__slide">
        <img :src="slide.image" :alt="slide.alt" />
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>
  </div>
</template>

<script>

export default {
  name: 'PhotoSlider',

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
          el: '.swiper-pagination',
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
.photo-slider {
  position: relative;
  width: 100%;
  max-width: calc(50vw + 600px);
  height: 0;
  margin-bottom: 200px;
  padding-bottom: 40%;
  overflow: hidden;
  cursor: grab;

  &__slide {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
