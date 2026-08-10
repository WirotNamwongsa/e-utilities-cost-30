import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import('@/views/ExpenseListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/expenses/create',
      name: 'expense-create',
      component: () => import('@/views/ExpenseFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/expenses/:id/edit',
      name: 'expense-edit',
      component: () => import('@/views/ExpenseFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/settings/expense-categories',
      name: 'expense-categories',
      component: () => import('@/views/CategoryManageView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/settings/budget-categories',
      name: 'budget-categories',
      component: () => import('@/views/CategoryManageView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/ReportHistoryView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Try to check auth status
      const isValid = await authStore.checkAuth()
      if (!isValid) {
        next('/login')
        return
      }
    }

    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      next('/')
      return
    }
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router
