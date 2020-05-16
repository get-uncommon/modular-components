<template>
  <button
    v-if="!href"
    :class="`c-button c-button--${type} ${className}`"
    :onClick="action"
  >
    <slot />
    <i
      v-if="icon"
      class="c-button__icon"
    />
  </button>
  <a
    v-else
    :href="href"
    :class="`c-button c-button--${type} ${className}`"
    :onClick="action"
  >
    <slot />
    <i
      v-if="icon"
      class="c-button__icon"
    />
  </a>
</template>

<script>
export default {
  name: 'Button',

  props: {
    type: {
      type: String,
      default: 'cta',
    },
    action: {
      type: Function,
      default: () => null,
    },
    href: {
      type: String,
      default: null,
    },
    className: {
      type: String,
      default: null,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
/* Main CTA button */
.c-button {
  display: inline-block;
  position: relative;
  z-index: 1;
  padding: 22px 55px;
  overflow: hidden;
  font-style: normal;
  font-weight: bold;
  line-height: 1;
  color: var(--color-light);
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color-primary);
  border-radius: 9999px;

  @include get-font-size(button);

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--color-dark);
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
    background-color: currentColor;
    transition: $transition-base;
    transform: translate(-50%, -50%);
    -webkit-mask: url(../assets/images/arrow.svg) no-repeat center;
    mask: url(../assets/images/arrow.svg) no-repeat center;

    path {
      fill: currentColor;
      stroke: currentColor;
    }
  }

  /* Setting button icon positions */
  &--bordered .c-button__icon {
    right: 16px;
    background-color: var(--color-primary);
  }
  &--anchor .c-button__icon { right: -4px; }

  &:hover {
    &::after {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    .c-button__icon {
      right: 13px;
    }
  }

  /* Bordered button */
  &--bordered {
    padding: 22px 48px;
    color: var(--color-primary);
    background-color: transparent;
    border: 1px solid var(--color-primary);
    transition: $transition-base;

    &::after {
      background-color: var(--color-primary);
    }

    &:hover {
      color: var(--color-light);

      .c-button__icon {
        right: 10px;
        background-color: var(--color-light);
      }
    }
  }

  /* Anchor link */
  &--anchor {
    padding: 0 28px 0 0;
    overflow: visible;
    color: var(--color-primary);
    background-color: transparent;
    border-radius: 0;

    &::after {
      top: auto;
      bottom: 0;
      width: calc(100% - 28px);
      height: 1px;
      background-color: currentColor;
    }

    &:hover .c-button__icon {
      right: -12px;
    }
  }
}
</style>
