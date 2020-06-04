<template>
  <div class="news-letter">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-1">
          <h1 class="news-letter__title">
            {{ title }}
          </h1>
          <p
            v-if="body"
            class="h5 u-margin-bottom-md"
          >
            {{ body }}
          </p>
          <form
            class="news-letter__form"
            @submit="submit"
          >
            <Input
              ref="nameInput"
              :input-props="{
                type: 'text',
              }"
              :label="nameText"
              class="u-margin-bottom-md"
            />
            <Input
              ref="emailInput"
              :input-props="{
                type: 'text',
                'v-model': 'email'
              }"
              :label="emailText"
              class="u-margin-bottom-md"
            />
            <Button
              v-bind="buttonProps"
              class="u-margin-right-md u-margin-bottom-md"
            >
              {{ buttonText }}
            </Button>
            <Message
              v-if="success"
              type="success"
              :message="success"
            />
            <Message
              v-for="error in errors"
              :key="error"
              :message="error"
              type="error"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailValidator from 'email-validator';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import Message from '@/components/Message.vue';

export default {
  name: 'NewsLetterForm',

  components: { Message, Input, Button },

  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: null,
    },
    nameText: {
      type: String,
      required: true,
    },
    emailText: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonProps: {
      type: Object,
      default: () => {},
    },
    successText: {
      type: String,
      required: true,
    },
    failText: {
      type: Object,
      required: true,
    },
    submitHandler: {
      type: Function,
      default: () => null,
    },
  },

  data() {
    return {
      errors: [],
      success: null,
    };
  },

  methods: {
    submit(event) {
      event.preventDefault();

      this.success = null;
      this.errors = [];
      this.$refs.nameInput.setError(false);
      this.$refs.emailInput.setError(false);

      const name = this.$refs.nameInput.getValue();
      const email = this.$refs.emailInput.getValue();


      const validEmail = emailValidator.validate(email);
      if (name && email && validEmail) {
        this.success = this.successText;
        this.submitHandler({ name, email });
      } else {
        if (!validEmail) {
          this.errors.push(this.failText.email);
          this.$refs.emailInput.setError(true);
        }
        if (!(name && email)) {
          this.errors.push(this.failText.required);
          this.$refs.nameInput.setError(!name);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
$offset: 89px;
$offset-mob: 72px;

.news-letter {
  margin-top: $offset-mob;
  padding-bottom: var(--spacing-xl);
  background-color: var(--color-light);

  @include media-breakpoint-up(lg) {
    margin-top: calc(#{$offset} + var(--spacing-lg));
  }

  &__title {
    margin-top: -#{$offset-mob};

    @include media-breakpoint-up(lg) {
      margin-top: -#{$offset};
    }
  }
}
</style>
