import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import registerService from 'src/services/register.service';
import { useAuthStore } from 'src/stores/data-store';
import type { UserRegisterResponse } from 'src/interfaces/register.interface';
import type { IHttpError } from '../interfaces/http.interface';

export function useRegister() {
  const { t } = useI18n();
  const router = useRouter();
  const $q = useQuasar();
  const authStore = useAuthStore();

  const form = ref({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const error = ref('');
  const showPassword = ref(false);

  const usernameMinLength = 3;
  const usernameMaxLength = 20;
  const nameMinLength = 3;
  const nameMaxLength = 15;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?]).+$/;

  const rules = ref({
    username: false,
    email: false,
    firstName: false,
    lastName: false,
    password: false,
  });

  function togglePassword() {
    showPassword.value = !showPassword.value;
  }

  const isFormValid = computed(() => {
    return (
      rules.value.username &&
      rules.value.email &&
      rules.value.firstName &&
      rules.value.lastName &&
      rules.value.password
    );
  });

  function isUsernameValid(username: string) {
    rules.value.username =
      username.length >= usernameMinLength && username.length <= usernameMaxLength;
    return rules.value.username;
  }

  function isEmailValid(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    rules.value.email = emailRegex.test(email);
    return rules.value.email;
  }

  function isFirstNameValid(firstName: string) {
    rules.value.firstName = firstName.length >= nameMinLength && firstName.length <= nameMaxLength;
    return rules.value.firstName;
  }

  function isLastNameValid(lastName: string) {
    rules.value.lastName = lastName.length >= nameMinLength && lastName.length <= nameMaxLength;
    return rules.value.lastName;
  }

  function isPasswordValid(password: string) {
    rules.value.password = passwordPattern.test(password);
    return rules.value.password;
  }

  async function register() {
    if (!isFormValid.value) {
      error.value = t('register.error');
      return;
    }

    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      const response = await registerService.register(form.value);
      if (response && Object.keys(response).length > 0) {
        authStore.login();
        const userData: UserRegisterResponse = response;

        authStore.createUser(userData);
        $q.notify({
          type: 'positive',
          message: t('mainLayout.registerPage.messages.successRegister'),
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
          message: t('mainLayout.registerPage.messages.invalidRegister'),
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
            message: t('mainLayout.registerPage.messages.invalidRegister'),
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
            message: t('mainLayout.registerPage.messages.errorRegister'),
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
          message: t('mainLayout.registerPage.messages.errorRegister'),
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

  function getProgress() {
    const totalRules = Object.keys(rules.value).length;
    const passedRules = Object.values(rules.value).filter((rule) => rule).length;
    return (passedRules / totalRules) * 1;
  }

  return {
    form,
    error,
    showPassword,
    togglePassword,
    isFormValid,
    register,
    rules,
    getProgress,
    isUsernameValid,
    isEmailValid,
    isFirstNameValid,
    isLastNameValid,
    isPasswordValid,
  };
}
