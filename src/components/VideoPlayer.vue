<template>
  <div class="video">
    <div
      ref="player"
      class="video__player"
      :data-vimeo-id="videoId"
      data-vimeo-controls="false"
      data-vimeo-allowfullscreen="true"
    />
    <div class="video__controls">
      <button
        class="video__controls__icon video__controls__icon--play"
        @click="togglePlay"
      >
        <svg-icon
          icon="play"
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

      <button
        class=" video__controls__icon video__controls__icon--fullscreen"
        @click="toggleFullscreen"
      >
        <svg-icon
          icon="fullscreen"
          height="24"
          width="24"
        />
      </button>
    </div>
  </div>
</template>

<script>
import Player from '@vimeo/player';
import VueSvgIcon from 'vue-svgicon';
import '@/icons/play';
import '@/icons/fullscreen';

export default {
  name: 'VideoPlayer',

  components: {
    svgIcon: VueSvgIcon,
  },

  props: {
    videoId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      player: {},
      paused: true,
      indicatorStyle: { width: 0 },
    };
  },

  mounted() {
    const videoPlayer = this.$refs.player;
    this.player = new Player(videoPlayer);
    this.player.controls = false;

    this.player.on('timeupdate', this.progressHasBeenUpdated);
  },

  methods: {
    async updateProgress(event) {
      const duration = await this.player.getDuration();
      const newTime = (event.offsetX / event.target.offsetWidth) * duration;
      this.player.setCurrentTime(newTime);
    },
    progressHasBeenUpdated(progress) {
      this.indicatorStyle.width = `${progress.percent * 100}%`;
    },
    async togglePlay() {
      this.paused = await this.player.getPaused();
      if (this.paused) {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    async toggleFullscreen() {
      const fullscreen = await this.player.getFullscreen();
      if (fullscreen) {
        await this.player.exitFullscreen();
      } else {
        await this.player.requestFullscreen();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  position: relative;
  width: 100%;
  padding-bottom: 58.25%;

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
      transition: $transition-base;

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
      transition: $transition-base;
      transform: scale(1);

      &:focus,
      &:hover {
        outline: 0;
        transform: scale(1.2);
      }
    }

    &:hover {
      .video__controls__progress {
        transform: scaleY(3);
      }
    }
  }
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
