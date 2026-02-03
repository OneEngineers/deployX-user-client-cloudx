import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// ==== Layouts ====
const AdminLayout = () => import('@/layouts/AdminLayout.vue')
const DeveloperLayout = () => import('@/layouts/DeveloperLayout.vue')

// ==== Auth Pages ====
const Login = () => import('@/pages/auth/LoginPage.vue')
const Register = () => import('@/pages/auth/RegisterPage.vue')

// ==== Admin Pages ====
const AdminDashboard = () => import('@/pages/admin/AdminDashboard.vue')
const Users = () => import('@/pages/admin/AdminUsers.vue')

// ==== Developer Pages ====
const MyApps = () => import('@/pages/developer/MyApps.vue')
const Deployments = () => import('@/pages/developer/DeployDeveloper.vue')
const Logs = () => import('@/pages/developer/LogsDeveloper.vue')

// ==== Error Pages ====
const Error403 = () => import('@/pages/errors/Error403Page.vue')
const Error404 = () => import('@/pages/errors/Error404Page.vue')
const DashboardPage = () => import('@/pages/dasboard/DashboardPage.vue')

import state from '@/main'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Home',
    component: DashboardPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true }
  },

  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    meta: {
      requiresAuth: true,
      role: 'ADMIN'
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { title: 'Admin Dashboard' }
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        meta: { title: 'Manage Users' }
      }
    ]
  },

  {
    path: '/developer',
    component: DeveloperLayout,
    redirect: '/developer/apps',
    meta: {
      requiresAuth: true,
      role: 'DEVELOPER'
    },
    children: [
      {
        path: 'apps',
        name: 'MyApps',
        component: MyApps,
        meta: { title: 'My Applications' }
      },
      {
        path: 'deployments',
        name: 'Deployments',
        component: Deployments,
        meta: { title: 'App Deployments' }
      },
      {
        path: 'logs',
        name: 'Logs',
        component: Logs,
        meta: { title: 'View Logs' }
      }
    ]
  },

  {
    path: '/403',
    name: 'Error403',
    component: Error403,
    meta: { title: 'Access Denied' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: Error404,
    meta: { title: 'Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  const authStore = useAuthStore(state)

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }
})

router.afterEach(to => {
  document.title = to.meta.title ? `${to.meta.title} | FlightOps Platform` : 'FlightOps Platform'
})

export default router
