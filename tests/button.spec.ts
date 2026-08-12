import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Button from '../src/components/Button.vue';

const FrameworkLink = defineComponent({
  name: 'FrameworkLink',
  inheritAttrs: false,
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  template: '<a :data-to="to" v-bind="$attrs"><slot /></a>',
});

describe('Button', () => {
  it('forwards attributes and listeners to its native button root', async () => {
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      attrs: {
        id: 'submit-button',
        onClick,
      },
      slots: { default: 'Submit' },
    });

    const root = wrapper.get('button');
    expect(root.attributes('id')).toBe('submit-button');
    await root.trigger('click');
    expect(onClick).toHaveBeenCalledOnce();

    const disabled = mount(Button, { attrs: { disabled: true } });
    expect(disabled.get('button').attributes('disabled')).toBe('');
  });

  it('forwards href and attributes to its anchor root', () => {
    const wrapper = mount(Button, {
      props: { href: '/contact' },
      attrs: { target: '_blank' },
    });

    expect(wrapper.get('a').attributes()).toMatchObject({ href: '/contact', target: '_blank' });
  });

  it('supports native tags and framework component objects through as', async () => {
    const native = mount(Button, { props: { as: 'span' } });
    expect(native.element.tagName).toBe('SPAN');

    const onClick = vi.fn();
    const framework = mount(Button, {
      props: {
        as: FrameworkLink,
        props: { to: '/nieuws' },
      },
      attrs: { onClick },
    });

    const root = framework.get('a');
    expect(root.attributes('data-to')).toBe('/nieuws');
    await root.trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
  });
});
