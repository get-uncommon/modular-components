<template>
  <div
    ref="component"
    class="video"
  >
    <div
      ref="player"
      class="video__player"
      :data-vimeo-id="videoId"
      data-vimeo-controls="false"
      data-vimeo-allowfullscreen="true"
    />
    <div
      class="video__overlay"
      @click="togglePlay"
    />
    <div class="video__controls">
      <button
        class="video__controls__icon video__controls__icon--play"
        @click="togglePlay"
      >
        <Icon
          :icon="playing ? 'pause' : 'play'"
          height="24"
          width="12"
        />
      </button>

      <div
        class="video__controls__progress"
        @click="updateProgress"
      >
        <div
          class="video__controls__progress__indicator"
          :style="indicatorStyle"
        />
      </div>

      <!-- @TODO fullscreen mode -->
      <!-- <button
        class=" video__controls__icon video__controls__icon--fullscreen"
        @click="toggleFullscreen"
      >
        <Icon
          icon="fullscreen"
          height="24"
          width="24"
        />
      </button> -->
    </div>
  </div>
</template>

<script>
import Player from '@vimeo/player';
import Icon from './Icon.vue';
import {
  createScrollTimeline,
  killScrollTimeline,
  markRawInstance,
} from '../utils/animation';

export default {
  name: 'VideoPlayer',

  components: { Icon },

  props: {
    videoId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      player: null,
      playing: false,
      indicatorStyle: { width: 0 },
      scrollScene: null,
    };
  },

  mounted() {
    const videoPlayer = this.$refs.player;
    this.player = markRawInstance(new Player(videoPlayer));

    this.player.on('timeupdate', this.progressHasBeenUpdated);
    this.player.on('play', this.onPlayerPlay);
    this.player.on('pause', this.onPlayerPause);

    this.scrollScene = createScrollTimeline({
      scrollTrigger: {
        trigger: this.$refs.component,
        toggleClass: 'show',
        start: 'top 90%',
        once: true,
      },
    });
  },

  beforeUnmount() {
    this.player?.off('timeupdate', this.progressHasBeenUpdated);
    this.player?.off('play', this.onPlayerPlay);
    this.player?.off('pause', this.onPlayerPause);
    this.player?.destroy();
    killScrollTimeline(this.scrollScene);
  },

  methods: {
    onPlayerPlay() {
      this.setPlaying(true);
    },
    onPlayerPause() {
      this.setPlaying(false);
    },
    setPlaying(value) {
      this.playing = value;
    },
    async updateProgress(event) {
      const duration = await this.player.getDuration();
      const percent = event.offsetX / event.target.offsetWidth;
      const newTime = percent * duration;
      this.player.setCurrentTime(newTime);
      this.progressHasBeenUpdated({ percent });
    },
    progressHasBeenUpdated(progress) {
      this.indicatorStyle.width = `${progress.percent * 100}%`;
    },
    async togglePlay() {
      if (await this.player.getPaused()) {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    // toggleFullscreen() {
    //   this.$refs.fullscreen.toggle();
    // },
  },
};
</script>

<style lang="scss" scoped>
.video {
  position: relative;
  width: 100%;
  padding-bottom: 58.25%;
  opacity: 0;
  transition: var(--transition-page);
  transform: translateY(var(--spacing-lg));

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  &__overlay {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  &__controls {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-md);

    &__progress {
      position: relative;
      width: 100%;
      height: 2px;
      margin: 0 var(--spacing-sm);
      cursor: pointer;
      transition: var(--transition-base);

      &__indicator {
        height: 100%;
        background-color: var(--color-light);
        border-radius: 999px;
        transform: scaleY(1.5);
      }

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background-color: var(--color-light);
        opacity: .3;
      }
    }

    &__icon {
      cursor: pointer;
      transition: var(--transition-base);
      transform: scale(1);

      &:focus,
      &:hover {
        outline: 0;
        transform: scale(1.2);
      }
    }

    &:hover {
      .video__controls__progress {
        height: 6px;
      }
    }
  }
}

.fullscreen .video {
  height: 100%;
  padding-bottom: 0;
  background-color: var(--color-dark);
}
</style>

<style lang="scss">
  .video {
    &__player iframe {
      position: absolute;
      width: 100%;
      min-width: 100%;
      height: 100%;
      min-height: 100%;
    }

    &__controls {
      svg path {
        fill: var(--color-light);
      }
    }
  }
</style>
