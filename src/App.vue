<template>
  <div>
    <Menubar
      :primary-links="[
        {
          text: 'home',
          props: {href: '#1'},
          active: true,
        },
        {
          text: 'over ons',
          props: {href: '#2'},
        },
        {
          text: 'wat doen wij?',
          props: {href: '#3'},
        },
      ]"
      :secondary-links="[
        {
          text: 'home1',
          props: {href: '#4'},
          active: true,
        },
        {
          text: 'over ons1',
          props: {href: '#5'},
        },
        {
          text: 'wat doen wij?1',
          props: {href: '#6'},
          as: 'div',
        },
      ]"
      :tertiary-links="[
        {
          text: 'home2',
          props: {href: '#7'},
          active: true,
        },
        {
          text: 'over ons2',
          props: {href: '#8'},
        },
        {
          text: 'wat doen wij?2',
          props: {href: '#9'},
        },
      ]"
      :social-links="[
        {
          icon: 'facebook',
          href: '#10',
          props: {
            target: '_blank'
          }
        },
        {
          icon: 'instagram',
          href: '#11',
          props: {
            target: '_blank',
          }
        }
      ]"
      :logo="{src: require('@/assets/images/logo.png'), alt: 'Logo'}"
    />
    <div class="container u-margin-bottom-lg u-margin-top-xl">
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
      <div class="row">
        <div
          class="col-md-10 offset-md-1 u-margin-top-xl"
        >
          <VideoPlayer
            video-id="https://player.vimeo.com/video/415136952"
          />
        </div>
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
    <div class="container">
      <div class="row">
        <TextBlock
          class="u-margin-bottom-lg"
          title="Nempre porem facero eatibusae."
          body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum natoque penatibus et magnis parturient montes, nascetur ridiculus mus."
        />
      </div>
    </div>
    <PhotoSlider
      class="u-margin-bottom-lg"
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
    <div class="container">
      <StaticCards
        class="row u-margin-bottom-lg"
        title="wat ons bezighoudt"
        button-text="bekijk meer nieuws"
        :button-props="{
          icon: 'arrow',
          type: 'bordered'
        }"
        :cards="[
          {
            image: require('@/assets/images/Build_Office_3.png'),
            imageAlt: 'Ladida',
            subTitle: '4 november 2019',
            title: 'Nempre porem facero eatibusae.',
            url: '#',
          },
          {
            image: require('@/assets/images/business_fitlab.png'),
            imageAlt: 'Ladida',
            subTitle: '4 november 2019',
            title: 'Nempra porem facero eatibusae.',
            url: '#',
          },
          {
            image: require('@/assets/images/Training_Fitlab.jpg'),
            imageAlt: 'Ladida',
            subTitle: '4 november 2019',
            title: 'Nempro porem facero eatibusae.',
            url: '#',
          },
        ]"
      />
      <ContentBlock
        class="row"
        title="Nempe porem facero eatibusae."
        intro="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque et magnis dis parturient montes, nascetur ridiculus mus."
        :img="require('@/assets/images/Photo_slide.png')"
        img-alt="cooleimagewoowow"
        body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque et magnis dis parturient montes, nascetur ridiculus mus."
      />
      <FeaturedDouble
        :items="[
          {
            title: 'Onderwerp title',
            header: 'Nempe porem facero eatibusae',
            buttonText: 'call 2 action',
            buttonProps: {icon:'arrow'},
            href: '#',
          },
          {
            title: 'Onderwerp title2',
            header: 'Nempe porem facero eatibusae',
            buttonText: 'call 2 action',
            buttonProps: {icon:'arrow'},
            href: '#',
            image: require('@/assets/images/TRAINING_Fitlab_Pull.png'),
            imageAlt: 'Pull ups'
          },
        ]"
        class="u-margin-bottom-xl row"
      />
    </div>
    <ContactForm
      button-text="verstuur"
      :button-props="{icon: 'arrow'}"
      email-text="Email"
      :fail-text="{
        required: 'Je moet alle verplichte velden in vullen.',
        email: 'Je moet een geldig email adres in vullen.'
      }"
      name-text="Naam"
      phone-text="Telefoonnummer"
      message-text="Bericht"
      success-text="Hoera! Je bent aangemeld voor de nieuwsbrief"
      title="Contact us for more information"
      class="u-margin-bottom-xl"
      body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      :submit-handler="handleContactSubmit"
    />
    <div class="container">
      <CardSlider
        class="u-margin-bottom-xl"
        :slides="[
          {
            linkText: 'email',
            linkProps: {
              href: 'mailto:someone@example.com'
            },
            title: 'Lisa Janssen1',
            description: 'Marketing manager',
            image: require('@/assets/images/Eliza.png'),
            alt: '1'
          },
          {
            title: 'Lisa Janssen2',
            description: 'Marketing manager',
            image: require('@/assets/images/Eliza.png'),
            alt: '2'
          },
          {
            title: 'Lisa Janssen3',
            description: 'Marketing manager',
            image: require('@/assets/images/Eliza.png'),
            alt: '3'
          },
          {
            title: 'Lisa Janssen4',
            description: 'Marketing manager',
            image: require('@/assets/images/Eliza.png'),
            alt: '4'
          },
        ]"
      />
    </div>
    <NewsLetterForm
      button-text="verstuur"
      email-text="Email"
      :fail-text="{
        required: 'Je moet alle verplichte velden in vullen.',
        email: 'Je moet een geldig email adres in vullen.'
      }"
      name-text="Naam"
      success-text="Hoera! Je bent aangemeld voor de nieuwsbrief"
      title="schrijf je in voor onze nieuwsbrief"
      :button-props="{icon: 'arrow'}"
      class="u-margin-bottom-xl"
      body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      :submit-handler="handleNewsLetterSubmit"
    />
    <Footer
      :primary-links="[
        {
          text: 'home',
          props: {href: '#1'},
          active: true,
        },
        {
          text: 'over ons',
          props: {href: '#2'},
        },
        {
          text: 'wat doen wij?',
          props: {href: '#3'},
        },
      ]"
      :secondary-links="[
        {
          text: 'Ons team',
          props: {href: '#4'},
          active: true,
        },
        {
          text: 'nieuws',
          props: {href: '#5'},
        },
        {
          text: 'afspraak maken',
          props: {href: '#6'},
        },
        {
          text: 'contact',
          props: {href: '#7'},
        },
      ]"
      :tertiary-links="[
        [
          {
            text: 'straatnaam 12',
          },
          {
            text: '989 AA Amsterdam',
          },
        ],[
          {
            text: '0800 90 90 2019',
            href: 'tel:080090902019',
          },
          {
            text: 'info@website.nl',
            href: 'mailTo:info@website.nl',
          },],
        [{
           text: 'Algemene voorwaarden',
           href: '#8',
         },
         {
           text: 'Privacyverklaring',
           href: '#9',
         },
        ]
      ]"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import FeaturedHeaderBlock from '@/components/FeaturedHeaderBlock.vue';
import TextBlocks from '@/components/TextBlocks.vue';
import PhotoSlider from '@/components/PhotoSlider.vue';
import FeaturedSingle from '@/components/FeaturedSingle.vue';
import NewsLetterForm from '@/components/NewsLetterForm.vue';
import StaticCards from '@/components/StaticCards.vue';
import Menubar from '@/components/Menubar.vue';
import FeaturedDouble from '@/components/FeaturedDouble.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';
import CardSlider from '@/components/CardSlider.vue';
import ContactForm from '@/components/ContactForm.vue';
import ContentBlock from '@/components/ContentBlock.vue';
import TextBlock from '@/components/TextBlock.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    Footer,
    CardSlider,
    Menubar,
    FeaturedDouble,
    ContactForm,
    VideoPlayer,
    ContentBlock,
    TextBlock,
    StaticCards,
    PhotoSlider,
    Button,
    FeaturedHeaderBlock,
    TextBlocks,
    FeaturedSingle,
    NewsLetterForm,
  },

  methods: {
    handleNewsLetterSubmit({ name, email }) {
      // eslint-disable-next-line no-alert
      alert(`${name} - ${email} - Subscribed to the news letter`);
    },
    handleContactSubmit({
      name, email, phone, message,
    }) {
      // eslint-disable-next-line no-alert
      alert(`${name} - ${email} - ${phone} \nMessage: ${message}`);
    },
  },
};
</script>
