import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContactForm from '../src/components/ContactForm.vue';
import NewsLetterForm from '../src/components/NewsLetterForm.vue';

const animation = vi.hoisted(() => ({
  createScrollTimeline: vi.fn(() => ({ id: 'timeline' })),
  killScrollTimeline: vi.fn(),
}));

vi.mock('../src/utils/animation', () => ({
  ...animation,
  markRawInstance: (value: object) => value,
}));

const requiredProps = {
  title: 'Contact',
  nameText: 'Name',
  emailText: 'Email',
  phoneText: 'Phone',
  messageText: 'Message',
  buttonText: 'Send',
  successText: 'Sent',
  failText: {
    required: 'Required',
    email: 'Invalid email',
  },
};

describe('ContactForm', () => {
  beforeEach(() => vi.clearAllMocks());

  it('validates required fields without calling the submit handler', async () => {
    const submitHandler = vi.fn();
    const wrapper = mount(ContactForm, { props: { ...requiredProps, submitHandler } });

    await wrapper.get('form').trigger('submit');

    expect(wrapper.text()).toContain('Required');
    expect(submitHandler).not.toHaveBeenCalled();
  });

  it('keeps the submit-handler payload and success contract intact', async () => {
    const submitHandler = vi.fn().mockResolvedValue({ success: true, error: null });
    const wrapper = mount(ContactForm, {
      props: {
        ...requiredProps,
        honeypotName: 'favoriteColor',
        submitHandler,
      },
    });

    await wrapper.get('input[name="favoriteColor"]').setValue('');
    await wrapper.get('input[name="name"]').setValue('Rutger');
    await wrapper.get('input[name="email"]').setValue('rutger@example.com');
    await wrapper.get('input[name="phone"]').setValue('0612345678');
    await wrapper.get('[name="message"]').setValue('Hello');
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(submitHandler).toHaveBeenCalledWith({
      honeypot: '',
      name: 'Rutger',
      email: 'rutger@example.com',
      phone: '0612345678',
      message: 'Hello',
    });
    expect(wrapper.text()).toContain('Sent');
  });
});

describe('NewsLetterForm', () => {
  it('keeps validation and the submit-handler payload intact', async () => {
    const submitHandler = vi.fn().mockResolvedValue(undefined);
    const wrapper = mount(NewsLetterForm, {
      props: {
        title: 'Newsletter',
        nameText: 'Name',
        emailText: 'Email',
        buttonText: 'Subscribe',
        successText: 'Subscribed',
        failText: { required: 'Required', email: 'Invalid email' },
        submitHandler,
      },
    });
    const inputs = wrapper.findAll('input');

    await inputs[0].setValue('Rutger');
    await inputs[1].setValue('rutger@example.com');
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(submitHandler).toHaveBeenCalledWith({
      name: 'Rutger',
      email: 'rutger@example.com',
    });
    expect(wrapper.text()).toContain('Subscribed');
  });
});
