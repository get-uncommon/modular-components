<template>
  <div :class="`message message--${type}`">
    {{ message }}
  </div>
</template>


<script>
export default {
  name: 'Message',

  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
    },
  },
};
</script>

<style scoped lang="scss">
.message {
  display: inline-flex;
  height: var(--message-height);
  align-items: center;
  margin-right: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  padding-right: var(--message-padding);
  padding-left: var(--message-padding);
  font-weight: var(--action-font-weight);
  border-radius: var(--message-border-radius);

  &--error {
    color: var(--color-danger);
    border: 1px solid var(--color-danger);
  }

  &--success {
    color: var(--color-success);
    border: 1px solid var(--color-success);
  }
}
</style>
