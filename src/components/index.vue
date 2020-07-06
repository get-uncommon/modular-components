<template>
  <div>
    <h1>You should not import the default of this component.</h1>
    <p>
      However, you can import the following from this library:
      import {
      Button,
      Footer,
      CardList,
      CardSlider,
      Menubar,
      FeaturedDouble,
      ContactForm,
      VideoPlayer,
      ContentBlock,
      TextBlock,
      StaticCards,
      PhotoSlider,
      FeaturedHeaderBlock,
      TextBlocks,
      FeaturedSingle,
      NewsLetterForm
      } from '@get-uncommon/modular-components/src/components/index.vue'
    </p>
  </div>
</template>

<script>
/**
 * Importing / Exporting components for library
 */

import Button from './Button.vue';
import FeaturedHeaderBlock from './FeaturedHeaderBlock.vue';
import PhotoSlider from './PhotoSlider.vue';
import TextBlocks from './TextBlocks.vue';
import NewsLetterForm from './NewsLetterForm.vue';
import TextBlock from './TextBlock.vue';
import StaticCards from './StaticCards.vue';
import Menubar from './Menubar.vue';
import FeaturedDouble from './FeaturedDouble.vue';
import FeaturedSingle from './FeaturedSingle.vue';
import VideoPlayer from './VideoPlayer.vue';
import ContactForm from './ContactForm.vue';
import ContentBlock from './ContentBlock.vue';
import Footer from './Footer.vue';
import CardSlider from './CardSlider.vue';
import CardList from './CardList.vue';
import '../assets/scss/main.scss';

export {
  Button,
  FeaturedHeaderBlock,
  PhotoSlider,
  TextBlocks,
  StaticCards,
  NewsLetterForm,
  VideoPlayer,
  ContactForm,
  FeaturedDouble,
  FeaturedSingle,
  ContentBlock,
  TextBlock,
  Menubar,
  Footer,
  CardSlider,
  CardList,
};

export default {};
</script>
