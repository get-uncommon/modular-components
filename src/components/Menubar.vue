<template>
  <div
    class="menubar"
    :class="showMenubar && 'menubar--show'"
  >
    <div class="menubar__container">
      <div class="menubar__left">
        <img
          v-if="logo"
          :src="logo.src"
          :alt="logo.alt"
        >
      </div>
      <div class="menubar__right">
        <nav
          v-if="primaryLinks"
          class="menubar__link--primary__wrapper"
        >
          <ul class="menubar__links">
            <li
              v-for="link in primaryLinks"
              :key="link.text"
              class="menubar__link__wrapper"
            >
              <component
                :is="link.as ? link.as : 'a'"
                v-bind="link.props"
                class="menubar__link menubar__link--primary"
                :class="{active: link.active}"
              >
                {{ link.text }}
              </component>
            </li>
          </ul>
        </nav>
        <button
          id="hamburger"
          class="menubar__hamburger"
          :class="{active: menuActive}"
        />
      </div>
      <nav
        class="menubar__dropdown"
        :class="{show: menuActive}"
      >
        <ul class="menubar__links u-margin-bottom-md">
          <li
            v-for="link in secondaryLinks"
            :key="link.text"
          >
            <component
              :is="link.as ? link.as : 'a'"
              class="h2 menubar__link menubar__link--dropdown menubar__link--big"
              :class="{active: link.active}"
              v-bind="link.props"
            >
              {{ link.text }}
            </component>
          </li>
        </ul>
        <ul class="menubar__links">
          <li
            v-for="link in tertiaryLinks"
            :key="link.text"
          >
            <component
              :is="link.as ? link.as : 'a'"
              class="h4 menubar__link menubar__link--dropdown"
              :class="{active: link.active}"
              v-bind="link.props"
            >
              {{ link.text }}
            </component>
          </li>
        </ul>
        <ul class="menubar__links">
          <li>
            <a
              :is="link.as ? link.as : 'a'"
              v-for="link in socialLinks"
              :key="link.alt"
              :href="link.href"
              v-bind="link.props"
              class="menubar__dropdown__social"
            >
              <img
                :src="link.src"
                :alt="link.alt"
              >
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar',

  props: {
    logo: {
      type: Object,
      default: () => null,
    },
    primaryLinks: {
      type: Array,
      default: () => null,
    },
    secondaryLinks: {
      type: Array,
      default: () => null,
    },
    tertiaryLinks: {
      type: Array,
      default: () => null,
    },
    socialLinks: {
      type: Array,
      default: () => null,
    },
  },

  data() {
    return {
      menuActive: false,
      showMenubar: true,
      lastScrollPosition: 0,
    };
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll);
    document.body.addEventListener('click', this.toggleMenu);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    document.body.removeEventListener('click', this.toggleMenu);
  },

  methods: {
    toggleMenu(event) {
      if (event.target.id === 'hamburger') {
        this.menuActive = !this.menuActive;
      } else {
        this.menuActive = false;
      }
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition >= 0) {
        this.showMenubar = currentScrollPosition < this.lastScrollPosition;
        this.lastScrollPosition = currentScrollPosition;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menubar {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: var(--menu-bar-height);
  justify-content: stretch;
  background-color: var(--color-tertiary);
  transition: $transition-base;
  transform: translateY(-100%);

  &--show {
    transform: translateY(0);
  }

  &__container {
    display: flex;
    position: relative;
    width: 100%;
    max-width: var(--menu-container-width);
    height: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }

  &__right {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__hamburger {
    position: relative;
    z-index: 1;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-top: 2px solid var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
    transition: $transition-base;
    transform: scaleY(.5);

    &::after,
    &::before {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 100%;
      height: 1px;
      content: '';
      background-color: var(--color-primary);
      opacity: 0;
      transition: $transition-base;
      transform: translateX(-50%);
    }

    &::before {
      top: 0;
      bottom: inherit;
    }

    &:hover,
    &:focus {
      border-top: 1px solid var(--color-primary);
      border-bottom: 1px solid var(--color-primary);
      outline: 0;
      transform: scaleY(1);

      &::before,
      &::after {
        opacity: 1;
        transform: translateY(18px) translateX(-50%);
      }

      &::after {
        transform: translateY(-19px) translateX(-50%);
      }
    }

    &.active {
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      transform: scaleY(1);

      &::before,
      &::after {
        background-color: var(--color-light);
        opacity: 1;
        transform: translate(-50%, 19px) translateY(0) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -18px) translateY(0) rotate(-45deg);
      }

      &:hover,
      &:focus {
        &::before,
        &::after {
          transform: translateY(18px) translateX(-50%);
        }

        &::after {
          transform: translateY(-19px) translateX(-50%);
        }
      }
    }
  }

  &__dropdown {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: var(--menu-overlay-width);
    padding: var(--menu-bar-height) var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
    pointer-events: none;
    background-color: var(--color-primary);
    opacity: 0;
    transition: $transition-base;
    transform: translateY(-50px);

    &.show {
      pointer-events: all;
      opacity: 1;
      transform: translateY(0);
    }

    &__social {
      display: inline-block;
      margin-top: var(--spacing-md);
      margin-right: var(--spacing-md);
    }
  }

  &__links {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    &__wrapper {
      display: inline-block;
    }

    display: inline-block;
    position: relative;
    color: var(--color-primary);
    text-decoration: none;

    &--primary {
      margin-right: var(--spacing-lg);
      font-weight: var(--font-weight-bold);

      @include media-breakpoint-down(sm) {
        display: none;
      }
    }

    &--dropdown {
      color: var(--color-light);

      &--primary {
        display: none;

        @include media-breakpoint-down(sm) {
          display: inline-block;
        }
      }
    }

    &::after {
      position: absolute;
      bottom: 5px;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 1px;
      content: '';
      background-color: currentColor;
      opacity: 0;
      transition: $transition-base;
      transform: scale3d(0, 1, 1);
    }

    &.active,
    &:focus,
    &:hover {
      outline: 0;

      &::after {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }

    &--big {
      margin-bottom: var(--spacing-md);
    }
  }
}
</style>