<template>
  <div class="input">
    <label>
      <input
        :class="`input__field ${inputActive && 'active'}`"
        v-bind="inputProps"
        @blur="blur"
      >
      <span class="input__label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Input',

  props: {
    inputProps: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      inputActive: false,
    };
  },

  methods: {
    blur(event) {
      this.$data.inputActive = event.currentTarget.value !== '';
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  position: relative;
  font-size: var(--font-size-input);

  &__label {
    position: absolute;
    top: 50%;
    left: 0;
    transition: $transition-base;
    transform: translateY(-50%) scale(1);
  }

  &__field {
    width: 100%;
    padding: var(--input-padding);
    font-size: var(--font-size-input);
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid var(--input-color);

    &:focus,
    &.active {
      border-bottom: 1px solid var(--input-color-active);
      outline: 0;

      + span {
        transform: translateY(-110%) scale(.75);
      }
    }
  }
}
</style>
