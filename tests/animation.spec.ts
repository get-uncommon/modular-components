import { describe, expect, it, vi } from 'vitest';
import { killScrollTimeline } from '../src/utils/animation';

describe('animation cleanup', () => {
  it('kills both a GSAP ScrollTrigger and its timeline', () => {
    const timeline = {
      kill: vi.fn(),
      scrollTrigger: { kill: vi.fn() },
    };

    killScrollTimeline(timeline as never);

    expect(timeline.scrollTrigger.kill).toHaveBeenCalledOnce();
    expect(timeline.kill).toHaveBeenCalledOnce();
  });

  it('is null-safe', () => {
    expect(() => killScrollTimeline(null)).not.toThrow();
  });
});
