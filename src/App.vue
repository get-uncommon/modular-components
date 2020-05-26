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
      <div class="row u-margin-top-lg u-margin-bottom-xl">
        <FeaturedHeaderBlock
          title="a new model for companies"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper aliquam iaculis. Pellentesque eu nisi euismod lorem malesuada aliquet."
          :img="require('@/assets/images/Training_Fitlab.jpg')"
          button-text="lees verder"
          :button-props="{icon: 'arrow'}"
        />
      </div>
      <FeaturedSingle
        :main-image="require('@/assets/images/business_fitlab.png')"
        main-image-alt="Wow cool image"
        :secondary-image="require('@/assets/images/training_for_her.png')"
        secondary-image-alt="Wowowo what an image"
        title="A new model for building companies"
        body="This is going to be the paragraph text but it is quite long so I will just keep on typing for just a second in order to fill some more space on this paragraph."
        button-text="lees verder"
        :button-props="{type: 'anchor', icon: 'arrow'}"
        class="row"
      />
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
    <PhotoSlider
      class="u-margin-bottom-xl"
      :slides="[
        {
          image: require('@/assets/images/Photo_slide.png'),
          alt: '1'
        },
        {
          image: require('@/assets/images/Photo_slide.png'),
          alt: '2'
        },
        {
          image: require('@/assets/images/Photo_slide.png'),
          alt: '3'
        },
        {
          image: require('@/assets/images/Photo_slide.png'),
          alt: '4'
        },
      ]"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import FeaturedHeaderBlock from '@/components/FeaturedHeaderBlock.vue';
import TextBlocks from '@/components/TextBlocks.vue';
import PhotoSlider from '@/components/PhotoSlider.vue';

export default {
  name: 'App',

  components: {
    PhotoSlider,
    Button,
    FeaturedHeaderBlock,
    TextBlocks,
  },
};
</script>
