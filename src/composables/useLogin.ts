import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../stores/data-store';
import type { UserLogin, UserLoginResponse } from '../interfaces/login.interface';
import LoginService from '../services/login.service';
import type { IHttpError } from '../interfaces/http.interface';

export function useLogin() {
  const router = useRouter();
  const authStore = useAuthStore();
  const $q = useQuasar();
  const { t } = useI18n();
  const tab = ref<'login'>('login');

  const formLogin = reactive<UserLogin>({
    username: '',
    password: '',
  });

  const showPassword = ref(false);
  const error = ref<string | null>(null);

  const isFormValidLogin = computed(() => {
    return !!formLogin.username && !!formLogin.password;
  });

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  async function login() {
    if (!isFormValidLogin.value) {
      $q.notify({
        type: 'negative',
        message: t('mainLayout.loginPage.messages.invalidLogin'),
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
      });
      return;
    }

    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      const response = await LoginService.login({
        username: formLogin.username,
        password: formLogin.password,
      });
      if (Array.isArray(response) && response.length === 1) {
        authStore.login();
        const userData: UserLoginResponse = response[0];

        authStore.createUser(userData);
        $q.notify({
          type: 'positive',
          message: t('mainLayout.loginPage.messages.successLogin'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: t('mainLayout.loginPage.messages.invalidLogin'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }

      void router.push('/task-dashboard');
    } catch (err) {
      if (err instanceof Error) {
        const httpError = err as unknown as IHttpError;
        if (httpError.statusCode === 401) {
          $q.notify({
            type: 'negative',
            message: t('mainLayout.loginPage.messages.invalidLogin'),
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
              },
            ],
          });
        } else {
          $q.notify({
            type: 'negative',
            message: t('mainLayout.loginPage.messages.errorLogin'),
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
              },
            ],
          });
        }
      } else {
        $q.notify({
          type: 'negative',
          message: t('mainLayout.loginPage.messages.errorLogin'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      $q.loading.hide();
    }
  }

  return {
    tab,
    formLogin,
    showPassword,
    isFormValidLogin,
    togglePasswordVisibility,
    login,
    error,
  };
}
