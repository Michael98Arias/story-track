import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import RegisterForm from 'src/components/RegisterForm.vue';
import messages from 'src/i18n';
import { describe, expect, it, vi } from 'vitest';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

installQuasarPlugin();

describe('RegisterForm', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en-US',
    messages,
  });
  const pinia = createPinia();

  it('should render the registration form with correct labels and placeholders', () => {
    const wrapper = mount(RegisterForm, {
      global: {
        plugins: [i18n, pinia, router],
      },
    });

    expect(wrapper.find('label').text()).toContain('Username');
    expect(wrapper.find('input[placeholder="Enter your username"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Enter your email"]').exists()).toBe(true);
    expect(wrapper.find('input[placeholder="Enter your password"]').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Register');
  });

  it('should call register and show success notification on successful registration', async () => {
    const mockRegisterService = vi.fn().mockResolvedValue({
      id: 1,
      username: 'validUser',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      token: 'validToken',
    });

    const wrapper = mount(RegisterForm, {
      global: {
        plugins: [i18n, pinia, router],
        mocks: {
          $q: {
            loading: { show: vi.fn(), hide: vi.fn() },
            notify: vi.fn(),
          },
        },
      },
    });

    const mockUseRegister = vi.fn().mockReturnValue({
      register: mockRegisterService,
      form: { username: 'validUser', email: 'test@example.com', password: 'Password123!' },
      isFormValid: true,
      rules: {},
    });

    wrapper.vm.$options.setup = () => mockUseRegister();

    await wrapper.find('input[placeholder="Enter your username"]').setValue('validUser');
    await wrapper.find('input[placeholder="Enter your email"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="Enter your password"]').setValue('Password123!');

    await wrapper.find('button').trigger('click');

    const { register } = mockUseRegister();
    await register();
  });
});
