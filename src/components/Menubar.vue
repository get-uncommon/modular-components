<template>
  <div
    class="menubar"
    :class="{
      'menubar--show': showMenubar,
      active: menuActive
    }"
  >
    <div class="menubar__container">
      <component
        :is="logo.as ? logo.as : 'div'"
        v-bind="logo.props"
        class="menubar__left"
      >
        <img
          v-if="logo"
          :src="logo.src"
          :alt="logo.alt"
          class="menubar__logo"
        >
      </component>
      <nav
        v-if="primaryLinks"
        class="menubar__link--primary__wrapper"
        :class="{'hide--mobile': !menuActive}"
      >
        <ul class="menubar__links">
          <li
            v-for="(link, index) in primaryLinks"
            :key="link.text"
            class="menubar__link__wrapper"
          >
            <component
              :is="link.as ? link.as : 'a'"
              v-bind="link.props"
              class="menubar__link menubar__link--primary"
              :data-index="index"
              :class="{active: link.active}"
            >
              {{ link.text }}
            </component>
            <nav
              v-if="link.dropdown"
              class="menubar__link--primary__dropdown"
              :class="{open: menuDropdownsOpen[index]}"
              :data-test="index"
            >
              <ul class="menubar__link--primary__dropdown--wrapper">
                <li
                  v-for="dropdownItem in link.dropdown"
                  :key="dropdownItem.text"
                >
                  <component
                    :is="dropdownItem.as ? dropdownItem.as : 'a'"
                    v-bind="dropdownItem.props"
                    class="menubar__link menubar__link--primary__dropdown--link"
                    :class="{active: dropdownItem.active}"
                  >
                    {{ dropdownItem.text }}
                  </component>
                </li>
              </ul>
            </nav>
            <svgicon
              v-if="link.dropdown"
              class="menubar__link--primary__icon"
              :class="{open: menuDropdownsOpen[index]}"
              icon="triangle"
              height="10"
              width="10"
            />
          </li>
        </ul>
      </nav>
      <button
        id="hamburger"
        class="menubar__hamburger"
        :class="{
          active: menuActive,
          'hide-desktop': !(secondaryLinks || tertiaryLinks),
        }"
      />
      <nav
        v-if="secondaryLinks || tertiaryLinks"
        class="menubar__dropdown"
        :class="{'show': menuActive}"
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
              :key="link.icon"
              :href="link.href"
              v-bind="link.props"
              class="menubar__dropdown__social"
            >
              <svgicon
                :icon="link.icon"
                height="20"
                width="20"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import '../icons/facebook';
import '../icons/instagram';
import '../icons/linkedin';
import '../icons/triangle';
import VueSVGIcon from 'vue-svgicon';

export default {
  name: 'Menubar',

  components: {
    svgicon: VueSVGIcon,
  },

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
      menuDropdownsOpen: new Array(this.$props.primaryLinks.length).fill(false),
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
      const clickOnDropdownItem = event.target.parentElement.getElementsByTagName('nav').length > 0;
      if (event.target.id === 'hamburger') {
        this.menuActive = !this.menuActive;
      } else if (!clickOnDropdownItem) {
        this.menuActive = false;
      }

      if (clickOnDropdownItem) {
        const index = event.target.getAttribute('data-index');
        this.menuDropdownsOpen[index] = !this.menuDropdownsOpen[index];

        // Update the array in the template.
        this.menuDropdownsOpen = this.menuDropdownsOpen.slice();
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
@import '../assets/scss/config/breakpoints';
$menuPrimaryDropdownOverlay: 50px;

.menubar {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  max-height: var(--menu-bar-height);
  justify-content: stretch;
  color: var(--menu-bar-link-color);
  background-color: var(--menu-bar-color);
  transition: var(--transition-base);
  transform: translateY(var(--menu-bar-negative-height));

  @media screen and  (max-width: $breakpoint-sm) {
    min-height: var(--menu-bar-height);
    overflow: auto;
    background-color: transparent;

    &.active {
      max-height: 100%;
    }
  }

  &__left {
    margin-right: auto;
  }

  &--show {
    transform: translateY(0);
  }

  &.active {
    @media screen and (max-width: $breakpoint-sm) {
      transform: translateY(0);
    }
  }

  &__container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    background-color: var(--menu-bar-color);

    @media screen and (max-width: $breakpoint-sm) {
      height: auto;
      flex-wrap: wrap;
    }
  }

  &__logo {
    width: auto;
    height: var(--menu-logo-height);
  }

  &__hamburger {
    position: relative;
    z-index: 1;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-top: 2px solid var(--color-primary);
    border-bottom: 2px solid var(--color-primary);
    transition: var(--transition-base);
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
      transition: var(--transition-base);
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
        opacity: 1;
        transform: translate(-50%, 19px) translateY(0) rotate(30deg);
      }

      &::after {
        transform: translate(-50%, -18px) translateY(0) rotate(-30deg);
      }

      &:hover {
        &::before,
        &::after {
          transform: translateY(18px) translateX(-50%);
        }

        &::after {
          transform: translateY(-19px) translateX(-50%);
        }
      }
    }

    &.hide-desktop {
      display: none;

      @media (max-width: $breakpoint-sm) {
        display: block;
      }
    }
  }

  &__links {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__dropdown {
    position: absolute;
    right: var(--spacing-md);
    bottom: 0;
    width: 100%;
    max-width: var(--menu-overlay-width);
    padding: var(--menu-bar-height) var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
    pointer-events: none;
    background-color: var(--menu-bar-dropdown-color);
    opacity: 0;
    transition: var(--transition-base);
    transform: translateY(110%);

    .menubar__links {
      overflow: hidden;
    }

    @media (max-width: $breakpoint-sm) {
      right: 0;
      max-width: 100%;
      padding: var(--spacing-lg) var(--spacing-md);
    }

    &.show {
      pointer-events: all;
      opacity: 1;
      transform: translateY(100%);
    }

    &__social {
      display: inline-block;
      margin-top: var(--spacing-md);
      margin-right: var(--spacing-md);

      svg {
        fill: var(--color-light);
      }
    }
  }

  &__link {
    &__wrapper {
      display: inline-block;
      position: relative;

      @media (max-width: $breakpoint-sm) {
        display: block;
      }
    }

    position: relative;
    color: var(--color-primary);
    text-decoration: none;

    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }

    &--primary {
      position: relative;
      z-index: 1;
      margin: 0 var(--spacing-md);
      font-weight: var(--font-weight-bold);

      @media (max-width: $breakpoint-sm) {
        position: initial;
        margin: 0;
      }

      &__icon {
        position: absolute;
        top: calc(105%);
        left: 50%;
        transform: translateX(-50%);

        @media (max-width: $breakpoint-sm) {
          top: var(--spacing-sm);
          right: var(--spacing-md);
          left: auto;
          transition: var(--transition-base);
          transform: translateY(-33%) rotateX(0deg);
        }
      }

      &__icon.open {
        @media (max-width: $breakpoint-sm) {
          transform: translateY(-50%) rotateX(180deg);
        }
      }

      &__dropdown {
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: 999;
        min-width: var(--menu-bar-primary-dropdown-width);
        margin-top: calc(var(--spacing-lg) + #{$menuPrimaryDropdownOverlay});
        font-size: var(--menu-bar-primary-dropdown-font-size);
        font-weight: var(--font-weight-bold);
        text-align: center;
        visibility: hidden;
        opacity: 0;
        transition: var(--transition-base);
        transition-delay: .5s;
        transform: translateY(-15px) translateX(-50%);

        li {
          border-bottom: 1px solid var(--menu-bar-primary-dropdown-border-color);
        }

        li:last-of-type {
          border-bottom: 0;
        }

        &--link {
          display: block;
          padding: var(--spacing-sm);
          overflow: hidden;
        }

        &--wrapper {
          padding: var(--menu-bar-primary-dropdown-padding);
          list-style: none;
          background-color: var(--color-light);
          border: 1px solid var(--menu-bar-primary-dropdown-border-color);
          border-radius: var(--menu-bar-primary-dropdown-border-radius);
        }

        &:hover {
          pointer-events: all;
          visibility: visible;
          opacity: 1;
          transform: translateY(-$menuPrimaryDropdownOverlay) translateX(-50%);
        }
      }

      @media (max-width: $breakpoint-sm) {
        &__dropdown {
          position: inherit;
          top: 0;
          left: 0;
          width: 100%;
          min-width: inherit;
          height: 100%;
          max-height: 0;
          padding: 0 0 0;
          text-align: left;
          opacity: 0;
          transition: var(--transition-base);
          transform: none;
        }

        &__dropdown--wrapper {
          padding: 0;
          background-color: transparent;
          border: 0;
        }

        &__dropdown.open {
          max-height: 500px;
          padding: 0 0 var(--spacing-sm) 0;
          pointer-events: all;
          opacity: 1;
        }

        &__dropdown li {
          border-bottom: none;
        }

        &__dropdown--link {
          padding: var(--spacing-sm) 0;
          font-size: var(--font-size-h3-responsive);
          line-height: var(--line-height-h3);
        }

        &__dropdown:hover {
          transform: none;
        }
      }

      &:hover + .menubar__link--primary__dropdown {
        pointer-events: all;
        visibility: visible;
        transition-delay: 0s;
        transform: translateY(-$menuPrimaryDropdownOverlay) translateX(-50%);

        @media (max-width: $breakpoint-sm) {
          transform: none;
        }

        @media (min-width: $breakpoint-md) {
          opacity: 1;
        }
      }

      &__wrapper {
        margin-right: var(--spacing-md);
      }

      @media (max-width: $breakpoint-sm) {
        display: inline-block;
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-h2-responsive);
        line-height: var(--line-height-h2);

        &__wrapper {
          width: 100%;
          max-height: 1000px;
          order: 3;
          margin-right: 0;
          padding: var(--spacing-md) 0;
          overflow: hidden;
          opacity: 1;
          transition: var(--transition-base);
        }

        &__wrapper.hide--mobile {
          max-height: 0;
          padding: 0;
          opacity: 0;
        }
      }
    }

    &--dropdown {
      color: var(--color-light);
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      content: '';
      background-color: currentColor;
      opacity: 0;
      transition: var(--transition-base);
      transform: translateX(-100%);

      @media (max-width: $breakpoint-sm) {
        content: none;
      }
    }

    &.active,
    &:focus,
    &:hover {
      outline: 0;

      &::after {
        opacity: 1;
        transform: translateX(0);
      }

      @media (max-width: $breakpoint-sm) {
        text-decoration: underline;
      }
    }

    &--big {
      display: inline-block;
      margin-bottom: var(--spacing-md);
    }
  }
}
</style>
