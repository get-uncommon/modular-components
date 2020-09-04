/**
 * Mixin for Scrollmagic animations
 */

import { ScrollScene } from 'scrollscene';

const Scrollmagic = {
  data() {
    return {
      scrollScene: null,
    };
  },

  mounted() {
    this.scrollScene = new ScrollScene({
      triggerElement: this.$el,
      toggle: {
        element: this.$el,
        className: 'show',
      },
    });

    // Play animation only once
    this.scrollScene.Scene.reverse(false);
  },

  beforeDestroy() {
    this.scrollScene.destroy();
  },
};


export default Scrollmagic;
