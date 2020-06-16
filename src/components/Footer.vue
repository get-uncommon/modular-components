<template>
  <footer class="footer">
    <div class="container">
      <nav
        v-if="primaryLinks"
        class="footer__menu footer__menu--primary"
      >
        <ul>
          <li
            v-for="link in primaryLinks"
            :key="link.href"
          >
            <component
              :is="link.as ? link.as : 'a'"
              class="footer__menu__item h2"
              :class="link.active && 'active'"
              v-bind="link.props"
            >
              {{ link.text }}
            </component>
          </li>
        </ul>
      </nav>
      <nav
        v-if="secondaryLinks"
        class="footer__menu footer__menu--primary"
      >
        <ul>
          <li
            v-for="link in secondaryLinks"
            :key="link.href"
          >
            <component
              :is="link.as ? link.as : 'a'"
              class="footer__menu__item footer__menu__item--secondary h4"
              :class="link.active && 'active'"
              v-bind="link.props"
            >
              {{ link.text }}
            </component>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',

  props: {
    primaryLinks: {
      type: Array,
      default: null,
    },
    secondaryLinks: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  color: var(--color-light);
  background-color: var(--color-primary);

  ul {
    padding: 0;
    list-style: none;
  }

  &__menu {
    margin-top: var(--spacing-lg);

    &__item {
      display: inline-block;
      position: relative;
      margin-bottom: var(--spacing-md);
      overflow: hidden;
      color: var(--color-light);
      text-decoration: none;
      opacity: .5;
      transition: $transition-base;

      &--secondary {
        margin-bottom: 0;
      }

      &::after {
        position: absolute;
        bottom: 4px;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: var(--color-light);
        opacity: 0;
        transition: $transition-base;
        transform: translateX(-100%);
      }

      &:hover,
      &:focus,
      &.active {
        outline: 0;
        opacity: 1;

        &::after {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
