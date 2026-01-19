import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// ==== Layouts ====
import AdminLayout from '@/layouts/AdminLayout.vue'
import DeveloperLayout from '@/layouts/DeveloperLayout.vue'

// ==== Auth Pages ====
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/RegisterPage.vue'

// ==== Admin Pages ====
import AdminDashboard from '@/pages/admin/Dashboard.vue'
import Users from '@/pages/admin/Users.vue'
import Clusters from '@/pages/admin/Clusters.vue'

// ==== Developer Pages ====
import MyApps from '@/pages/developer/MyApps.vue'
import Deployments from '@/pages/developer/Deployments.vue'
import Logs from '@/pages/developer/Logs.vue'

// ==== Error Pages ====
import Error403 from '@/pages/errors/Error403.vue'
import Error404 from '@/pages/errors/Error404Page.vue'
import DashboardPage from '@/pages/dasboard/DashboardPage.vue'

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  // },
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
      },
      {
        path: 'clusters',
        name: 'Clusters',
        component: Clusters,
        meta: { title: 'Manage Clusters' }
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

// ================================
// Navigation Guards
// ================================
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Auto fetch profile (cookie still valid)
  if (!authStore.user) {
    try {
      await authStore.fetchProfile()
    } catch (error) {
      console.error('Error fetching profile in router guard:', error)
    }
  }

  const user = authStore.user

  if (to.meta.requiresAuth && !user) {
    return next({ name: 'Login' })
  }

  if (to.meta.role && user?.role !== to.meta.role) {
    return next({ name: 'Error403' })
  }

  if (to.meta.guest && user) {
    return user.role === 'ADMIN' ? next({ name: 'AdminDashboard' }) : next({ name: 'MyApps' })
  }

  // Continue to target route
  next()
})

// Set dynamic document title
router.afterEach(to => {
  document.title = to.meta.title ? `${to.meta.title} | FlightOps Platform` : 'FlightOps Platform'
})

export default router
