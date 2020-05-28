<template>
  <div>
    <div class="photo-slider">
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
          el: '.photo-slider__pagination',
          clickable: true,
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
$slider-width: calc(50vw + 600px);

.photo-slider {
  position: relative;
  width: 100%;
  max-width: $slider-width;
  height: 0;
  padding-bottom: 40%;
  overflow: hidden;
  cursor: grab;

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

    @include media-breakpoint-up(md) {
      justify-content: flex-end;
    }

    @include media-breakpoint-up(xl) {
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
        transition: $transition-base;
        transform: translateY(-50%) scale3d(0, 1, 1);
      }

      &:focus {
        outline: 0;
      }

      &-active::after,
      &:focus::after,
      &:hover::after {
        opacity: 1;
        transform: translateY(-50%) scale3d(1, 1, 1);
      }
    }
  }
}

</style>
