<template>
  <div
    class="input"
    :class="{ 'error' : error }"
  >
    <label class="input__field--label">
      <input
        v-model="value"
        class="input__field"
        :class="{active: inputActive}"
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
      value: '',
      error: false,
    };
  },

  methods: {
    blur(event) {
      this.$data.inputActive = event.currentTarget.value !== '';
    },
    getValue() {
      return this.value;
    },
    setValue(newValue) {
      this.value = newValue;
      this.$data.inputActive = newValue !== '';
    },
    setError(errorValue) {
      this.error = errorValue;
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
    padding: var(--input-padding);
    transition: var(--transition-base);
    transform: translateY(-50%) scale(1);
    -webkit-transform-origin-x: 0;
  }

  &__field {
    width: 100%;
    padding: var(--input-padding);
    font-size: var(--font-size-input);
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid var(--input-color);
    transition: var(--transition-base);

    &--label {
      width: 100%;
    }

    &:focus,
    &.active {
      border-bottom: 1px solid var(--input-color-active);
      outline: 0;

      + span {
        transform: translateY(-115%) scale(.75);
      }
    }
  }

  &.error {
    .input {
      &__field {
        color: var(--color-danger);
        border-bottom: 1px solid var(--color-danger);
      }

      &__label {
        color: var(--color-danger);
      }
    }
  }
}
</style>
