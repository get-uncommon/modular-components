import { markRaw } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let scrollTriggerRegistered = false;
let fontRefreshScheduled = false;
let loadRefreshScheduled = false;

function registerScrollTrigger() {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }

  return true;
}

function refreshScrollTriggers() {
  if (!registerScrollTrigger()) {
    return;
  }

  ScrollTrigger.update();
  ScrollTrigger.refresh();
}

export function scheduleScrollTriggerRefresh() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (!fontRefreshScheduled && document.fonts?.ready) {
    fontRefreshScheduled = true;
    document.fonts.ready.then(() => {
      window.setTimeout(refreshScrollTriggers, 300);
    });
  }

  if (!loadRefreshScheduled) {
    loadRefreshScheduled = true;

    if (document.readyState === 'complete') {
      refreshScrollTriggers();
    } else {
      window.addEventListener('load', refreshScrollTriggers, { once: true });
    }
  }
}

export function createScrollTimeline(options: gsap.TimelineVars) {
  if (!registerScrollTrigger()) {
    return null;
  }

  scheduleScrollTriggerRefresh();
  return markRaw(gsap.timeline(options));
}

export function markRawInstance<T extends object>(instance: T) {
  return markRaw(instance);
}

export function killScrollTimeline(timeline: gsap.core.Timeline | null | undefined) {
  timeline?.scrollTrigger?.kill();
  timeline?.kill();
}
