<template>
  <div class="l-container u-margin-bottom-lg u-margin-top-lg">
    <div class="row  u-margin-bottom-lg">
      <div class="col-md-6">
        <Button icon="arrow">
          lees verder
        </Button>
      </div>
      <div class="col-md-6">
        <Button
          as="div"
          class="extra--class"
          type="bordered"
          href="#"
          target="_blank"
          icon="arrow"
        >
          bekijk meer nieuws
        </Button>
      </div>
    </div>
    <div class="row u-margin-bottom-lg">
      <div class="col-md-6">
        <Button
          type="anchor"
          icon="arrow"
        >
          Lees verder
        </Button>
      </div>
      <div class="col-md-6">
        <Button
          type="anchor"
          href="#"
        >
          bekijk meer nieuws
        </Button>
      </div>
    </div>
    <FeaturedHeaderBlock
      title="a new model for companies"
      body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam iaculis. Pellentesque eu nisi euismod lorem malesuada aliquet."
      :img="require('@/assets/images/Training_Fitlab.jpg')"
      button-text="lees verder"
      :button-props="{icon: 'arrow'}"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import FeaturedHeaderBlock from '@/components/FeaturedHeaderBlock.vue';

export default {
  name: 'App',

  components: {
    Button,
    FeaturedHeaderBlock,
  },
};
</script>
