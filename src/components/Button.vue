<template>
  <component
    :is="as"
    v-if="as"
    :class="`c-button c-button--${type} ${icon && `c-button--${type}--with-icon`}`"
  >
    <slot />
    <svgicon
      v-if="icon"
      class="c-button__icon"
      :icon="icon"
    />
  </component>
  <button
    v-else-if="!href"
    :class="`c-button c-button--${type}  ${icon && `c-button--${type}--with-icon`}`"
  >
    <slot />
    <svgicon
      v-if="icon"
      class="c-button__icon"
      :icon="icon"
    />
  </button>
  <a
    v-else
    :href="href"
    :class="`c-button c-button--${type} ${icon && `c-button--${type}--with-icon`}`"
  >
    <slot />
    <svgicon
      v-if="icon"
      class="c-button__icon"
      :icon="icon"
    />
  </a>
</template>

<script>
import '@/icons/arrow';

export default {
  name: 'Button',

  props: {
    type: {
      type: String,
      default: 'cta',
    },
    href: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    as: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
/* Main CTA button */
.c-button {
  display: inline-flex;
  position: relative;
  z-index: 1;
  height: $button-height;
  align-items: center;
  padding-right: $button-padding;
  padding-left: $button-padding;
  overflow: hidden;
  font-style: normal;
  font-weight: $action-font-weight;
  line-height: 1;
  color: $button-color;
  text-decoration: none;
  cursor: pointer;
  background-color: $button-background-color;
  border-radius: $button-border-radius;

  @include get-responsive-font-size(button);

  @include media-breakpoint-up(xl) {
    @include get-font-size(button);
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: $button-hover-color;
    opacity: 0;
    transition: $transition-base;
    transform: scale3d(0, 1, 1);
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 21px;
    width: 16px;
    height: 12px;
    transition: $transition-base;
    transform: translate(-50%, -50%) translateX(0);
  }

  /* Setting button icon positions */
  &--bordered .c-button__icon {
    right: 16px;
    fill: var(--color-primary);
  }
  &--anchor .c-button__icon { right: -4px; }

  &:focus,
  &:hover {
    outline: 0;

    &::after {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    .c-button__icon {
      transform: translate(-50%, -50%) translateX(8px);
    }
  }

  /* Bordered button */
  &--bordered {
    padding: 22px 48px;
    color: $button-background-color;
    background-color: transparent;
    border: 1px solid $button-background-color;
    transition: $transition-base;

    &::after {
      background-color: var(--color-primary);
    }

    &:focus,
    &:hover {
      color: var(--color-light);

      .c-button__icon {
        fill: var(--color-light);
      }
    }
  }

  /* Anchor link */
  &--anchor {
    height: auto;
    padding: 0;
    overflow: visible;
    color: $anchor-color;
    background-color: transparent;
    border-radius: 0;

    &::after {
      top: auto;
      bottom: 0;
      height: 1px;
      background-color: currentColor;
    }

    &--with-icon {
      padding: 0 28px 0 0;

      &::after {
        width: calc(100% - 28px);
      }
    }
  }
}
</style>
