<template>
  <div>
    <div class="container u-margin-bottom-lg u-margin-top-lg">
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
      <div class="row u-margin-top-lg">
        <FeaturedHeaderBlock
          title="a new model for companies"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam iaculis. Pellentesque eu nisi euismod lorem malesuada aliquet."
          :img="require('@/assets/images/Training_Fitlab.jpg')"
          button-text="lees verder"
          :button-props="{icon: 'arrow'}"
        />
      </div>
    </div>
    <TextBlocks
      class="u-margin-bottom-xl"
      title="a new model for building companies"
      :services="[
        {
          title: 'Nempe porem facero eatibusae',
          body: 'In egestas quis lectus ut mollis. Proin tincidunt diam at nisl bibendum rutrum. Sed condimentum diam faucibus, congue' +
            ' odio ut, vestibulum enim. Integer eu ex nisl. Nam blandit scelerisque purus a elementum. Vestibulum efficitur pellentesque lorem.',
          buttonText: 'Lees meer',
          buttonProps: {icon: 'arrow'},
        },
          {
          title: 'Lorum porem facero eatibusae',
          body: 'In egestas quis lectus ut mollis. Proin tincidunt diam at nisl bibendum rutrum. Sed condimentum diam faucibus, congue' +
            ' odio ut, vestibulum enim. Integer eu ex nisl. Nam blandit scelerisque purus a elementum. Vestibulum efficitur pellentesque lorem.',
          buttonText: 'Lees meer',
          buttonProps: {icon: 'arrow'},
        },
          {
          title: 'Donor porem facero eatibusae',
          body: 'In egestas quis lectus ut mollis. Proin tincidunt diam at nisl bibendum rutrum. Sed condimentum diam faucibus, congue',
          buttonText: 'Lees meer',
          buttonProps: {icon: 'arrow'},
        },
      ]"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import FeaturedHeaderBlock from '@/components/FeaturedHeaderBlock.vue';
import TextBlocks from './components/TextBlocks.vue';

export default {
  name: 'App',

  components: {
    Button,
    FeaturedHeaderBlock,
    TextBlocks,
  },
};
</script>
