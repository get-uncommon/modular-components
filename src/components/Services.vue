<template>
  <div class="services">
    <div class="services__bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <h1 class="services__title u-margin-bottom-xl">
              {{ title }}
            </h1>
            <div class="row">
              <div
                v-for="service in services"
                :key="service.title"
                class="col-md-4 u-margin-bottom-xl"
              >
                <h3>{{ service.title }}</h3>
                <p>{{ service.body }}</p>
                <Button
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
import Button from './Button.vue';

export default {
  name: 'Services',

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
};
</script>

<style scoped lang="scss">
$offset: 89px;
$offsetMob: 72px;

.services {
  display: grid;
  padding-top: $offsetMob;

  @include media-breakpoint-up(lg) {
    padding-top: $offset;
  }

  &__bg {
    width: 100%;
    background-color: var(--color-light);
  }

  &__title {
    margin-top: -#{$offsetMob};

    @include media-breakpoint-up(lg) {
      margin-top: -#{$offset};
    }
  }
}

.u-margin-bottom-xl {
  @include media-breakpoint-down(sm) {
    margin-bottom: var(--spacing-lg);
  }
}
</style>
