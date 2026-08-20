import { describe, expect, it } from 'vitest';
import components, * as namedExports from '../src/index';

const componentNames = [
  'AdvancedImage',
  'Button',
  'CardList',
  'CardSlider',
  'ContactForm',
  'ContentBlock',
  'FeaturedDouble',
  'FeaturedHeaderBlock',
  'FeaturedSingle',
  'Footer',
  'Input',
  'Menubar',
  'Message',
  'NewsLetterForm',
  'PhotoCard',
  'PhotoSlider',
  'StaticCards',
  'TextBlock',
  'TextBlocks',
  'VideoPlayer',
] as const;

describe('package exports', () => {
  it('exposes all components as named and default exports', () => {
    expect(Object.keys(components)).toEqual(componentNames);

    for (const name of componentNames) {
      expect(namedExports[name]).toBe(components[name]);
    }
  });
});
