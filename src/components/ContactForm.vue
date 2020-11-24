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
          <div
            v-if="body"
            class="h5 u-margin-bottom-md"
            v-html="body"
          />
          <form
            class="contact__form"
            :class="waiting && 'contact__form--waiting'"
            novalidate
            @submit.prevent="submit"
          >
            <div
              v-if="honeypotName"
              class="sr-only contact__honeypot"
            >
              <input
                :id="honeypotName"
                type="text"
                :name="honeypotName"
                @input="onHoneypotInput"
              >
            </div>
            <Input
              ref="nameInput"
              :input-props="{
                type: 'text',
                name: 'name',
                id: 'name'
              }"
              :label="nameText"
              class="u-margin-bottom-md"
            />
            <Input
              ref="emailInput"
              :input-props="{
                type: 'email',
                name: 'email',
                id: 'email',
                'v-model': 'email'
              }"
              :label="emailText"
              class="u-margin-bottom-md"
            />
            <Input
              ref="phoneInput"
              :input-props="{
                type: 'tel',
                name: 'phone',
                id: 'phone',
                'v-model': 'phone'
              }"
              :label="phoneText"
              class="u-margin-bottom-md"
            />
            <Input
              ref="messageInput"
              :as="messageType"
              :input-props="{
                type: 'text',
                name: 'message',
                id: 'message',
                'v-model': 'message',
                ...messageProps
              }"
              :label="messageText"
              class="u-margin-bottom-md"
            />
            <Button
              v-bind="{
                disabled: waiting,
                ...buttonProps
              }"
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
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
    messageProps: {
      type: Object,
      default: () => null,
    },
    messageType: {
      type: String,
      default: 'input',
    },
    phoneText: {
      type: String,
      required: true,
    },
    honeypotName: {
      type: String,
      default: '',
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
      default: async () => null,
    },
  },

  data() {
    return {
      errors: [],
      success: null,
      scrollScene: null,
      waiting: false,
      honeypotValue: null,
    };
  },

  beforeCreate() {
    gsap.registerPlugin(ScrollTrigger);
  },

  mounted() {
    this.scrollScene = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 90%',
        once: true,
      },
    });
  },

  beforeDestroy() {
    if (this.scrollScene) {
      this.scrollScene.kill();

      if (this.scrollScene.scrollTrigger) {
        this.scrollScene.scrollTrigger.kill();
      }
    }
  },

  methods: {
    async submit() {
      this.success = null;
      this.errors = [];
      this.$refs.nameInput.setError(false);
      this.$refs.emailInput.setError(false);
      this.$refs.messageInput.setError(false);

      const honeypot = this.honeypotValue;
      const name = this.$refs.nameInput.getValue();
      const email = this.$refs.emailInput.getValue();
      const phone = this.$refs.phoneInput.getValue();
      const message = this.$refs.messageInput.getValue();

      const validEmail = emailValidator.validate(email);
      if (name && email && validEmail) {
        this.waiting = true;

        const { success, error } = await this.submitHandler({
          honeypot, name, email, phone, message,
        });

        this.waiting = false;

        if (success) {
          this.$refs.nameInput.setValue('');
          this.$refs.emailInput.setValue('');
          this.$refs.phoneInput.setValue('');
          this.$refs.messageInput.setValue('');
          this.success = this.successText;
        } else {
          this.success = null;
          this.errors.push(error);
        }
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

    onHoneypotInput($event) {
      this.honeypotValue = $event.target.value;
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

  &__honeypot,
  &__honeypot input {
    opacity: 0;
  }

  &__form--waiting {
    opacity: .5;
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
