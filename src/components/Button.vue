<template>
  <button
    v-if="!href"
    :class="'button ' + type + ' ' + className"
    :onClick="action"
  >
    <slot />
    <i
      v-if="icon"
      class="button--icon"
    />
  </button>
  <a
    v-else
    :href="href"
    :class="'button ' + type + ' ' + className"
    :onClick="action"
  >
    <slot />
    <i
      v-if="icon"
      class="button--icon"
    />
  </a>
</template>

<script>

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: () => 'cta',
    },
    action: {
      type: Function,
      default: () => null,
    },
    href: {
      type: String,
      default: () => null,
    },
    className: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>

<style scoped lang="scss">
  .button {
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
      width: 0;
      height: 100%;
      content: '';
      background-color: var(--color-dark);
      opacity: 0;
      transition: $transition-base;
    }

    &--icon {
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

    &:hover {
      &::after {
        width: 100%;
        opacity: 1;
      }

      .button--icon {
        right: 13px;
      }
    }

    &.bordered {
      padding: 22px 48px;
      color: var(--color-primary);
      background-color: transparent;
      border: 1px solid var(--color-primary);

      &::after {
        background-color: var(--color-primary);
      }

      .button--icon {
        right: 16px;
      }

      &:hover {
        color: var(--color-light);

        .button--icon {
          right: 10px;
        }
      }
    }
  }
</style>
