import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from 'src/stores/data-store';
import { useRouter } from 'vue-router';
import type { UserLoginResponse } from 'src/interfaces/login.interface';
import type { ProfileData } from 'src/interfaces/profile.interface';

export function useUserProfile() {
  const user = ref<ProfileData | null>(null);
  const error = ref<string | null>(null);
  const $q = useQuasar();
  const { t } = useI18n();
  const authStore = useAuthStore();
  const router = useRouter();

  const loadProfile = (userData: UserLoginResponse) => {
    $q.loading.show({ message: t('globalMessages.wait') });
    try {
      const avatarIndex = userData.id % 10;

      const avatar =
        avatarIndex > 6
          ? 'https://cdn.quasar.dev/img/boy-avatar.png'
          : `https://cdn.quasar.dev/img/avatar${avatarIndex}.jpg`;

      user.value = {
        avatar,
        email: userData.email,
        lastName: userData.lastName,
        username: userData.username,
        firstName: userData.firstName,
      };
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      $q.notify({
        type: 'negative',
        message: t('mainLayout.profile.messages.errorProfile'),
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
      });
    } finally {
      $q.loading.hide();
    }
  };

  const signOut = () => {
    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      authStore.logout();

      user.value = null;
      error.value = null;
      $q.notify({
        type: 'positive',
        message: t('mainLayout.profile.messages.successSignout'),
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
      });

      void router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        $q.notify({
          type: 'negative',
          message: t('mainLayout.profile.messages.errorSignout'),
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
          message: t('mainLayout.profile.messages.errorSignout'),
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
  };

  return {
    user,
    error,
    loadProfile,
    signOut,
  };
}
