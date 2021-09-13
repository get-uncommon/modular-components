<template>
  <div
    ref="component"
    class="news-letter"
  >
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
            :class="{'news-letter__form--waiting': waiting}"
            @submit.prevent="submit"
          >
            <div
              v-if="honeypotName"
              class="sr-only news-letter__honeypot"
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from './Button.vue';
import Input from './Input.vue';
import Message from './Message.vue';

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
    honeypotName: {
      type: String,
      default: '',
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

      const name = this.$refs.nameInput.getValue();
      const email = this.$refs.emailInput.getValue();

      const validEmail = emailValidator.validate(email);
      if (name && email && validEmail) {
        this.success = this.successText;

        this.waiting = true;
        await this.submitHandler({ name, email });
        this.waiting = false;

        this.$refs.nameInput.setValue('');
        this.$refs.emailInput.setValue('');
      } else if (!(name && email)) {
        this.errors.push(this.failText.required);
        this.$refs.nameInput.setError(!name);
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

.news-letter {
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
