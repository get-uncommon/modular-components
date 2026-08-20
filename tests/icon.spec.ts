import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Icon from '../src/components/Icon.vue';

describe('Icon', () => {
  it('renders registered SVG icons with their viewBox intact', () => {
    const wrapper = mount(Icon, { props: { icon: 'facebook' } });
    const svg = wrapper.get('svg');
    const source = readFileSync(resolve('static/svg/src/facebook.svg'), 'utf8');

    expect(source).toContain('viewBox="0 0 20 20"');
    expect(svg.attributes('aria-hidden')).toBe('true');
  });

  it('renders nothing for an unknown icon', () => {
    expect(mount(Icon, { props: { icon: 'unknown' } }).find('svg').exists()).toBe(false);
  });
});
