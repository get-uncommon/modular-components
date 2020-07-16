<template>
  <component
    :is="as"
    v-if="as"
    :class="buttonClasses"
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
    :class="buttonClasses"
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
    :class="buttonClasses"
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
import '../icons/arrow';
import VueSVGIcon from 'vue-svgicon';

export default {
  name: 'Button',

  components: {
    svgicon: VueSVGIcon,
  },

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
    light: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonClasses() {
      return `c-button c-button--${this.type}  ${this.icon && `c-button--${this.type}--with-icon`} ${this.light && `c-button--${this.type}--light`}`;
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
  height: var(--button-height);
  align-items: center;
  padding-right: var(--button-padding);
  padding-left: var(--button-padding);
  overflow: hidden;
  font-size: var(--font-size-button);
  font-style: normal;
  font-weight: var(--action-font-weight);
  line-height: 1;
  color: var(--button-color);
  text-decoration: none;
  cursor: pointer;
  background-color: var(--button-background-color);
  border-radius: var(--button-border-radius);

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--button-background-color);
    opacity: 0;
    transition: var(--transition-base);
    transform: translateX(-100%);
  }

  &__icon {
    width: 16px;
    height: 12px;
    margin-left: var(--spacing-sm);
    transition: var(--transition-base);
    transform: translateX(0);
  }

  /* Setting button icon positions */
  &--bordered .c-button__icon {
    fill: var(--button-background-color);
  }

  &--bordered--light .c-button__icon {
    fill: var(--button-color);
  }

  &:focus,
  &:hover {
    outline: 0;

    &::after {
      opacity: 1;
      transform: translateX(0);
    }

    .c-button__icon {
      transform: translateX(8px);
    }
  }

  /* Bordered button */
  &--bordered {
    padding: 22px 48px;
    color: var(--button-background-color);
    background-color: transparent;
    border: 1px solid var(--button-background-color);
    transition: var(--transition-base);

    &::after {
      background-color: var(--button-background-color);
    }

    &:focus,
    &:hover {
      color: var(--button-color);

      .c-button__icon {
        fill: var(--button-color);
      }
    }

    &--light {
      color: var(--button-color);
      border: 1px solid var(--button-color);

      &::after {
        background-color: var(--button-color);
      }

      &:focus,
      &:hover {
        color: var(--button-background-color);

        .c-button__icon {
          fill: var(--button-background-color);
        }
      }
    }
  }

  /* Anchor link */
  &--anchor {
    height: auto;
    padding: 0;
    overflow: hidden;
    color: var(--anchor-color);
    background-color: transparent;
    border-radius: 0;

    &::after {
      top: auto;
      bottom: 0;
      height: 1px;
      background-color: currentColor;
    }

    &--with-icon {
      padding: 0 var(--spacing-sm) 0 0;

      &::after {
        width: calc(100% - 28px - var(--spacing-sm));
      }
    }
  }
}
</style>
