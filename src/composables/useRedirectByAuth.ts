import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/data-store';
import { UserRole } from '../enums/role.enum';

export function useRedirectByAuth() {
  const router = useRouter();
  const authStore = useAuthStore();

  const redirectUser = () => {
    if (!authStore.authenticated || authStore.role === UserRole.ANONYMOUS) {
      void router.push('/login');
    } else if (authStore.role === UserRole.STANDARD_USER) {
      void router.push('/task-dashboard');
    } else {
      void router.push('/login');
    }
  };

  return {
    redirectUser,
  };
}
