import { mount, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CardSlider from '../src/components/CardSlider.vue';
import Menubar from '../src/components/Menubar.vue';
import VideoPlayer from '../src/components/VideoPlayer.vue';

const mocks = vi.hoisted(() => ({
  createScrollTimeline: vi.fn(() => ({ id: 'timeline' })),
  killScrollTimeline: vi.fn(),
  player: {
    destroy: vi.fn(),
    getDuration: vi.fn(),
    getPaused: vi.fn(),
    off: vi.fn(),
    on: vi.fn(),
    pause: vi.fn(),
    play: vi.fn(),
    setCurrentTime: vi.fn(),
  },
}));

vi.mock('@vimeo/player', () => ({
  default: vi.fn(function PlayerMock() {
    return mocks.player;
  }),
}));

vi.mock('../src/utils/animation', async (importOriginal) => {
  const original = await importOriginal<typeof import('../src/utils/animation')>();

  return {
    ...original,
    createScrollTimeline: mocks.createScrollTimeline,
    killScrollTimeline: mocks.killScrollTimeline,
    markRawInstance: (value: object) => value,
  };
});

describe('imperative resource cleanup', () => {
  beforeEach(() => vi.clearAllMocks());

  it('destroys a captured Swiper and its animation when unmounted', () => {
    const swiper = { destroy: vi.fn() };
    const wrapper = shallowMount(CardSlider, { props: { slides: [] } });

    wrapper.vm.onSwiper(swiper);
    wrapper.unmount();

    expect(swiper.destroy).toHaveBeenCalledWith(true, true);
    expect(mocks.killScrollTimeline).toHaveBeenCalledOnce();
  });

  it('removes Menubar browser listeners when unmounted', () => {
    const windowAdd = vi.spyOn(window, 'addEventListener');
    const windowRemove = vi.spyOn(window, 'removeEventListener');
    const bodyAdd = vi.spyOn(document.body, 'addEventListener');
    const bodyRemove = vi.spyOn(document.body, 'removeEventListener');
    const wrapper = mount(Menubar, { props: { logo: { src: '/logo.svg', alt: 'Logo' } } });
    const onScroll = wrapper.vm.onScroll;
    const toggleMenu = wrapper.vm.toggleMenu;

    wrapper.unmount();

    expect(windowAdd).toHaveBeenCalledWith('scroll', onScroll);
    expect(windowRemove).toHaveBeenCalledWith('scroll', onScroll);
    expect(bodyAdd).toHaveBeenCalledWith('click', toggleMenu);
    expect(bodyRemove).toHaveBeenCalledWith('click', toggleMenu);
  });

  it('unsubscribes and destroys Vimeo players when unmounted', () => {
    const wrapper = mount(VideoPlayer, { props: { videoId: '1234' } });

    wrapper.unmount();

    expect(mocks.player.off).toHaveBeenCalledTimes(3);
    expect(mocks.player.destroy).toHaveBeenCalledOnce();
    expect(mocks.killScrollTimeline).toHaveBeenCalledOnce();
  });
});
