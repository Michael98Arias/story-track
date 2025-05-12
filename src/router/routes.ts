import type { RouteRecordRaw } from 'vue-router';
import { UserRole } from '../enums/role.enum';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/login',
    children: [
      {
        path: 'login',
        component: () => import('src/pages/Login/LoginPage.vue'),
        meta: { requiresAuth: false, roles: [UserRole.ANONYMOUS] },
      },
      {
        path: 'task-dashboard',
        component: () => import('src/pages/TaskDashboard/TaskDashboardPage.vue'),
        meta: { requiresAuth: true, roles: [UserRole.STANDARD_USER] },
      },
    ],
  },

  // Route to display 503 error
  {
    path: '/access-denied',
    component: () => import('pages/ErrorWithoutPermission.vue'),
  },
  // Route to display 404 error
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
