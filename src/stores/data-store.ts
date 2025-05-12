import { defineStore } from 'pinia';
import { UserRole } from '../enums/role.enum';
import type { UserLoginResponse } from 'src/interfaces/login.interface';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    role: UserRole.ANONYMOUS,
    userStore: null as UserLoginResponse | null,
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
    createUser(userData: UserLoginResponse) {
      this.userStore = userData;
    },
    logout() {
      this.role = UserRole.ANONYMOUS;
      this.authenticated = false;
      this.userStore = null;

      localStorage.setItem('role', UserRole.ANONYMOUS);
      localStorage.setItem('authenticated', 'false');
    },
  },
});
