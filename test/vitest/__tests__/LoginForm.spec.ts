import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import LoginForm from 'src/components/LoginForm.vue';
import messages from 'src/i18n';
import { describe, expect, it } from 'vitest';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

installQuasarPlugin();

describe('LoginForm', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en-US',
    messages,
  });
  const pinia = createPinia();

  it('should render login form with correct labels and placeholders', () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [i18n, pinia, router],
      },
    });

    expect(wrapper.find('label').text()).toContain('Username');
    expect(wrapper.find('input[placeholder="Enter your username"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Enter your password"]').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Login');
  });
  it('should disable the login button if form is invalid', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [i18n, pinia, router],
      },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();

    await wrapper.find('input[placeholder="Enter your username"]').setValue('testuser');
    await wrapper.find('input[placeholder="Enter your password"]').setValue('password123');

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
  });
});
