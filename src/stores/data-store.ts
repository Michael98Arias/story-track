import { defineStore } from 'pinia';
import { UserRole } from '../enums/role.enum';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    role: UserRole.ANONYMOUS,
  }),

  getters: {
    isLoggedIn: (state) => state.authenticated,
    isStandardUser: (state) => state.role === UserRole.STANDARD_USER,
    isAnonymous: (state) => state.role === UserRole.ANONYMOUS,
  },

  actions: {
    initializeLocalStorage() {
      const storedRole = localStorage.getItem('role');
      const storedAuth = localStorage.getItem('authenticated');

      if (storedRole && Object.values(UserRole).includes(storedRole as UserRole)) {
        this.role = storedRole as UserRole;
      }

      this.authenticated = storedAuth === 'true';
    },
    login() {
      this.role = UserRole.STANDARD_USER;
      this.authenticated = true;

      localStorage.setItem('role', UserRole.STANDARD_USER);
      localStorage.setItem('authenticated', 'true');
    },

    logout() {
      this.role = UserRole.ANONYMOUS;
      this.authenticated = false;

      localStorage.setItem('role', UserRole.ANONYMOUS);
      localStorage.setItem('authenticated', 'false');
    },
  },
});
