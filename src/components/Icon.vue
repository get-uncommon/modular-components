<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    role="img"
    aria-hidden="true"
    v-bind="$attrs"
  />
</template>

<script>
import ArrowIcon from '../../static/svg/src/arrow.svg?component';
import FacebookIcon from '../../static/svg/src/facebook.svg?component';
import FullscreenIcon from '../../static/svg/src/fullscreen.svg?component';
import InstagramIcon from '../../static/svg/src/instagram.svg?component';
import LinkedinIcon from '../../static/svg/src/linkedin.svg?component';
import PauseIcon from '../../static/svg/src/pause.svg?component';
import PlayIcon from '../../static/svg/src/play.svg?component';
import TriangleIcon from '../../static/svg/src/triangle.svg?component';

const icons = {
  arrow: ArrowIcon,
  facebook: FacebookIcon,
  fullscreen: FullscreenIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  pause: PauseIcon,
  play: PlayIcon,
  triangle: TriangleIcon,
};

export default {
  name: 'ModularIcon',

  inheritAttrs: false,

  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  computed: {
    iconComponent() {
      return icons[this.icon] || null;
    },
  },
};
</script>
