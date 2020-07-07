<template>
  <div
    ref="component"
    class="contact"
  >
    <div class="container">
      <div
        class="row"
      >
        <div class="col-md-8 offset-md-2">
          <h1 class="contact__title">
            {{ title }}
          </h1>
          <p
            v-if="body"
            class="h5 u-margin-bottom-md"
          >
            {{ body }}
          </p>
          <form
            class="contact__form"
            @submit.prevent="submit"
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
            <Input
              ref="phoneInput"
              :input-props="{
                type: 'text',
                'v-model': 'phone'
              }"
              :label="phoneText"
              class="u-margin-bottom-md"
            />
            <Input
              ref="messageInput"
              :input-props="{
                type: 'text',
                'v-model': 'message'
              }"
              :label="messageText"
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
import { ScrollScene } from 'scrollscene';
import Button from './Button.vue';
import Input from './Input.vue';
import Message from './Message.vue';

export default {
  name: 'ContactForm',

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
    messageText: {
      type: String,
      required: true,
    },
    phoneText: {
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
      scrollScene: null,
    };
  },

  mounted() {
    this.scrollScene = new ScrollScene({
      triggerElement: this.$refs.component,
    });

    this.scrollScene.Scene.on('enter', () => {
      if (!this.$refs.component.classList.contains('show')) {
        this.$refs.component.classList += ' show';
      }
    });
  },

  beforeDestroy() {
    this.scrollScene.destroy();
  },

  methods: {
    submit() {
      this.success = null;
      this.errors = [];
      this.$refs.nameInput.setError(false);
      this.$refs.emailInput.setError(false);
      this.$refs.messageInput.setError(false);

      const name = this.$refs.nameInput.getValue();
      const email = this.$refs.emailInput.getValue();
      const phone = this.$refs.phoneInput.getValue();
      const message = this.$refs.messageInput.getValue();

      const validEmail = emailValidator.validate(email);
      if (name && email && validEmail) {
        this.success = this.successText;
        this.submitHandler({
          name, email, phone, message,
        });

        this.$refs.nameInput.setValue('');
        this.$refs.emailInput.setValue('');
        this.$refs.phoneInput.setValue('');
        this.$refs.messageInput.setValue('');
      } else if (!(name && email && message)) {
        this.errors.push(this.failText.required);
        this.$refs.nameInput.setError(!name);
        this.$refs.messageInput.setError(!message);
        this.$refs.emailInput.setError(!email);
      }
      if (!validEmail && email !== '') {
        this.errors.push(this.failText.email);
        this.$refs.emailInput.setError(true);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/config/breakpoints';

$offset: 89px;
$offset-mob: 72px;

.contact {
  position: relative;
  margin-top: $offset-mob;
  padding-bottom: var(--spacing-xl);
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--color-light);
    transition: var(--transition-page);
    transform: translateX(-100%);
  }

  @media (min-width: $breakpoint-lg) {
    margin-top: calc(#{$offset} + var(--spacing-lg));
  }

  &__title {
    margin-top: -#{$offset-mob};

    @media (min-width: $breakpoint-lg) {
      margin-top: -#{$offset};
    }
  }

  &.show {
    opacity: 1;
    transform: translateY(0);

    &::after {
      transform: translateX(0);
    }
  }
}
</style>
